"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-blue-500"
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
        className="h-10 w-10 text-green-500"
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
        className="h-10 w-10 text-yellow-500"
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
        className="h-10 w-10 text-purple-500"
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
    <section className="py-20 px-6 bg-gray-900">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          مميزات FitFlow
        </h2>
        <p className="text-gray-400 text-lg">
          كل ما تحتاجه لتحقيق أهدافك الرياضية في مكان واحد
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
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
            className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:bg-gray-750 transition"
          >
            <div className="flex justify-center mb-4 transform transition-transform duration-300 hover:scale-110">
              {feat.icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {feat.title}
            </h3>
            <p className="text-gray-400">{feat.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
