"use client";

import { motion } from "framer-motion";

export default function GuideView() {
  const pdfUrl =
    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

  return (
    <section className="flex-1 pt-24 pb-16 relative overflow-hidden min-h-[70vh] flex flex-col items-center">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/15 rounded-full blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        {/* Header/Subheader Text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-charcoal tracking-tight">
            Panduan Penggunaan GolekOno
          </h1>
          <p className="text-slate-muted mt-2 text-sm sm:text-base">
            Pelajari cara menggunakan GolekOno untuk merencanakan perjalanan impian Anda di Yogyakarta.
          </p>
        </motion.div>

        {/* PDF Embed directly */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full rounded-2xl shadow-xl overflow-hidden border border-stone bg-white h-[75vh]"
        >
          <iframe
            src={pdfUrl}
            title="Panduan Penggunaan GolekOno"
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
          />
        </motion.div>
      </div>
    </section>
  );
}
