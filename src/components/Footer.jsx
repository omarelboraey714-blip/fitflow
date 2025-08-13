"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8"
      >
        <div>
          <h3 className="text-xl font-bold mb-4">FitFlow</h3>
          <p className="text-gray-400">منصتك الشاملة للوصول إلى جسم أحلامك.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">روابط سريعة</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#home" className="hover:text-white transition">
                الرئيسية
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-white transition">
                المميزات
              </a>
            </li>
            <li>
              <a href="/dashboard" className="hover:text-white transition">
                لوحة التحكم
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">تواصل معنا</h4>
          <p className="text-gray-400">support@fitflow.sa</p>
          <p className="text-gray-400">+966 5X XXX XXXX</p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">تابعنا</h4>
          <div className="flex gap-4">
            {["X", "Instagram", "YouTube"].map((social) => (
              <a
                key={social}
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
              >
                {social === "X" ? "𝕏" : social[0]}
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="text-center text-gray-500 mt-8 pt-8 border-t border-gray-800">
        &copy; {new Date().getFullYear()} FitFlow. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
