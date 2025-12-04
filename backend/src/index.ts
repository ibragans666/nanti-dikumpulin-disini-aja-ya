import { Elysia, t } from 'elysia';
import { cors } from '@elysiajs/cors';
import { rateLimit } from 'elysia-rate-limit';
import { helmet } from 'elysia-helmet';
import * as ort from 'onnxruntime-node';
import sharp from 'sharp';

// Import Services & Config
import { validateImageHeader } from './utils/security';
import { predictDisease } from './services/inferenceEngine';
import { askKolosalAI } from './services/aiService';
import { saveScanResult, getAllHistory } from './services/dbService';
import { supabase } from './config/db'; // Client Supabase

// KONFIGURASI BUCKET
const BUCKET_NAME = 'scans'; 

const app = new Elysia()
    // --- MIDDLEWARE KEAMANAN
    .use(helmet())
    .use(rateLimit({ duration: 60000, max: 10, errorResponse: "Rate limit exceeded. Tunggu sebentar." }))
    .use(cors()) 

    // ROUTE 1: ANALYZE & UPLOAD
    .post('/analyze', async ({ body, set }) => { 
        try {
            const file = body.file;

            // 1. Validasi File (Ukuran & Tipe)
            if (file.size > 5 * 1024 * 1024) { 
                set.status = 400; 
                return { success: false, error: "File terlalu besar (>5MB)." }; 
            }
            if (!file.type.startsWith('image/')) { 
                set.status = 400; 
                return { success: false, error: "Format file harus gambar." }; 
            }
            
            // Validasi Magic Numbers (Anti-Spoofing)
            const arrayBuffer = await file.arrayBuffer();
            if (!(await validateImageHeader(arrayBuffer))) {
                set.status = 400; 
                return { success: false, error: "File korup atau palsu." };
            }

            console.log(`📸 Processing: ${file.name}`);

            // 2. Proses AI (Prediksi Penyakit)
            const diagnosis = await predictDisease(arrayBuffer);
            
            // 3. Proses Gen AI (Minta Saran)
            const advice = await askKolosalAI(diagnosis.label, diagnosis.confidence, diagnosis.expertInfo);

            // 4. UPLOAD GAMBAR KE SUPABASE STORAGE
            console.log(`☁️  Uploading ke bucket: ${BUCKET_NAME}...`);
            
            // Sanitasi nama file (ganti spasi jadi underscore + timestamp)
            const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
            const uniqueFileName = `scan_${Date.now()}_${cleanFileName}`; 
            
            const { data: uploadData, error: uploadError } = await supabase
                .storage
                .from(BUCKET_NAME) 
                .upload(uniqueFileName, file, {
                    contentType: file.type,
                    upsert: false
                });

            let publicUrl = null;

            if (uploadError) {
                console.error("❌ GAGAL UPLOAD GAMBAR:", uploadError.message);
                // Kita lanjut saja meski upload gagal, user tetap butuh hasil diagnosa
            } else {
                console.log("✅ Upload Berhasil!");
                
                // Dapatkan Link Publik
                const urlData = supabase.storage
                    .from(BUCKET_NAME)
                    .getPublicUrl(uniqueFileName);
                    
                publicUrl = urlData.data.publicUrl;
                console.log("🔗 Link:", publicUrl);
            }

            // 5. SIMPAN DATA KE DATABASE
            console.log("💾 Menyimpan Data ke Postgres...");
            const savedRecord = await saveScanResult({
                disease: diagnosis.label,
                confidence: diagnosis.confidence,
                risk: diagnosis.expertInfo.bahaya,
                advice: advice,
                imageUrl: publicUrl // Link gambar masuk sini
            });

            // 6. Response ke Frontend
            return {
                success: true,
                result: {
                    id: savedRecord?.id, // ID Database
                    label: diagnosis.label,
                    confidence: diagnosis.confidence,
                    risk: diagnosis.expertInfo.bahaya,
                    advice: advice,
                    image_url: publicUrl // URL Gambar untuk ditampilkan ulang
                }
            };

        } catch (err) {
            console.error("❌ System Error:", err);
            set.status = 500;
            return { success: false, error: "Internal Server Error." };
        }
    }, {
        body: t.Object({ file: t.File() })
    })

    // ROUTE 2: GET HISTORY
    .get('/history', async () => {
        const history = await getAllHistory();
        return { success: true, data: history };
    })

    .listen(3001);

console.log(`🛡️  Backend 'Dokter Tani' berjalan di http://localhost:${app.server?.port}`);