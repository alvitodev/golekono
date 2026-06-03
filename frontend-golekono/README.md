# Golekono Frontend

Frontend modern berbasis Next.js (TypeScript) untuk aplikasi rancang itinerary wisata pintar Golekono di Yogyakarta.

## Persyaratan Sistem

- Node.js versi 18.0 atau versi di atasnya
- npm, yarn, pnpm, atau bun sebagai package manager
- Python 3.10 atau versi di atasnya (opsional, jika ingin mengaktifkan virtual environment di folder ini)

## Struktur Folder Utama

- `app/`: Routing halaman Next.js (termasuk halaman utama dan perencana).
- `components/`: Komponen UI modular (landing page, layout, form perencana, dll).
- `lib/`: Data mock, formatters, konstanta, dan koneksi API.
- `types/`: Definisi tipe data TypeScript.

## Cara Setup dan Menjalankan Aplikasi

1. Masuk ke direktori frontend:
   ```bash
   cd frontend-golekono
   ```

2. Hubungkan dengan Django ML Backend:
   Pastikan backend Django berjalan di port `8000` (http://localhost:8000).

3. Install Node dependencies:
   ```bash
   npm install
   ```

4. Jalankan development server:
   ```bash
   npm run dev
   ```

Aplikasi frontend akan aktif di http://localhost:3000.

## Menggunakan Virtual Environment (Venv)

Jika Anda ingin mengaktifkan venv di folder ini secara bersamaan untuk kebutuhan utilitas Python:

1. Buat virtual environment:
   ```bash
   python -m venv .venv
   ```

2. Aktifkan venv:
   - Windows:
     ```bash
     .venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source .venv/bin/activate
     ```

3. Pasang requirements jika diperlukan:
   ```bash
   pip install -r requirements.txt
   ```
