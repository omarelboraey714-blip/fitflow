"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="pt-28 pb-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-100"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            ابدأ رحلتك نحو <span className="text-blue-600">جسم مثالي</span> مع
            فيت فلو
          </h1>
          <p className="text-lg text-gray-600 mt-6">
            خطط تدريب وتغذية مخصصة لك، مع مدربين محترفين، وتطبيق سهل الاستخدام.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:shadow-lg hover:bg-blue-700 transition mt-8"
          >
            ابدأ الآن مجانًا
          </motion.button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <img
            src="/images/hero-fit.webp"
            alt="شخص يمارس تمارين لياقة بدنية في الرياض مع تطبيق FitFlow"
            loading="lazy"
            className="rounded-2xl shadow-2xl"
          />
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
            <strong className="text-green-600">+5000</strong> عميل راضٍ
          </div>
        </motion.div>
      </div>
    </section>
  );
}
