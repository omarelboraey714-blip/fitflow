"use client";

import { motion } from "framer-motion";
import "@/components/css/trainers/TrainersHeader.css";

export default function TrainersHeader() {
  return (
    <section className="trainers-header relative">
      <div className="trainers-header-overlay"></div>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="trainers-header-title"
      >
        تعرف على مدربينا المحترفين
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="trainers-header-subtitle"
      >
        خبراء لياقة لديهم الشغف لمساعدتك في تحقيق أهدافك
      </motion.p>
    </section>
  );
}
