"use client";

import StatsCards from "./StatsCards";
import BenefitsList from "./BenefitsList";
import "@/components/css/prgramDetails/OverviewSection.css";

export default function OverviewSection({ program }) {
  const safeProgram = {
    overview: {
      about: program?.overview?.about || "غير متوفر",
      benefits: Array.isArray(program?.overview?.benefits)
        ? program.overview.benefits
        : [],
      requirements: Array.isArray(program?.overview?.requirements)
        ? program.overview.requirements
        : [],
    },
    durationWeeks: program?.durationWeeks || null,
    sessionsPerWeek: program?.sessionsPerWeek || null,
    avgSessionMinutes: program?.avgSessionMinutes || null,
    stats: {
      estCaloriesPerWeek: program?.stats?.estCaloriesPerWeek || null,
    },
  };

  return (
    <section
      id="overview"
      className="overview-section"
      role="region"
      aria-labelledby="overview-heading"
    >
      <h2 id="overview-heading" className="overview-heading">
        نظرة عامة
      </h2>
      <p className="overview-description">{safeProgram.overview.about}</p>
      <h3 className="overview-subheading">الفوائد</h3>
      <BenefitsList items={safeProgram.overview.benefits} />
      <h3 className="overview-subheading">المتطلبات</h3>
      <ul className="overview-requirements-list" role="list">
        {safeProgram.overview.requirements.length > 0 ? (
          safeProgram.overview.requirements.map((req, i) => (
            <li key={i} role="listitem">
              {req}
            </li>
          ))
        ) : (
          <li role="listitem">لا توجد متطلبات محددة.</li>
        )}
      </ul>
      <StatsCards
        stats={{
          "مدة البرنامج": safeProgram.durationWeeks
            ? `${safeProgram.durationWeeks} أسبوع`
            : "غير متوفر",
          "الجلسات/أسبوع": safeProgram.sessionsPerWeek || "غير متوفر",
          "متوسط الجلسة": safeProgram.avgSessionMinutes
            ? `${safeProgram.avgSessionMinutes} دقيقة`
            : "غير متوفر",
          "السعرات/أسبوع": safeProgram.stats.estCaloriesPerWeek || "غير متوفر",
        }}
      />
    </section>
  );
}
