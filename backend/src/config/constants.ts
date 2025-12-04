export const API_KEY = process.env.GEN_AI_API_KEY;
export const KOLOSAL_URL = "https://api.kolosal.ai/v1/chat/completions";
export const MODEL_ID = "Claude Sonnet 4.5"; 

export const CLASS_LABELS = [
    "Corn_Blight", "Corn_Common_Rust", "Corn_Gray_Leaf_Spot", "Corn_Healthy",
    "Rice_Bacterialblight", "Rice_Blast", "Rice_Brownspot", "Rice_Tungro"
];

export const EXPERT_KNOWLEDGE: Record<string, any> = {
    "Corn_Blight": { bahaya: "Tinggi", info: "Disebabkan jamur Exserohilum turcicum." },
    "Corn_Common_Rust": { bahaya: "Sedang", info: "Karat daun akibat jamur Puccinia sorghi." },
    "Corn_Gray_Leaf_Spot": { bahaya: "Tinggi", info: "Bercak abu (Cercospora)." },
    "Corn_Healthy": { bahaya: "Aman", info: "Tanaman sehat." },
    "Rice_Bacterialblight": { bahaya: "Tinggi", info: "Hawar Bakteri (Kresek)." },
    "Rice_Blast": { bahaya: "Sangat Tinggi", info: "Patah leher malai." },
    "Rice_Brownspot": { bahaya: "Sedang", info: "Bercak coklat oval." },
    "Rice_Tungro": { bahaya: "Tinggi", info: "Virus dari wereng hijau." }
};