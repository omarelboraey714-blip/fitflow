"use client";

import { motion } from "framer-motion";
import { FaClock, FaBolt, FaShieldAlt, FaGem } from "react-icons/fa";
import Link from "next/link";
import "../css/membership/MembershipCard.css";

const iconMap = {
  FaClock: <FaClock className="membership-card-icon" />,
  FaBolt: <FaBolt className="membership-card-icon" />,
  FaShieldAlt: <FaShieldAlt className="membership-card-icon" />,
  FaGem: <FaGem className="membership-card-icon" />,
};

export default function MembershipCard({ plan }) {
  if (!plan) return null;

  const IconComponent = iconMap[plan.icon_name] || (
    <FaClock className="membership-card-icon" />
  );

  return (
    <motion.div
      className="membership-card"
      style={{
        background:
          plan.gradient || "linear-gradient(135deg, #1e3a8a, #1e40af)",
      }}
      whileHover={{
        scale: 1.03,
        rotate: 1,
        boxShadow:
          "0 12px 24px rgba(0,0,0,0.2), 0 0 15px rgba(255,255,255,0.08)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      <div className="membership-card-decoration"></div>

      <h3 className="membership-card-title">{plan.name}</h3>
      <div className="membership-card-price">{plan.price}</div>

      <div className="membership-card-subtitle-container">
        {IconComponent}
        <span className="membership-card-subtitle">{plan.subtitle}</span>
      </div>

      <ul className="membership-card-features">
        {plan.features.map((feature, index) => (
          <li key={`feature-${index}`} className="membership-card-feature">
            <svg
              className="membership-card-check-icon"
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
            <span className="membership-card-feature-text">{feature}</span>
          </li>
        ))}
      </ul>

      {/* ربط الزر بصفحة الدفع */}
      <Link href={`/checkout?item=${plan.id}&type=membership`} passHref>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="membership-card-button"
        >
          اشترك الآن
        </motion.button>
      </Link>
    </motion.div>
  );
}
