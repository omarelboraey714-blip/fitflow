"use client";

import { motion } from "framer-motion";

export default function EnrollSticky({ price, discount }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg md:static md:p-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div>
          <strong className="text-2xl">{price} ر.س</strong>
          {discount && (
            <span className="text-sm line-through text-gray-300 ml-2">
              {price + 100} ر.س
            </span>
          )}
        </div>
        <button className="mt-2 md:mt-0 px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100">
          انضم الآن
        </button>
      </div>
    </motion.div>
  );
}
