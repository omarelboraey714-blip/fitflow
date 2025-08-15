"use client";

import StatsCards from "./StatsCards";
import BenefitsList from "./BenefitsList";

export default function OverviewSection({ program }) {
  return (
    <section id="overview" className="my-12">
      <h2 className="text-2xl font-bold mb-6">نظرة عامة</h2>
      <p className="text-gray-300 mb-6">{program.overview.about}</p>
      <h3 className="text-xl font-semibold mb-4">الفوائد</h3>
      <BenefitsList items={program.overview.benefits} />
      <h3 className="text-xl font-semibold mb-4">المتطلبات</h3>
      <ul className="list-disc list-inside text-gray-300 space-y-1">
        {program.overview.requirements.map((req, i) => (
          <li key={i}>{req}</li>
        ))}
      </ul>
      <StatsCards
        stats={{
          "مدة البرنامج": `${program.durationWeeks} أسبوع`,
          "الجلسات/أسبوع": program.sessionsPerWeek,
          "متوسط الجلسة": `${program.avgSessionMinutes} دقيقة`,
          "السعرات/أسبوع": `${program.stats.estCaloriesPerWeek}`,
        }}
      />
    </section>
  );
}
