import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

// Inisialisasi Client
const supabase = createClient(supabaseUrl, supabaseKey);

export async function uploadImage(file: File) {
    const fileName = `${Date.now()}_${file.name.replace(/\s/g, '_')}`;

    const { data, error } = await supabase
        .storage
        .from('scans') 
        .upload(fileName, file, {
            contentType: file.type
        });

    if (error) {
        console.error("Upload Error:", error);
        return null;
    }

    const { data: publicUrl } = supabase
        .storage
        .from('scans')
        .getPublicUrl(fileName);

    return publicUrl.publicUrl;
}