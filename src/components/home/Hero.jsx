"use client";

import { motion } from "framer-motion";
import GradientButton from "./GradientButton";
import "../css/home/Hero.css";

export default function Hero() {
  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: "url('/images/hero-fit.webp')",
      }}
    >
      {/* Overlay */}
      <div className="hero-overlay"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="hero-content"
      >
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="hero-title"
        >
          انضم إلى{" "}
          <span className="hero-title-highlight">أقوى مجتمع رياضي</span> في
          السعودية
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="hero-description"
        >
          خطط تدريب وتغذية مخصصة، دعم مباشر من المدربين، وتجربة رقمية متكاملة.
        </motion.p>

        <GradientButton text="ابدأ رحلتك الآن" />
      </motion.div>
    </section>
  );
}
