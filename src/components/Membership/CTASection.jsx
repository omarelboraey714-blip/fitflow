"use client";

import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section
      className="py-24 px-6 text-center relative"
      style={{
        backgroundImage: "url('/images/cta-gym.webp')",
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
          className="text-3xl md:text-4xl font-bold text-white mb-6"
        >
          ابدأ اليوم، وحقق أهدافك أسرع
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-200 mb-8"
        >
          أكثر من 5000 عضو ملهم بالفعل. انضم إليهم الآن!
        </motion.p>
        <motion.button
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-green-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition"
        >
          ابدأ الآن
        </motion.button>
      </div>
    </section>
  );
}
