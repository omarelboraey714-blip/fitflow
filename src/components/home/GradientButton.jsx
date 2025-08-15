"use client";
import { motion } from "framer-motion";

export default function GradientButton({ text }) {
  return (
    <motion.button
      initial={{ backgroundPosition: "0% 50%" }}
      whileHover={{ backgroundPosition: "100% 50%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={{
        backgroundImage: "linear-gradient(90deg, #2563eb, #22c55e)",
        backgroundSize: "200% 200%",
      }}
      className="px-8 py-4 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl"
    >
      {text}
    </motion.button>
  );
}
