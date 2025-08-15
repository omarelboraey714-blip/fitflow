"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function FeaturedProgram() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <motion.div
        style={{ y }}
        className="max-w-5xl mx-auto bg-gradient-to-r from-red-900 to-black rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src="/images/program-transformation.webp"
              alt="برنامج التحول الشامل"
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8 text-white flex flex-col justify-center">
            <motion.h2
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4"
            >
              برنامج التحول الشامل
            </motion.h2>
            <motion.p
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg mb-6"
            >
              12 أسبوع لتغيير حياتك
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="self-start px-6 py-3 bg-white text-black font-semibold rounded-xl shadow-lg"
            >
              سجّل الآن
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
