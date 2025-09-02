"use client";

import { useRouter, useSearchParams } from "next/navigation";
import "@/components/css/programs/FilterBar.css";

export default function FilterBar({ initialGoal, initialDuration }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const applyFilter = (newParams) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === "all") params.delete(key);
      else params.set(key, value);
    });
    params.set("page", "1");
    router.push("/programs?" + params.toString(), { scroll: false });
  };

  return (
    <div className="filter-bar-container">
      <div className="filter-button-group">
        {[
          { value: "all", label: "الكل" },
          { value: "loss", label: "حرق دهون" },
          { value: "muscle", label: "زيادة عضلات" },
          { value: "fitness", label: "لياقة عامة" },
          { value: "personal", label: "تدريب شخصي" },
        ].map((g) => (
          <button
            key={g.value}
            onClick={() => applyFilter({ goal: g.value })}
            className={`filter-button ${
              (initialGoal || "all") === g.value
                ? "filter-button-goal-active"
                : "filter-button-goal-inactive"
            }`}
            aria-label={`تصفية البرامج حسب ${g.label}`}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className="filter-button-group">
        {[
          { value: "all", label: "الكل" },
          { value: "4-weeks", label: "4 أسابيع" },
          { value: "8-weeks", label: "8 أسابيع" },
          { value: "12-weeks", label: "12 أسبوع" },
          { value: "6-months", label: "6 شهور" },
        ].map((d) => (
          <button
            key={d.value}
            onClick={() => applyFilter({ duration: d.value })}
            className={`filter-button ${
              (initialDuration || "all") === d.value
                ? "filter-button-duration-active"
                : "filter-button-duration-inactive"
            }`}
            aria-label={`تصفية البرامج حسب مدة ${d.label}`}
          >
            {d.label}
          </button>
        ))}
      </div>
    </div>
  );
}
