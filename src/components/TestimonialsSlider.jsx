"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    name: "أحمد – الرياض",
    text: "غير حياتي! من أول شهر شعرت بالفرق في طاقتي وثقتي.",
  },
  {
    name: "نورة – جدة",
    text: "المدرب الافتراضي دقيق جدًا، والخطة مناسبة لروتيني.",
  },
  {
    name: "خالد – الدمام",
    text: "أفضل تطبيق لياقة استخدمته، أنصح كل واحد يجربه.",
  },
];

export default function TestimonialsSlider() {
  const sliderRef = useRef();

  return (
    <section className="py-20 px-6 bg-black">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">آراء العملاء</h2>
        <p className="text-gray-400">انظر كيف غير FitFlow حياة الناس</p>
      </div>

      <div
        ref={sliderRef}
        className="flex overflow-x-auto space-x-6 pb-6 scrollbar-hide scroll-smooth"
        style={{ scrollBehavior: "smooth" }}
      >
        {testimonials.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="flex-shrink-0 w-80 bg-gray-800 p-6 rounded-2xl shadow-lg"
          >
            <p className="text-gray-300 italic mb-4">"{item.text}"</p>
            <strong className="text-blue-400">{item.name}</strong>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
