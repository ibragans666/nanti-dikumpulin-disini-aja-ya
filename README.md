# 🌾 Dokter Tani AI (Genesis Project)

![Project
Banner](https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000&auto=format&fit=crop)

> **"Di mana kearifan leluhur bertemu dengan presisi silikon."**

[![Next.js](https://img.shields.io/badge/Frontend-Next.js_14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Bun](https://img.shields.io/badge/Runtime-Bun_v1.0-orange?style=for-the-badge&logo=bun)](https://bun.sh/)
[![ElysiaJS](https://img.shields.io/badge/Backend-ElysiaJS-blueviolet?style=for-the-badge)](https://elysiajs.com/)
[![Supabase](https://img.shields.io/badge/Database-Supabase-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![ONNX](https://img.shields.io/badge/AI-ONNX_Runtime-blue?style=for-the-badge&logo=onnx)](https://onnx.ai/)

------------------------------------------------------------------------
## info
- video demo : https://youtu.be/TDGqm7viU7c?si=Yw0c9hrTbCWcKdSR
- akses website : https://nanti-dikumpulin-disini-aja-q5omcf60k-ibra-kaslanas-projects.vercel.app/

## Tentang Proyek

**Dokter Tani AI** adalah sistem pakar pertanian modern yang dirancang
untuk mendeteksi penyakit pada tanaman pangan vital (Padi & Jagung)
secara instan menggunakan kecerdasan buatan.

Aplikasi ini menggabungkan **Computer Vision**, **Expert Knowledge**,
dan **Generative AI** untuk menghasilkan deteksi cepat serta rekomendasi
penanganan yang mendalam dan mudah dipahami.

------------------------------------------------------------------------

## Workflow Sistem

<img width="500" height="300" alt="Screenshot 2025-12-07 131700" src="https://github.com/user-attachments/assets/316f3d09-5c01-4a62-9138-8b70c97605b8" />

**1. Input Gambar Tanaman**
Pengguna mengunggah foto daun tanaman padi atau jagung sebagai bahan
analisis awal.

**2. CNN MobileNetV2 (Fine-tuned ONNX)**
Model pre-trained MobileNetV2 yang sudah di-fine-tune dengan dataset
penyakit padi dan jagung melakukan klasifikasi awal menggunakan ONNX
Runtime Node.

**3. Expert Knowledge (Rule-Based)**
Hasil klasifikasi diteruskan ke modul pengetahuan pakar sederhana untuk
menambahkan deskripsi penyakit serta saran teknis awal.

**4. Generative AI (Kolosal AI - Claude Sonnet 4.5)**
Modul expert menghasilkan konteks deskripsi yang kemudian dikirimkan ke
API Kolosal.ai menggunakan model Claude Sonnet 4.5 untuk memperkaya
hasil analisis dengan rekomendasi penanganan dan pencegahan yang detail.

**5. Output Akhir**
Sistem menghasilkan:
- Nama penyakit
- Penjelasan lengkap
- Cara penanganan
- Pencegahan di masa depan

------------------------------------------------------------------------

## Fitur Unggulan

-   Deteksi penyakit berbasis MobileNetV2 + ONNX Runtime
-   Penjelasan Lengkap berbasis Kolosal.ai
-   Proteksi: Rate Limiter, Magic Number Validation, Helmet Headers
-   UI bertema Solarpunk × Cyberpunk
-   Cloud Sync via Supabase
-   Mobile-first design

------------------------------------------------------------------------

## Teknologi (Tech Stack)

| Area            | Teknologi                     | Fungsi Utama              |
|-----------------|-------------------------------|----------------------------|
| **Frontend**    | Next.js 14, Tailwind CSS v4   | UI & Client Logic         |
| **Backend**     | Bun, ElysiaJS                 | Server super cepat        |
| **AI Vision**   | ONNX Runtime Node             | Model klasifikasi gambar  |
| **Generative AI** | Kolosal API (Claude Sonnet 4.5)                 | Penyuluhan berbasis LLM   |
| **Database**    | Supabase (PostgreSQL)         | Riwayat scan              |
| **Storage**     | Supabase Storage              | Penyimpanan gambar        |


## ⚙️ Panduan Instalasi

### 1. Clone Repository

``` bash
git clone https://github.com/ibragans666/nanti-dikumpulin-disini-aja-ya.git
cd nanti-dikumpulin-disini-aja-ya
```

### 2. Setup Backend

``` bash
cd backend
bun install
```

Buat `.env`:

    PORT=3001
    SUPABASE_URL="https://your-project.supabase.co"
    SUPABASE_KEY="your-service-role-key"
    GEN_AI_API_KEY="sk-xxxxxx"

Jalankan backend:

``` bash
bun run src/index.ts
```

### 3. Setup Frontend

``` bash
cd frontend
bun install
```

Opsional `.env`:

    NEXT_PUBLIC_API_URL="http://localhost:3001"

Jalankan:

``` bash
bun run dev
```

Akses: http://localhost:3000

------------------------------------------------------------------------

## Struktur Folder

    backend/
      model_final.onnx
      src/
        config/
        services/
        utils/
        index.ts
      Dockerfile

    frontend/
      app/
      components/
      hooks/
      types/

------------------------------------------------------------------------

## Model AI

MobileNetV2 ditraining dengan subset dataset PlantVillage untuk
mendeteksi penyakit:

**Jagung:** Blight, Rust, Gray Leaf Spot, Healthy\
**Padi:** Bacterial Blight, Blast, Brownspot, Tungro

Akurasi validasi ±96%.

------------------------------------------------------------------------

## Tim Pengembang

-   [Ibra Kaslana](https://github.com/ibragans666)
-   [Aruffyal](https://github.com/kholiklutfi29)
-   [Suami sah Arcueid](https://github.com/gimmas/)

`<br>`{=html}

```{=html}
<p align="center">
```
Made with ❤️ and ☕ in Indonesia.`<br>`{=html} Hackathon Project 2025.
```{=html}
</p>
```
