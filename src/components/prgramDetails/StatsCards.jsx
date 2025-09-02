"use client";

import { motion } from "framer-motion";
import "@/components/css/prgramDetails/StatsCards.css";

export default function StatsCards({ stats }) {
  const safeStats = stats && typeof stats === "object" ? stats : {};

  if (Object.keys(safeStats).length === 0) {
    return (
      <p className="stats-empty" role="alert" aria-live="polite">
        لا توجد إحصائيات متاحة حاليًا.
      </p>
    );
  }

  return (
    <div className="stats-cards-container" role="list">
      {Object.entries(safeStats).map(([key, value], i) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="stats-card"
          role="listitem"
        >
          <strong className="stats-card-value">{value || "غير متوفر"}</strong>
          <p className="stats-card-label">{key}</p>
        </motion.div>
      ))}
    </div>
  );
}
