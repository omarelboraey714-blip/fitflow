"use client";

import { motion } from "framer-motion";
import { FaTshirt, FaBackpack, FaPills, FaDumbbell } from "react-icons/fa";
import "@/components/css/Store/CategoriesSection.css";

export default function CategoriesSection({ products = [] }) {
  const categories = [
    {
      name: "ملابس رياضية",
      icon: <FaTshirt />,
      bg: "clothing",
      filter: "clothing",
    },
    {
      name: "إكسسوارات",
      icon: <FaPills />,
      bg: "accessories",
      filter: "accessories",
    },
    {
      name: "مكملات غذائية",
      icon: <FaPills />,
      bg: "supplements",
      filter: "supplements",
    },
    {
      name: "أدوات منزلية",
      icon: <FaDumbbell />,
      bg: "equipment",
      filter: "equipment",
    },
  ];

  return (
    <section className="categories-section">
      <div className="categories-container">
        <h2 className="categories-title">تسوق حسب الفئة</h2>
        <div className="categories-grid">
          {categories.map((cat, i) => {
            const count = products.filter(
              (p) => p.category === cat.filter
            ).length;
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`category-card category-card-bg-${cat.bg}`}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 10,
                    ease: "linear",
                  }}
                  className="category-icon"
                >
                  {cat.icon}
                </motion.div>
                <h3 className="category-name">{cat.name}</h3>
                {count > 0 && (
                  <span className="category-count">{count} منتج</span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
