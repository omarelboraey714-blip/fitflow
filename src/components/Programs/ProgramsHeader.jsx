"use client";

import { motion } from "framer-motion";

export default function ProgramsHeader() {
  return (
    <section className="py-20 px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-white mb-4"
      >
        اختر برنامجك التدريبي
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
      >
        برامج احترافية مصممة لتحقيق أهدافك
      </motion.p>
      <motion.button
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
        className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-green-500 text-white font-semibold rounded-xl hover:shadow-lg transition"
      >
        ابدأ الآن
      </motion.button>
    </section>
  );
}
