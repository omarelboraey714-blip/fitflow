"use client";
import { motion } from "framer-motion";

export default function Testimonials() {
  const reviews = [
    {
      name: "محمد – الرياض",
      text: "من أول شهر شعرت بالفرق، خطة التغذية غيرت حياتي.",
    },
    { name: "نورة – جدة", text: "المدرب الافتراضي يشرح كل شيء وكأنه قدامي." },
    {
      name: "خالد – الدمام",
      text: "أفضل تطبيق لياقة استخدمته، أنصح كل واحد يجربه.",
    },
  ];

  return (
    <section id="testimonials" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center"
        >
          ماذا يقول عملاؤنا؟
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.25 } },
          }}
          className="grid md:grid-cols-3 gap-8"
        >
          {reviews.map((rev, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-lg"
            >
              <p className="text-gray-700 italic mb-4">"{rev.text}"</p>
              <strong className="text-blue-700">{rev.name}</strong>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
