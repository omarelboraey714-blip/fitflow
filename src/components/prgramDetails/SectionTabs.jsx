"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "@/components/css/prgramDetails/SectionTabs.css";

export default function SectionTabs() {
  const tabs = [
    { name: "نظرة عامة", id: "overview" },
    { name: "الخطة الأسبوعية", id: "weeks" },
    { name: "التغذية", id: "nutrition" },
    { name: "المدربون", id: "trainers" },
    { name: "التقييمات", id: "reviews" },
    { name: "الأسئلة", id: "faq" },
  ];
  const [active, setActive] = useState(0);

  // دالة للتمرير إلى القسم
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // مراقبة التمرير لتحديد القسم المرئي
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = tabs.findIndex((tab) => tab.id === entry.target.id);
            if (index !== -1) {
              setActive(index);
            }
          }
        });
      },
      { threshold: 0.5 } // تحديد القسم النشط عندما يكون 50% مرئيًا
    );

    // مراقبة جميع الأقسام
    tabs.forEach((tab) => {
      const section = document.getElementById(tab.id);
      if (section) {
        observer.observe(section);
      }
    });

    // تنظيف المراقب عند إلغاء تحميل المكون
    return () => {
      tabs.forEach((tab) => {
        const section = document.getElementById(tab.id);
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  return (
    <nav
      className="section-tabs-nav"
      role="navigation"
      aria-label="تبويبات أقسام البرنامج"
    >
      <div className="section-tabs-container">
        {tabs.map((tab, i) => (
          <motion.button
            key={i}
            onClick={() => {
              setActive(i);
              scrollToSection(tab.id);
            }}
            className={`section-tab-button ${
              active === i
                ? "section-tab-button-active"
                : "section-tab-button-inactive"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`الانتقال إلى قسم ${tab.name}`}
            aria-current={active === i ? "true" : "false"}
          >
            {tab.name}
          </motion.button>
        ))}
      </div>
    </nav>
  );
}
