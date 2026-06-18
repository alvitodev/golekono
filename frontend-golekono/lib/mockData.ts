import type { ItineraryResponse } from "@/types";

/**
 * Full mock response matching the backend API contract.
 * Contains 3 days of itinerary data with diverse destinations.
 */
export const MOCK_ITINERARY: ItineraryResponse = {
  status: "success",
  estimasi_total_tiket: 185000,
  itinerary: {
    "Hari 1": [
      {
        nama: "Candi Borobudur",
        type: "Budaya_Dan_Sejarah",
        vote_average: 4.7,
        htm_weekday: 50000,
        image:
          "https://res.cloudinary.com/dfciqrwpe/image/upload/v1748936304/borobudur_brbr6l.jpg",
        description:
          "Candi yang pernah masuk sebagai salah satu dari tujuh keajaiban dunia. Candi Buddha terbesar di dunia ini terletak di Magelang, Jawa Tengah. Dibangun pada abad ke-9 oleh dinasti Syailendra, Borobudur memiliki 2.672 panel relief dan 504 arca Buddha.",
        sentiment_label: "Positif",
      },
      {
        nama: "Tebing Breksi",
        type: "Alam",
        vote_average: 4.4,
        htm_weekday: 10000,
        image:
          "https://res.cloudinary.com/dfciqrwpe/image/upload/v1748938869/tebing-breksi_ydjncv.jpg",
        description:
          "Tebing Breksi merupakan tempat wisata yang berada di wilayah Kabupaten Sleman. Dahulu kawasan ini merupakan area penambangan batu breksi yang kemudian disulap menjadi tempat wisata yang instagramable dengan pemandangan matahari terbenam yang menakjubkan.",
        sentiment_label: "Positif",
      },
    ],
    "Hari 2": [
      {
        nama: "Candi Prambanan",
        type: "Budaya_Dan_Sejarah",
        vote_average: 4.7,
        htm_weekday: 50000,
        image:
          "https://res.cloudinary.com/dfciqrwpe/image/upload/v1748938870/candi-prambanan_cpukic.jpg",
        description:
          "Candi Prambanan adalah kompleks candi Hindu terbesar di Indonesia yang dibangun pada abad ke-9 Masehi. Candi ini didedikasikan untuk Trimurti, tiga dewa utama Hindu: Brahma, Wisnu, dan Siwa. Keindahan arsitekturnya menjadikannya Situs Warisan Dunia UNESCO.",
        sentiment_label: "Positif",
      },
      {
        nama: "Taman Sari",
        type: "Budaya_Dan_Sejarah",
        vote_average: 4.3,
        htm_weekday: 15000,
        image:
          "https://res.cloudinary.com/dfciqrwpe/image/upload/v1748938869/taman-sari_xpkjzl.jpg",
        description:
          "Taman Sari adalah bekas taman atau kebun istana Kesultanan Yogyakarta. Dibangun pada masa Sultan Hamengku Buwono I pada tahun 1758-1765, kompleks ini dulunya berfungsi sebagai tempat peristirahatan dan meditasi sultan beserta keluarganya.",
        sentiment_label: "Positif",
      },
    ],
    "Hari 3": [
      {
        nama: "Pantai Parangtritis",
        type: "Alam",
        vote_average: 4.2,
        htm_weekday: 10000,
        image:
          "https://res.cloudinary.com/dfciqrwpe/image/upload/v1748938869/parangtritis_hcqt0e.jpg",
        description:
          "Pantai Parangtritis merupakan pantai yang paling terkenal di Yogyakarta. Terletak sekitar 27 km dari pusat kota, pantai ini menawarkan pemandangan sunset yang spektakuler, gumuk pasir, dan suasana mistis yang khas dengan legenda Nyi Roro Kidul.",
        sentiment_label: "Netral",
      },
      {
        nama: "Museum Ullen Sentalu",
        type: "Edukasi",
        vote_average: 4.6,
        htm_weekday: 25000,
        image:
          "https://res.cloudinary.com/dfciqrwpe/image/upload/v1748938869/ullen-sentalu_wvqzjf.jpg",
        description:
          "Museum Ullen Sentalu adalah museum budaya Jawa yang terletak di kawasan Kaliurang. Museum ini menyimpan koleksi batik, lukisan, dan artefak kerajaan Mataram. Sering disebut sebagai museum terbaik di Indonesia oleh TripAdvisor.",
        sentiment_label: "Positif",
      },
    ],
  },
};
