"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import "@/components/css/trainers/TrainersCTA.css";

export default function TrainersCTA() {
  return (
    <section
      className="trainers-cta relative"
      style={{
        backgroundImage: "url('/images/trainers-bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="trainers-cta-overlay"></div>
      <div className="trainers-cta-content">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="trainers-cta-title"
        >
          انضم إلى فريق المدربين المحترفين اليوم
        </motion.h2>
        <Link href="/programs">
          <button className="trainers-cta-btn">احجز برنامجك الآن</button>
        </Link>
      </div>
    </section>
  );
}
