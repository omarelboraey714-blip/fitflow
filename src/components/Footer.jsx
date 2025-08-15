"use client";

import { motion } from "framer-motion";
import "./css/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="footer-content"
      >
        <div className="footer-section">
          <h3 className="footer-brand-title">FitFlow</h3>
          <p className="footer-brand-description">
            منصتك الشاملة للوصول إلى جسم أحلامك.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-links-title">روابط سريعة</h4>
          <ul className="footer-links-list">
            <li>
              <a href="#home" className="footer-link">
                الرئيسية
              </a>
            </li>
            <li>
              <a href="#features" className="footer-link">
                المميزات
              </a>
            </li>
            <li>
              <a href="/dashboard" className="footer-link">
                لوحة التحكم
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-contact-title">تواصل معنا</h4>
          <p className="footer-contact-info">support@fitflow.sa</p>
          <p className="footer-contact-info">+966 5X XXX XXXX</p>
        </div>

        <div className="footer-section">
          <h4 className="footer-social-title">تابعنا</h4>
          <div className="footer-social-links">
            {["X", "Instagram", "YouTube"].map((social) => (
              <a key={social} href="#" className="footer-social-link">
                {social === "X" ? "𝕏" : social[0]}
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} FitFlow. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
