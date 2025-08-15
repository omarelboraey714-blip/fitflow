"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ProgramCard({ program }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg group"
    >
      <Link href={`/programs/${program.slug}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={program.image}
            alt={program.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <h3 className="text-xl font-bold">{program.name}</h3>
            <p>{program.duration}</p>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <Link href={`/programs/${program.slug}`}>
          <h3 className="text-xl font-bold text-white mb-2 hover:text-blue-400 cursor-pointer">
            {program.name}
          </h3>
        </Link>
        <p className="text-gray-400 mb-2">{program.duration}</p>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm bg-blue-600 px-2 py-1 rounded text-white">
            {program.level}
          </span>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-xs ${
                  i < program.difficulty ? "text-yellow-400" : "text-gray-600"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <ul className="space-y-1 mb-6 text-sm text-gray-300">
          {program.features.slice(0, 2).map((f, i) => (
            <li key={i}>• {f}</li>
          ))}
        </ul>
        <Link href={`/programs/${program.slug}`}>
          <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
            عرض التفاصيل
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
