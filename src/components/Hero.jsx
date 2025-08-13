"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center text-center px-6"
      style={{
        backgroundImage: "url('/images/hero-fit.webp')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
        >
          انضم إلى{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
            أقوى مجتمع رياضي
          </span>{" "}
          في السعودية
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto"
        >
          خطط تدريب وتغذية مخصصة، دعم مباشر من المدربين، وتجربة رقمية متكاملة.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transform transition"
        >
          ابدأ رحلتك الآن
        </motion.button>
      </motion.div>
    </section>
  );
}
