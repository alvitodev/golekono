"use client";

import Link from "next/link";

export default function GuidePage() {
  const pdfUrl =
    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Panduan Penggunaan GolekOno
            </h1>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
            >
              ← Kembali
            </Link>
          </div>
          <p className="text-slate-600 mt-2">
            Pelajari cara menggunakan GolekOno untuk merencanakan perjalanan
            impian Anda
          </p>
        </div>
      </div>

      {/* PDF Viewer Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
          {/* PDF Info Bar */}
          <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
            <p className="text-sm text-slate-600 font-medium">
              📄 Panduan PDF - Scroll untuk melihat lebih banyak konten
            </p>
          </div>

          {/* PDF Embed Container */}
          <div className="w-full h-[75vh] bg-slate-50">
            <iframe
              src={pdfUrl}
              title="Panduan Penggunaan GolekOno"
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
            />
          </div>

          {/* Fallback Info */}
          <div className="px-6 py-4 bg-blue-50 border-t border-slate-200">
            <p className="text-sm text-blue-800">
              💡 Jika PDF tidak dapat ditampilkan, coba menggunakan browser yang
              berbeda atau
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline ml-1 hover:text-blue-900"
              >
                download PDF secara langsung
              </a>
              .
            </p>
          </div>
        </div>

        {/* Quick Tips Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Panduan Cepat
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex gap-3">
              <span className="text-2xl">🏃</span>
              <div>
                <h3 className="font-semibold text-slate-900">Mulai Cepat</h3>
                <p className="text-sm text-slate-600">
                  Isi formulir preferensi Anda dan dapatkan rekomendasi dalam
                  hitungan detik
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">💰</span>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Budget Planning
                </h3>
                <p className="text-sm text-slate-600">
                  Atur budget Anda dan kami akan merekomendasikan destinasi yang
                  sesuai
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">❤️</span>
              <div>
                <h3 className="font-semibold text-slate-900">Minat Pribadi</h3>
                <p className="text-sm text-slate-600">
                  Pilih minat Anda untuk mendapatkan rekomendasi yang
                  dipersonalisasi
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">📅</span>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Timeline Fleksibel
                </h3>
                <p className="text-sm text-slate-600">
                  Sesuaikan durasi perjalanan sesuai kebutuhan Anda
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
