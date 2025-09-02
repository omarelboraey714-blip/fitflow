"use client";

import { motion } from "framer-motion";
import "@/components/css/prgramDetails/BenefitsList.css";

export default function BenefitsList({ items }) {
  // تحقق من البيانات
  const benefits = Array.isArray(items) ? items : [];

  if (benefits.length === 0) {
    return (
      <p className="benefits-empty" role="alert" aria-live="polite">
        لا توجد فوائد متاحة حاليًا.
      </p>
    );
  }

  return (
    <ul className="benefits-list" role="list">
      {benefits.map((item, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="benefits-list-item"
          role="listitem"
        >
          <svg
            className="benefits-list-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          {item}
        </motion.li>
      ))}
    </ul>
  );
}
