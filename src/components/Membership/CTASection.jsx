"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import "../css/membership/CTASection.css";

export default function CTASection() {
  return (
    <section
      className="cta-section"
      style={{
        backgroundImage: "url('/images/cta-gym.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="cta-overlay"></div>
      <div className="cta-container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="cta-title"
        >
          ابدأ اليوم، وحقق أهدافك أسرع
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="cta-description"
        >
          أكثر من 5000 عضو ملهم بالفعل. انضم إليهم الآن!
        </motion.p>
        <Link href="/memberships#plans" passHref>
          <motion.button
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cta-button"
          >
            ابدأ الآن
          </motion.button>
        </Link>
      </div>
    </section>
  );
}
