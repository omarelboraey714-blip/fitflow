"use client";

import { motion } from "framer-motion";

export default function ContactHeader() {
  return (
    <section className="py-20 px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-white mb-4"
      >
        تواصل معنا 💪
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xl text-gray-300 max-w-2xl mx-auto"
      >
        فريقنا موجود دايمًا للرد على استفساراتك ودعمك للوصول لهدفك الرياضي.
      </motion.p>
    </section>
  );
}
