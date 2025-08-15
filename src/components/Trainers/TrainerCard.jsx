"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function TrainerCard({ trainer }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg text-center hover:shadow-2xl transition"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={trainer.avatar}
          alt={trainer.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white">{trainer.name}</h3>
        <p className="text-blue-400">{trainer.specialty}</p>
        <p className="text-gray-400 text-sm">خبرة: {trainer.experience}</p>

        <Link href={`/trainers/${trainer.slug}`}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            عرض التفاصيل
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
