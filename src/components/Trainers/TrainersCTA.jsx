"use client";

import { motion } from "framer-motion";

export default function TrainersCTA() {
  return (
    <section
      className="py-24 px-6 text-center relative"
      style={{
        backgroundImage: "url('/images/trainers-bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white mb-6"
        >
          ابدأ تدريبك مع أفضل المدربين اليوم
        </motion.h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-500 text-white font-semibold rounded-xl shadow-lg"
        >
          احجز حصتك
        </motion.button>
      </div>
    </section>
  );
}
