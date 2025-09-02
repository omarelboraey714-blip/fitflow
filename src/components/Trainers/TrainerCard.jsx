"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import "@/components/css/trainers/TrainerCard.css";

export default function TrainerCard({ trainer, isLoading }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
      transition={{ duration: 0.3 }}
      className={`trainer-card ${isLoading ? "skeleton" : ""}`}
    >
      <div className="trainer-image-wrapper">
        {isLoading ? (
          <div className="skeleton-image" />
        ) : (
          <>
            <img
              src={trainer.avatar}
              alt={trainer.name}
              className="trainer-image"
              loading="lazy"
            />
            <div className="trainer-image-overlay"></div>
          </>
        )}
      </div>
      <div className="trainer-content">
        <h3 className="trainer-name">{isLoading ? "..." : trainer.name}</h3>
        <p className="trainer-specialty">
          {isLoading ? "..." : trainer.specialty}
        </p>
        <p className="trainer-experience">
          {isLoading ? "..." : `خبرة: ${trainer.experience}`}
        </p>
        {!isLoading && (
          <Link href={`/trainers/${trainer.slug}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="trainer-btn"
            >
              عرض التفاصيل
            </motion.button>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
