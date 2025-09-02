"use client";

import { motion } from "framer-motion";

export default function Branding() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center my-8"
    >
      <div className="inline-block p-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </div>
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500">
        FitFlow
      </h1>
      <p className="text-gray-300 font-bold mt-2">انضم إلى المستقبل الرياضي</p>
    </motion.div>
  );
}
