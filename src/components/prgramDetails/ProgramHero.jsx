"use client";

import { motion } from "framer-motion";

export default function ProgramHero({ program }) {
  return (
    <section
      className="relative h-96 bg-cover bg-center"
      style={{ backgroundImage: `url(${program.hero.image})` }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 h-full flex items-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-2"
          >
            {program.title}
          </motion.h1>
          <p className="text-lg text-gray-200 mb-6">{program.subtitle}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {program.badges.map((badge, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={`px-3 py-1 rounded-full text-sm ${
                  badge.type === "home"
                    ? "bg-green-600"
                    : badge.type === "level"
                    ? "bg-blue-600"
                    : "bg-gray-700"
                }`}
              >
                {badge.label}
              </motion.span>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold rounded-xl"
          >
            ابدأ الآن
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
