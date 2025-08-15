"use client";

import { motion } from "framer-motion";

export default function MembershipCard({ plan }) {
  return (
    <motion.div
      className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl shadow-2xl text-white relative overflow-hidden"
      style={{
        background: plan.gradient,
      }}
      whileHover={{
        scale: 1.03,
        rotate: 1,
        boxShadow:
          "0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(255,255,255,0.1)",
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* زاوية زخرفية */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full"></div>

      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
      <div className="text-4xl font-extrabold mb-6">{plan.price}</div>

      <div className="flex items-center gap-3 mb-6">
        {plan.icon}
        <span className="text-lg">{plan.subtitle}</span>
      </div>

      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-gray-200">{feature}</span>
          </li>
        ))}
      </ul>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full py-3 bg-white text-black font-semibold rounded-xl shadow-lg hover:shadow-2xl transition"
      >
        اشترك الآن
      </motion.button>
    </motion.div>
  );
}
