import { supabase } from '../config/db';

// Simpan Hasil Scan Baru
export async function saveScanResult(data: {
    disease: string;
    confidence: string;
    risk: string;
    advice: string;
    imageUrl: string | null;
}) {
    try {
        const { data: savedData, error } = await supabase
            .from('ScanHistory')
            .insert([
                {
                    disease: data.disease,
                    confidence: data.confidence,
                    risk: data.risk,
                    advice: data.advice,
                    image_url: data.imageUrl
                }
            ])
            .select()
            .single();

        if (error) {
            console.error("Supabase DB Error:", error.message);
            return null;
        }

        return savedData;
    } catch (error) {
        console.error("System Error:", error);
        return null;
    }
}

// Ambil Semua Riwayat
export async function getAllHistory() {
    try {
        const { data, error } = await supabase
            .from('ScanHistory')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(20);

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error("Fetch Error:", error);
        return [];
    }
}