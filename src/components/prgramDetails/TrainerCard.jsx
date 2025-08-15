"use client";

import { motion } from "framer-motion";

export default function TrainerCard({ trainer }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-800 p-6 rounded-xl text-center"
    >
      <img
        src={trainer.avatar}
        alt={trainer.name}
        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
      />
      <h3 className="text-xl font-bold">{trainer.name}</h3>
      <p className="text-yellow-400">★★★★★ {trainer.rating}</p>
      <p className="text-gray-400 text-sm">{trainer.certs.join(", ")}</p>
      <p className="text-gray-300 mt-2">{trainer.bio}</p>
    </motion.div>
  );
}
