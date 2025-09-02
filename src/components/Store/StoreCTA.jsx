"use client";

import { motion } from "framer-motion";
import "@/components/css/Store/StoreCTA.css";

export default function StoreCTA() {
  return (
    <section className="store-cta-section">
      <div className="store-cta-background"></div>
      <div className="store-cta-container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="store-cta-title"
        >
          🚀 جاهز تبدأ تدريبك بأفضل تجهيز؟
        </motion.h2>
        <p className="store-cta-description">
          اطلب دلوقتي وخلي الجيم ستايلك جزء من هويتك.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(255,255,255,0.4)",
              "0 0 20px 10px rgba(255,255,255,0)",
            ],
            transition: { repeat: Infinity, duration: 2 },
          }}
          className="store-cta-button"
        >
          ابدأ التسوق
        </motion.button>
      </div>
    </section>
  );
}
