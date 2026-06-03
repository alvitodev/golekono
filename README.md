# GekOno - Smart Itinerary dengan AI

Website untuk rekomendasi itinerary perjalanan dinamis menggunakan Machine Learning (Content-Based Filtering) dan analisis sentimen.

## Struktur Project

Repository ini terdiri dari dua root folder utama:
1. `backend-golekono` - Layanan Django REST API backend dan MLOps monitoring.
2. `frontend-golekono` - Antarmuka Next.js (TypeScript) frontend.

Tiap folder memiliki file konfigurasi kebutuhan (requirements.txt dan package.json) masing-masing, sehingga dapat dikloning dan dijalankan secara terpisah maupun bersamaan.

## Persyaratan Sistem

- Python 3.10 atau versi di atasnya (Rekomendasi: Python 3.13)
- Node.js versi 18.0 atau versi di atasnya
- npm, yarn, pnpm, atau bun sebagai package manager
- Docker dan Docker Compose (untuk Prometheus dan Grafana)
- MySQL Server (bisa menggunakan Laragon, XAMPP, atau instalasi native)

## Setup dan Requirements tiap Folder

### 1. Setup Backend (backend-golekono)

Masuk ke folder backend:
```bash
cd backend-golekono
```

Buat dan aktifkan virtual environment (venv):
- Windows:
  ```bash
  python -m venv .venv
  .venv\Scripts\activate
  ```
- macOS/Linux:
  ```bash
  python -m venv .venv
  source .venv/bin/activate
  ```

Instalasi requirements:
```bash
pip install -r requirements.txt
```

Konfigurasi Database & Environment:
1. Pastikan server MySQL aktif pada port 3306.
2. Buat database baru bernama `golekono_db` di HeidiSQL atau MySQL CLI.
3. Salin file `.env.example` menjadi `.env` lalu sesuaikan kredensial database Anda (terutama `DB_PASSWORD`).
4. Jalankan migrasi tabel database:
   ```bash
   python manage.py migrate
   ```
5. Jalankan server pembangunan backend:
   ```bash
   python manage.py runserver 0.0.0.0:8000
   ```

Layanan backend aktif di http://localhost:8000.

### 2. Setup Frontend (frontend-golekono)

Masuk ke folder frontend:
```bash
cd frontend-golekono
```

Instalasi requirements Node:
```bash
npm install
```

Jalankan server pembangunan frontend:
```bash
npm run dev
```

Layanan frontend aktif di http://localhost:3000.

#### Menjalankan Virtual Environment di Folder Frontend (Opsional)
Jika Anda membutuhkan virtual environment (venv) untuk utilitas Python di folder frontend:
- Windows:
  ```bash
  python -m venv .venv
  .venv\Scripts\activate
  ```
- macOS/Linux:
  ```bash
  python -m venv .venv
  source .venv/bin/activate
  ```
- Instalasi dependensi:
  ```bash
  pip install -r requirements.txt
  ```

## Pemantauan MLOps (Docker)

Untuk menjalankan server monitoring Prometheus dan Grafana:
1. Buka terminal di folder `backend-golekono`.
2. Jalankan docker compose:
   ```bash
   docker compose up -d
   ```
3. Akses dashboard:
   - Prometheus: http://localhost:9092
   - Grafana: http://localhost:3001 (User/Pass: admin/admin)
