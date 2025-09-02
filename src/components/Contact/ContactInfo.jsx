"use client";

import { motion } from "framer-motion";
import "@/components/css/Contact/ContactInfo.css";

export default function ContactInfo() {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-grid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ x: 5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="contact-card"
          >
            <motion.div
              whileHover={{ x: [0, 5, -5, 5, 0] }}
              className="contact-icon"
            >
              📍
            </motion.div>
            <h3 className="contact-title">العنوان</h3>
            <p className="contact-text">شارع الرياضة، القاهرة – مصر</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ x: 5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="contact-card"
          >
            <motion.div
              whileHover={{ rotate: [0, 5, -5, 0] }}
              className="contact-icon"
            >
              📞
            </motion.div>
            <h3 className="contact-title">الهاتف</h3>
            <p className="contact-text">0100 123 4567</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ x: 5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="contact-card"
          >
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="contact-icon"
            >
              📧
            </motion.div>
            <h3 className="contact-title">البريد الإلكتروني</h3>
            <p className="contact-text">support@gymbrand.com</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
