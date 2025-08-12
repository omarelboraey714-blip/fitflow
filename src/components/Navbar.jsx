"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // الروابط في القائمة
  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "المميزات", href: "/#features" },
    { name: "كيف تعمل", href: "/#how" },
    { name: "آراء العملاء", href: "/#testimonials" },
    { name: "تواصل", href: "/contact" }, // ← صفحة التواصل
  ];

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* اللوجو */}
        <div className="text-2xl font-bold text-blue-700">FitFlow</div>

        {/* القائمة على الشاشات الكبيرة */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-gray-700 hover:text-blue-600 transition duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* زر القائمة على الجوال */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {menuOpen ? (
              // لو القائمة مفتوحة، يظهر "إغلاق"
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // لو مغلقة، يظهر "قائمة"
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* القائمة المنسدلة على الجوال */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white shadow-lg rounded-b-xl mx-6 mt-1"
        >
          <div className="flex flex-col px-6 py-4 space-y-4">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 transition"
                onClick={() => setMenuOpen(false)} // يقفل القائمة لما يضغط على رابط
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
