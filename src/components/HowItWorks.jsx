"use client";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    "سجّل في التطبيق",
    "املأ استبيان مستوى لياقتك",
    "ابدأ خطتك فورًا",
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-12"
        >
          كيف تبدأ؟
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
          className="flex flex-col md:flex-row gap-8 items-center justify-center mt-12"
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                {i + 1}
              </div>
              <p className="text-gray-700 font-medium">{step}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
