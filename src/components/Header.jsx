"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

import "./css/Header.css";

// قائمة الروابط الرئيسية
// كل عنصر له: href, label, وclass للشاشة الكبيرة والصغيرة
const NAV_ITEMS = [
  {
    href: "/",
    label: "الرئيسية",
    desktopClass: "nav-link",
    mobileClass: "nav-mobile-link",
  },
  {
    href: "/memberships",
    label: "العضويات",
    desktopClass: "nav-link",
    mobileClass: "nav-mobile-link",
  },
  {
    href: "/programs",
    label: "البرامج التدريبية",
    desktopClass: "nav-link",
    mobileClass: "nav-mobile-link",
  },
  {
    href: "/trainers",
    label: "المدربين",
    desktopClass: "nav-link",
    mobileClass: "nav-mobile-link",
  },
  {
    href: "/store",
    label: "المتجر",
    desktopClass: "nav-link",
    mobileClass: "nav-mobile-link",
  },
  {
    href: "/contact",
    label: "تواصل معنا",
    desktopClass: "nav-link",
    mobileClass: "nav-mobile-link",
  },
];

// العناصر التي تعتمد على حالة المستخدم
const AUTH_ITEMS = [
  {
    href: "/dashboard",
    label: "لوحة التحكم",
    desktopClass: "nav-link-auth",
    mobileClass: "nav-mobile-auth",
    condition: "admin",
  },
  {
    href: "/profile",
    label: "حسابي",
    desktopClass: "nav-link-auth",
    mobileClass: "nav-mobile-auth",
    condition: "user",
  },
  {
    href: "/auth/login",
    label: "تسجيل الدخول",
    desktopClass: "nav-button-login",
    mobileClass: "nav-mobile-button-login",
    condition: "logged-out",
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, role, loading } = useAuth();
  const router = useRouter();

  // تحديد حالة المستخدم
  const userType = loading
    ? "loading"
    : user
    ? role === "admin"
      ? "admin"
      : "user"
    : "logged-out";

  // دالة للتنقل وإغلاق القائمة
  const handleNavigate = (href) => {
    setMenuOpen(false);
    router.push(href);
  };

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (e) => {
      const target = e.target;
      if (
        menuOpen &&
        !target.closest(".nav-mobile") &&
        !target.closest(".menu-button") &&
        !target.closest(".logo")
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  // هل نعرض العنصر حسب حالة المستخدم؟
  const shouldShowItem = (condition) => {
    if (!condition) return true;
    if (condition === "logged-out") return userType === "logged-out";
    if (condition === "user")
      return userType === "user" || userType === "admin";
    if (condition === "admin") return userType === "admin";
    return false;
  };

  return (
    <header className="header" role="banner">
      <div className="header-container">
        {/* اللوجو */}
        <div className="logo">
          <Link href="/" onClick={() => handleNavigate("/")}>
            FitFlow
          </Link>
        </div>

        {/* القائمة على الشاشات الكبيرة */}
        <nav className="nav-desktop" role="navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => handleNavigate(item.href)}
              className={item.desktopClass}
            >
              {item.label}
            </Link>
          ))}

          {/* العناصر حسب حالة المستخدم */}
          {!loading &&
            AUTH_ITEMS.map(
              (item) =>
                shouldShowItem(item.condition) && (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => handleNavigate(item.href)}
                    className={item.desktopClass}
                  >
                    {item.label}
                  </Link>
                )
            )}

          {loading && <div className="loading-placeholder"></div>}
        </nav>

        {/* زر القائمة على الجوال */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="menu-button"
          aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* القائمة المنسدلة على الجوال */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="nav-mobile"
          role="navigation"
          aria-label="قائمة التنقل على الجوال"
        >
          <div className="nav-mobile-container">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleNavigate(item.href)}
                className={item.mobileClass}
              >
                {item.label}
              </Link>
            ))}

            {!loading &&
              AUTH_ITEMS.map(
                (item) =>
                  shouldShowItem(item.condition) && (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => handleNavigate(item.href)}
                      className={item.mobileClass}
                    >
                      {item.label}
                    </Link>
                  )
              )}

            {loading && <div className="loading-placeholder"></div>}
          </div>
        </motion.div>
      )}
    </header>
  );
}
