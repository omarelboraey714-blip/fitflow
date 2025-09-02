"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import "@/components/css/programs/ProgramsHeader.css";

export default function ProgramsHeader() {
  return (
    <section className="programs-header">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="programs-header-title"
      >
        اختر برنامجك التدريبي
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="programs-header-subtitle"
      >
        برامج احترافية مصممة لتحقيق أهدافك
      </motion.p>
      <Link href="#programs-section">
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
          className="programs-header-btn"
          aria-label="ابدأ اختيار برنامجك التدريبي"
        >
          ابدأ الآن
        </motion.button>
      </Link>
    </section>
  );
}
