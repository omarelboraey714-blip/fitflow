"use client";

import { motion } from "framer-motion";
import "../css/membership/MembershipHeader.css";

export default function MembershipHeader() {
  return (
    <section className="membership-header-section">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="membership-header-title"
      >
        اختر عضويتك وابدأ رحلتك
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="membership-header-description"
      >
        انضم لآلاف الرياضيين الذين اختاروا الأفضل
      </motion.p>
    </section>
  );
}
