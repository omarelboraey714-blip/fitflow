"use client";

import Link from "next/link";
import ProgramCard from "./ProgramCard";
import "@/components/css/programs/ProgramsGrid.css";

export default function ProgramsGrid({
  programs = [],
  totalPages,
  currentPage,
  goal,
  duration,
}) {
  if (programs.length === 0) {
    return (
      <div className="p-12 text-center text-gray-400">
        لا توجد برامج تطابق الفلاتر.
      </div>
    );
  }

  return (
    <section id="programs-section" className="programs-section">
      <div className="programs-container">
        <div className="programs-grid">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </div>

      {/* تصفح تقليدي */}
      <div className="pagination-controls">
        {currentPage > 1 && (
          <Link
            href={`?page=${currentPage - 1}&goal=${goal}&duration=${duration}`}
            className="pagination-button"
            aria-label="الانتقال إلى الصفحة السابقة"
          >
            السابق
          </Link>
        )}
        {currentPage < totalPages && (
          <Link
            href={`?page=${currentPage + 1}&goal=${goal}&duration=${duration}`}
            className="pagination-button"
            aria-label="الانتقال إلى الصفحة التالية"
          >
            التالي
          </Link>
        )}
      </div>
    </section>
  );
}
