"use client";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="py-20 px-6 bg-blue-700 text-white text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          مستعد تغيّر جسمك؟
        </h2>
        <p className="text-xl opacity-90 mb-8">
          انضم لأكثر من 5000 عميل بدأوا رحلتهم مع فيت فلو.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform"
        >
          ابدأ الآن مجانًا
        </motion.button>
      </motion.div>
    </section>
  );
}
