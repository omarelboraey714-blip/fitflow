"use client";

import { useState } from "react";

export default function SectionTabs() {
  const tabs = [
    "نظرة عامة",
    "الخطة الأسبوعية",
    "التغذية",
    "المدربون",
    "التقييمات",
    "الأسئلة",
  ];
  const [active, setActive] = useState(0);

  return (
    <nav className="sticky top-0 bg-gray-900 z-10 py-4">
      <div className="flex overflow-x-auto space-x-6 px-2">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`whitespace-nowrap px-4 py-2 rounded-lg transition ${
              active === i
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
}
