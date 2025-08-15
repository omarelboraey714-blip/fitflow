"use client";

import { motion } from "framer-motion";

export default function MembershipHeader() {
  return (
    <section className="py-20 px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-white mb-4"
      >
        اختر عضويتك وابدأ رحلتك
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xl text-gray-300 max-w-2xl mx-auto"
      >
        انضم لآلاف الرياضيين الذين اختاروا الأفضل
      </motion.p>
    </section>
  );
}
