"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import "./css/Footer.css";

export default function Footer() {
  return (
    <footer className="footer" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="footer-content"
      >
        {/* عن FitFlow */}
        <div className="footer-section">
          <h3 className="footer-brand-title">FitFlow</h3>
          <p className="footer-brand-description">
            منصتك الشاملة للوصول إلى جسم أحلامك.
          </p>
        </div>

        {/* روابط سريعة */}
        <div className="footer-section">
          <h4 className="footer-links-title">روابط سريعة</h4>
          <ul className="footer-links-list">
            <li>
              <Link href="/" className="footer-link">
                الرئيسية
              </Link>
            </li>
            <li>
              <Link href="/programs" className="footer-link">
                البرامج التدريبية
              </Link>
            </li>
            <li>
              <Link href="/memberships" className="footer-link">
                العضويات
              </Link>
            </li>
            <li>
              <Link href="/contact" className="footer-link">
                تواصل معنا
              </Link>
            </li>
          </ul>
        </div>

        {/* معلومات الاتصال */}
        <div className="footer-section">
          <h4 className="footer-contact-title">تواصل معنا</h4>
          <p className="footer-contact-info">support@fitflow.sa</p>
          <p className="footer-contact-info">+966 5X XXX XXXX</p>
        </div>

        {/* الروابط الاجتماعية */}
        <div className="footer-section">
          <h4 className="footer-social-title">تابعنا</h4>
          <div className="footer-social-links">
            {["X", "Instagram", "YouTube"].map((social) => {
              const href =
                social === "X"
                  ? "https://x.com/fitflow"
                  : social === "Instagram"
                  ? "https://instagram.com/fitflow"
                  : "https://youtube.com/@fitflow";

              return (
                <a
                  key={social}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label={`تابعنا على ${social}`}
                >
                  {social === "X" ? "𝕏" : social[0].toUpperCase()}
                </a>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* حقوق الملكية */}
      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} FitFlow. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
