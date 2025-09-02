"use client";

import { motion } from "framer-motion";
import "../css/home/Features.css"; // Assuming you have a CSS file for styles

const features = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="feature-icon-blue"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "خطة تدريب مخصصة",
    description: "بناءً على مستواك وأهدافك، مع تحديث أسبوعي.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="feature-icon-green"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "متابعات يومية",
    description: "تواصل مباشر مع مدربك، وتقارير تقدم تلقائية.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="feature-icon-yellow"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.84-1.29M9 14a3 3 0 11-6 0 3 3 0 016 0zM12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
        />
      </svg>
    ),
    title: "تغذية ذكية",
    description: "خطط وجبات يومية مبنية على تفضيلاتك ونمط حياتك.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="feature-icon-purple"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.165-2.052-.48-3.003z"
        />
      </svg>
    ),
    title: "مجتمع داعم",
    description: "انضم إلى مجتمع من 10,000+ عضو، وشارك تقدمك.",
  },
];

export default function Features() {
  return (
    <section className="features-section">
      <div className="features-header">
        <h2 className="features-title">مميزات FitFlow</h2>
        <p className="features-description">
          كل ما تحتاجه لتحقيق أهدافك الرياضية في مكان واحد
        </p>
      </div>

      <div className="features-grid">
        {features.map((feat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              y: -5,
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
            }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="feature-card"
          >
            <div className="feature-icon-container">{feat.icon}</div>
            <h3 className="feature-title">{feat.title}</h3>
            <p className="feature-description">{feat.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
