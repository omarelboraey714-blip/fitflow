"use client";

import { motion } from "framer-motion";

export default function SocialMedia() {
  const socials = [
    { name: "Facebook", icon: "📘", color: "hover:bg-blue-600" },
    { name: "Instagram", icon: "📸", color: "hover:bg-pink-600" },
    { name: "TikTok", icon: "🎵", color: "hover:bg-black" },
    { name: "YouTube", icon: "▶️", color: "hover:bg-red-600" },
  ];

  return (
    <section className="py-16 px-6 text-center">
      <h2 className="text-2xl font-bold text-white mb-4">
        تابعنا على السوشيال ميديا
      </h2>
      <p className="text-gray-300 mb-8">لتحصل على نصائح يومية وخصومات حصرية!</p>
      <div className="flex justify-center gap-6">
        {socials.map((social, i) => (
          <motion.a
            key={i}
            href="#"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className={`w-14 h-14 ${social.color} text-white rounded-full flex items-center justify-center text-2xl shadow-lg`}
            aria-label={`تابعنا على ${social.name}`}
          >
            {social.icon}
          </motion.a>
        ))}
      </div>
    </section>
  );
}
