"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import "../css/home/TestimonialsSlider.css";

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
    <section className="testimonials-section">
      <div className="testimonials-header">
        <h2 className="testimonials-title">آراء العملاء</h2>
        <p className="testimonials-description">
          انظر كيف غير FitFlow حياة الناس
        </p>
      </div>

      <div
        ref={sliderRef}
        className="testimonials-slider"
        style={{ scrollBehavior: "smooth" }}
      >
        {testimonials.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="testimonial-card"
          >
            <p className="testimonial-text">"{item.text}"</p>
            <strong className="testimonial-name">{item.name}</strong>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
