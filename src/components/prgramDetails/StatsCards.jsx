"use client";

import { motion } from "framer-motion";

export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
      {Object.entries(stats).map(([key, value], i) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-gray-800 p-4 rounded-xl text-center"
        >
          <strong className="text-2xl text-blue-400">{value}</strong>
          <p className="text-sm text-gray-400">{key}</p>
        </motion.div>
      ))}
    </div>
  );
}
