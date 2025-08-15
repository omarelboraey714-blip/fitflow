"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth";
import "./css/Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, role, loading } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        {/* القائمة على الشاشات الكبيرة */}
        <nav className="nav-desktop">
          <a href="/" className="nav-link">
            الرئيسية
          </a>
          <a href="/memberships" className="nav-link">
            العضويات
          </a>
          <a href="/programs" className="nav-link">
            البرامج التدريبيه
          </a>
          <a href="/trainers" className="nav-link">
            المدربين
          </a>

          {/* عرض حسب الدور */}
          {loading ? (
            <div className="loading-placeholder"></div>
          ) : user ? (
            <a
              href={role === "admin" ? "/dashboard" : "/profile"}
              className="nav-link-auth"
            >
              {role === "admin" ? "لوحة التحكم" : "حسابي"}
            </a>
          ) : (
            <a href="/auth/login" className="nav-button-login">
              تسجيل الدخول
            </a>
          )}
        </nav>

        {/* زر القائمة على الجوال */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="menu-button">
          {menuOpen ? "✖️" : "☰"}
        </button>

        {/* اللوجو */}
        <div className="logo">FitFlow</div>
      </div>

      {/* القائمة المنسدلة على الجوال */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="nav-mobile"
        >
          <div className="nav-mobile-container">
            <a
              href="/"
              onClick={() => setMenuOpen(false)}
              className="nav-mobile-link"
            >
              الرئيسية
            </a>
            <a
              href="/memberships"
              onClick={() => setMenuOpen(false)}
              className="nav-mobile-link"
            >
              العضويات
            </a>
            <a
              href="/programs"
              onClick={() => setMenuOpen(false)}
              className="nav-mobile-link"
            >
              البرامج التدريبيه
            </a>

            <a
              href="/trainers"
              onClick={() => setMenuOpen(false)}
              className="nav-mobile-link"
            >
              المدربين
            </a>

            {loading ? (
              <div className="loading-placeholder"></div>
            ) : user ? (
              <a
                href={role === "admin" ? "/dashboard" : "/profile"}
                className="nav-mobile-auth"
                onClick={() => setMenuOpen(false)}
              >
                {role === "admin" ? "لوحة التحكم" : "حسابي"}
              </a>
            ) : (
              <a
                href="/auth/login"
                className="nav-mobile-button-login"
                onClick={() => setMenuOpen(false)}
              >
                تسجيل الدخول
              </a>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
}
