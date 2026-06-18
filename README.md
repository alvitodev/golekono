# GolekOno - AI Smart Tourism & Itinerary Planner Yogyakarta

GolekOno adalah platform asisten perjalanan pintar berbasis web yang merancang rencana perjalanan (itinerary) wisata secara dinamis di Yogyakarta menggunakan sistem rekomendasi cerdas berbasis Machine Learning (Content-Based Filtering) dan Analisis Sentimen (NLP) dari ulasan asli pengunjung.

## Struktur Repositori

Proyek ini terorganisasi menjadi dua direktori utama:
1. **`backend-golekono/`** - Layanan API Django REST, pemrosesan model Machine Learning, dan monitoring MLOps.
2. **`frontend-golekono/`** - Antarmuka pengguna Next.js (TypeScript) dengan antarmuka dinamis dan efek visual premium.

Setiap direktori mandiri dan memiliki konfigurasi paket/dependensinya masing-masing.

---

## Persyaratan Sistem

Sebelum memulai, pastikan perangkat Anda telah memenuhi prasyarat berikut:
* **Python**: Versi 3.10 atau di atasnya.
* **Node.js**: Versi 18.0 atau di atasnya (dengan npm, yarn, pnpm, atau bun).
* **Docker & Docker Compose**: Opsional, hanya untuk menjalankan Prometheus dan Grafana monitoring.
* **MySQL Server**: Diperlukan untuk operasional lokal (bisa lewat XAMPP, Laragon, atau instalasi native).

---

## Cara Setup & Menjalankan Proyek Secara Lokal

### 1. Setup Backend (`backend-golekono`)

Buka terminal dan masuk ke folder backend:
```bash
cd backend-golekono
```

1. **Buat & Aktifkan Virtual Environment**:
   * **Windows**:
     ```bash
     python -m venv .venv
     .venv\Scripts\activate
     ```
   * **macOS/Linux**:
     ```bash
     python -m venv .venv
     source .venv/bin/activate
     ```

2. **Pasang Dependensi Python**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Konfigurasi Database & Environment**:
   * Buat database baru di MySQL dengan nama `golekono_db`.
   * Duplikat file `.env.example` menjadi `.env`.
   * Buka `.env` dan sesuaikan kredensial MySQL Anda (terutama `DB_PASSWORD`, `DB_USER`, `DB_HOST`, dan `DB_PORT`).

4. **Jalankan Migrasi Database**:
   ```bash
   python manage.py migrate
   ```

5. **Jalankan Server Backend**:
   ```bash
   python manage.py runserver 0.0.0.0:8000
   ```
   Backend Django Anda akan aktif di `http://localhost:8000`.

---

### 2. Setup Frontend (`frontend-golekono`)

Buka terminal baru dan masuk ke folder frontend:
```bash
cd frontend-golekono
```

1. **Pasang Dependensi Node**:
   ```bash
   npm install
   ```

2. **Konfigurasi Variabel Lingkungan (Environment Variables)**:
   * Duplikat file `.env.example` menjadi `.env.local`.
   * File `.env.local` akan dibaca otomatis oleh Next.js untuk menghubungkan frontend ke API backend. 
   * Untuk pengembangan lokal menggunakan backend lokal:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:8000
     ```
   * Untuk menghubungkan frontend lokal ke API backend produksi yang sudah di-deploy:
     ```env
     NEXT_PUBLIC_API_URL=https://backend-golekono.vercel.app
     ```

3. **Jalankan Server Pembangunan Frontend**:
   ```bash
   npm run dev
   ```
   Antarmuka frontend Next.js akan aktif di `http://localhost:3000` (atau `http://localhost:3001` jika port 3000 sedang digunakan).

---

## Panduan Deployment ke Produksi (Vercel)

Kedua proyek telah dikonfigurasi agar ramah serverless dan dapat di-deploy secara terpisah ke Vercel.

### 1. Deployment Backend
* Gunakan repositori `backend-golekono` Anda dan hubungkan ke Vercel.
* Vercel akan otomatis membaca file [vercel.json](backend-golekono/vercel.json) dan men-deploy-nya menggunakan *runtime* Python.
* **Database Fallback**: Di Vercel (lingkungan serverless), backend otomatis beralih menggunakan database SQLite ephemeral di folder `/tmp` jika variabel lingkungan `DB_HOST` dikosongkan. Ini menjaga sistem tetap menyala stateles tanpa membutuhkan setup MySQL eksternal.
* **Nonaktifkan Debug Mode**: Di dashboard Vercel Settings, tambahkan environment variable `DEBUG=False` agar halaman kuning debug Django dinonaktifkan di server produksi demi keamanan.

### 2. Deployment Frontend
* Hubungkan repositori frontend Anda (`golekono`) ke Vercel.
* Di **Project Settings -> General** Vercel, atur **Root Directory** ke:  
  👉 **`frontend-golekono`**
* Di **Project Settings -> Environment Variables**, tambahkan variabel:
  * **Key**: `NEXT_PUBLIC_API_URL`
  * **Value**: URL backend live Anda (contoh: `https://backend-golekono.vercel.app`).
* Jalankan redeploy agar Next.js mem-build bundle statis dengan URL API produksi Anda.

---

## Pemantauan MLOps (Docker)

Untuk menjalankan server monitoring Prometheus dan Grafana guna mengamati performa dan latensi inferensi model ML:
1. Buka terminal di folder `backend-golekono/`.
2. Jalankan perintah Docker Compose:
   ```bash
   docker compose up -d
   ```
3. Akses antarmuka monitoring:
   * **Prometheus**: `http://localhost:9092`
   * **Grafana**: `http://localhost:3001` (User/Password default: `admin`/`admin`)
