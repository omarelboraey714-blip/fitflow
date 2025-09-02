"use client";

import { motion } from "framer-motion";

export default function ProgramDetailContainer({ children, slug }) {
  return (
    <motion.div
      key={slug || "program-detail"}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="program-detail-container"
      role="main"
      aria-label="تفاصيل البرنامج"
    >
      {children}
    </motion.div>
  );
}
