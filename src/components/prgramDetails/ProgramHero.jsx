"use client";

import { motion } from "framer-motion";
import "@/components/css/prgramDetails/ProgramHero.css";

export default function ProgramHero({ program }) {
  const safeProgram = {
    name: program?.name || "برنامج غير متوفر", // استخدام name بدل title
    subtitle: program?.subtitle || "وصف غير متوفر",
    hero: {
      image:
        program?.hero_image || program?.image || "/images/default-program.webp", // استخدام hero_image أو image
    },
    badges: Array.isArray(program?.badges) ? program.badges : [],
  };

  return (
    <section
      className="program-hero-section"
      style={{ backgroundImage: `url(${safeProgram.hero.image})` }}
      role="banner"
      aria-label="رأس صفحة البرنامج"
    >
      <div className="program-hero-overlay"></div>
      <div className="program-hero-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="program-hero-content"
        >
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="program-hero-title"
            id="program-hero-title"
          >
            {safeProgram.name}
          </motion.h1>
          <p className="program-hero-subtitle">{safeProgram.subtitle}</p>
          <div className="program-hero-badges">
            {safeProgram.badges.length > 0 ? (
              safeProgram.badges.map((badge, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className={`program-hero-badge ${
                    badge.type === "home"
                      ? "program-hero-badge-home"
                      : badge.type === "level"
                      ? "program-hero-badge-level"
                      : "program-hero-badge-default"
                  }`}
                  role="presentation"
                >
                  {badge.label || "غير محدد"}
                </motion.span>
              ))
            ) : (
              <span className="program-hero-badge-default" role="presentation">
                لا توجد وسوم
              </span>
            )}
          </div>
          <motion.button
            className="program-hero-button"
            aria-label={`ابدأ الآن في ${safeProgram.name}`}
          >
            ابدأ الآن
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
