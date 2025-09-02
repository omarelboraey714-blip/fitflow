"use client";

import { motion } from "framer-motion";
import "@/components/css/Checkout/TrustBadges.css";

const badges = [
  { icon: "🔒", text: "الدفع الآمن" },
  { icon: "✅", text: "استرجاع خلال 14 يوم" },
  { icon: "🌍", text: "شحن دولي" },
];

export default function TrustBadges() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="trust-badges-container"
    >
      <div className="trust-badges-wrapper">
        {badges.map((badge, i) => (
          <div key={i} className="trust-badge-item">
            <span className="trust-badge-icon">{badge.icon}</span>
            <span className="trust-badge-text">{badge.text}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
