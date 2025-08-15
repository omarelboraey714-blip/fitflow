"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function FilterBar({ initialGoal, initialDuration }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const applyFilter = (newParams) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === "all") params.delete(key);
      else params.set(key, value);
    });

    // ✅ منع التمرير التلقائي
    router.push("/programs?" + params.toString(), { scroll: false });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-center py-8 px-6 bg-gray-900">
      <div className="flex flex-wrap gap-2 justify-center">
        {[
          { value: "all", label: "الكل" },
          { value: "loss", label: "حرق دهون" },
          { value: "muscle", label: "زيادة عضلات" },
          { value: "fitness", label: "لياقة عامة" },
          { value: "personal", label: "تدريب شخصي" },
        ].map((g) => (
          <button
            key={g.value}
            onClick={() => applyFilter({ goal: g.value, page: "1" })}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              (initialGoal || "all") === g.value
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {[
          { value: "all", label: "الكل" },
          { value: "4", label: "4 أسابيع" },
          { value: "8", label: "8 أسابيع" },
          { value: "12", label: "12 أسبوع" },
          { value: "6m", label: "6 شهور" },
        ].map((d) => (
          <button
            key={d.value}
            onClick={() => applyFilter({ duration: d.value, page: "1" })}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              (initialDuration || "all") === d.value
                ? "bg-green-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>
    </div>
  );
}
