"use client";

import { motion } from "framer-motion";
import "@/components/css/prgramDetails/TrainerCard.css";

export default function TrainerCard({ trainer }) {
  const safeTrainer = {
    avatar: trainer?.avatar || "/images/default-trainer.webp",
    name: trainer?.name || "مدرب غير محدد",
    rating: trainer?.rating || 0,
    certs: Array.isArray(trainer?.certs) ? trainer.certs : [],
    bio: trainer?.bio || "لا توجد سيرة ذاتية متاحة",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="trainer-card"
      role="article"
      aria-label={`بطاقة المدرب ${safeTrainer.name}`}
    >
      <img
        src={safeTrainer.avatar}
        alt={`صورة المدرب ${safeTrainer.name}`}
        className="trainer-avatar"
        loading="lazy"
      />
      <h3 className="trainer-name">{safeTrainer.name}</h3>
      <p className="trainer-rating">★★★★★ {safeTrainer.rating.toFixed(1)}</p>
      <p className="trainer-certs">
        {safeTrainer.certs.join(", ") || "لا توجد شهادات"}
      </p>
      <p className="trainer-bio">{safeTrainer.bio}</p>
    </motion.div>
  );
}
