"use client";

import { motion } from "framer-motion";

export default function MotivationSection() {
  return (
    <section
      className="py-24 px-6 text-center relative"
      style={{
        backgroundImage: "url('/images/motivation-bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-white mb-8 italic"
        >
          "القوة لا تأتي من الجسد، بل من الإرادة"
        </motion.blockquote>
        <motion.button
          whileHover={{ scale: 1.05 }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 3,
            ease: "linear",
          }}
          style={{
            background: "linear-gradient(90deg, #1e40af, #059669, #c2410c)",
            backgroundSize: "200% 100%",
          }}
          className="px-8 py-4 text-white font-semibold rounded-xl shadow-lg"
        >
          ابدأ اليوم
        </motion.button>
      </div>
    </section>
  );
}
