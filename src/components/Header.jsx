"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  return (
    <header className="fixed w-full top-0 z-50 bg-black/30 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* اللوجو */}
        <div className="text-2xl font-bold text-white">FitFlow</div>

        {/* القائمة على الشاشات الكبيرة */}
        <nav className="hidden md:flex gap-8 items-center">
          <a href="/" className="text-gray-200 hover:text-white transition">
            الرئيسية
          </a>
          <a
            href="#features"
            className="text-gray-200 hover:text-white transition"
          >
            المميزات
          </a>
          <a
            href="#testimonials"
            className="text-gray-200 hover:text-white transition"
          >
            آراء العملاء
          </a>

          {/* زر حسب حالة المستخدم */}
          {loading ? (
            <div className="w-20 h-5 bg-gray-700 rounded animate-pulse"></div>
          ) : user ? (
            <div className="relative group">
              <span className="text-white cursor-pointer">حسابي</span>
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto">
                <a
                  href="/dashboard"
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
                >
                  لوحة التحكم
                </a>
                <a
                  href="/"
                  onClick={() => {
                    localStorage.removeItem("fitflow_user");
                    window.dispatchEvent(new Event("storage"));
                    window.location.reload();
                  }}
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
                >
                  تسجيل الخروج
                </a>
              </div>
            </div>
          ) : (
            <a
              href="/auth/login"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-lg hover:shadow-lg transition"
            >
              تسجيل الدخول
            </a>
          )}
        </nav>

        {/* زر القائمة على الجوال */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
        >
          {menuOpen ? "✖️" : "☰"}
        </button>
      </div>

      {/* القائمة المنسدلة على الجوال */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black/90 text-white"
        >
          <div className="flex flex-col px-6 py-4 space-y-4">
            <a
              href="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-green-400"
            >
              الرئيسية
            </a>
            <a
              href="#features"
              onClick={() => setMenuOpen(false)}
              className="hover:text-green-400"
            >
              المميزات
            </a>
            <a
              href="#testimonials"
              onClick={() => setMenuOpen(false)}
              className="hover:text-green-400"
            >
              آراء العملاء
            </a>

            {loading ? (
              <div className="w-24 h-5 bg-gray-700 rounded animate-pulse"></div>
            ) : user ? (
              <>
                <a
                  href="/dashboard"
                  className="text-blue-400 hover:text-blue-300"
                >
                  لوحة التحكم
                </a>
                <button
                  onClick={() => {
                    localStorage.removeItem("fitflow_user");
                    window.dispatchEvent(new Event("storage"));
                    window.location.href = "/";
                  }}
                  className="text-red-400 text-left"
                >
                  تسجيل الخروج
                </button>
              </>
            ) : (
              <a
                href="/auth/login"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-lg"
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
