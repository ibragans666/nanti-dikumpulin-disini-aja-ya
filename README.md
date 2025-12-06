# 🌾 Dokter Tani AI (Genesis Project)

![Project
Banner](https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000&auto=format&fit=crop)

> **"Di mana kearifan leluhur bertemu dengan presisi silikon."**

[![Next.js](https://img.shields.io/badge/Frontend-Next.js_14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Bun](https://img.shields.io/badge/Runtime-Bun_v1.0-orange?style=for-the-badge&logo=bun)](https://bun.sh/)
[![ElysiaJS](https://img.shields.io/badge/Backend-ElysiaJS-blueviolet?style=for-the-badge)](https://elysiajs.com/)
[![Supabase](https://img.shields.io/badge/Database-Supabase-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![ONNX](https://img.shields.io/badge/AI-ONNX_Runtime-blue?style=for-the-badge&logo=onnx)](https://onnx.ai/)

## 📖 Tentang Proyek

**Dokter Tani AI** adalah sistem pakar pertanian modern yang dirancang
untuk mendeteksi penyakit pada tanaman pangan vital (Padi & Jagung)
secara instan menggunakan kecerdasan buatan.

Aplikasi ini menggabungkan **Computer Vision** dan **Generative AI**
untuk memberikan deteksi cepat serta konsultasi pertanian yang mendalam.

### 🚀 Fitur Unggulan

-   👁️ Deteksi penyakit berbasis model ONNX MobileNetV2.
-   🤖 Konsultasi AI menggunakan LLM (Claude/Qwen).
-   🛡️ Keamanan berlapis: Rate Limiter, Magic Number Validation, Helmet
    Headers.
-   🌓 UI Solarpunk & Cyberpunk.
-   ☁️ Cloud Sync via Supabase.
-   📱 Mobile First.

------------------------------------------------------------------------

## 🛠️ Teknologi (Tech Stack)

  Area               Teknologi                     Fungsi Utama
  ------------------ ----------------------------- --------------------------
  **Frontend**       Next.js 14, Tailwind CSS v4   UI & Client Logic
  **Backend**        Bun, ElysiaJS                 Server super cepat
  **AI Vision**      ONNX Runtime Node             Model klasifikasi gambar
  **Generatif AI**   Kolosal API                   Penyuluhan berbasis LLM
  **Database**       Supabase (PostgreSQL)         Riwayat scan
  **Storage**        Supabase Storage              Penyimpanan gambar

------------------------------------------------------------------------

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

Buat file `.env`:

    PORT=3001
    SUPABASE_URL="https://your-project.supabase.co"
    SUPABASE_KEY="your-service-role-key"
    GEN_AI_API_KEY="sk-xxxxxx"

Jalankan:

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

## 📂 Struktur Folder

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

## 🧠 Model AI

Model MobileNetV2 ditraining dengan dataset PlantVillage untuk
mendeteksi penyakit:

**Jagung:** Blight, Rust, Gray Leaf Spot, Healthy\
**Padi:** Bacterial Blight, Blast, Brownspot, Tungro

Akurasi validasi \~96%.

------------------------------------------------------------------------

## 🏆 Tim Pengembang -- "Irigasi Bluetooth"

-   Atlas Vierra --- Lead AI Architect\
-   Lyra Kirei --- UI/UX Alchemist\
-   Orion Dusk --- System Engineer

```{=html}
<p align="center">
```
Made with ❤️ and ☕ in Indonesia.`<br>`{=html} Hackathon Project 2025.
```{=html}
</p>
```
