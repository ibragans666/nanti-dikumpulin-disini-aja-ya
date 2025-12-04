import { API_KEY, KOLOSAL_URL, MODEL_ID } from '../config/constants';

export async function askKolosalAI(diagnosis: string, confidence: string, expertData: any) {
    if (!API_KEY) return "⚠️ API Key Error: Belum disetting di .env";
    
    // PROMPT
    const prompt = `
    Anda adalah asisten pertanian langsung.
    
    DATA DIAGNOSIS:
    - Penyakit: ${diagnosis}
    - Info: ${expertData.info}
    - Bahaya: ${expertData.bahaya}

    TUGAS: Berikan solusi teknis dalam 3 bagian terpisah tanda "|||".
    
    ATURAN SANGAT PENTING (JANGAN DILANGGAR):
    1. BAGIAN 1 (Penjelasan): JANGAN tulis ulang nama penyakit. JANGAN tulis kata "Penjelasan". Langsung masuk ke paragraf definisi.
    2. BAGIAN 2 & 3 (Tindakan & Pencegahan): 
       - JANGAN tulis judul section (seperti "Tindakan Darurat" atau "Pencegahan").
       - JANGAN gunakan teks tebal (**bold**) di awal poin. Langsung tulis langkahnya.
       - Contoh SALAH: "**Semprot:** Lakukan penyemprotan..."
       - Contoh BENAR: "Lakukan penyemprotan fungisida pada pagi hari..."
    
    FORMAT OUTPUT WAJIB:
    [Paragraf penjelasan langsung]
    |||
    [Poin-poin tindakan darurat (Markdown list)]
    |||
    [Poin-poin pencegahan (Markdown list)]
    `;

    try {
        const response = await fetch(KOLOSAL_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${API_KEY}` },
            body: JSON.stringify({
                "model": MODEL_ID,
                "messages": [{ "role": "user", "content": prompt }],
                "max_tokens": 1500,
                "temperature": 0.3
            })
        });
        const data = await response.json();
        if (data.error) return "Maaf|||Sistem Sibuk|||Coba lagi nanti";
        return data.choices?.[0]?.message?.content || "No Data|||No Data|||No Data";
    } catch (e) { return "Gagal|||Koneksi Error|||Cek Internet"; }
}