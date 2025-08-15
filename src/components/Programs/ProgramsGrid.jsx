"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProgramCard from "./ProgramCard";
import LoadMoreButton from "./LoadMoreButton";
import { programs } from "@/lib/programs";

export default function ProgramsGrid({ goal, duration, limit = 6 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [programsList, setProgramsList] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  // ✅ تأكد أن الفلترة تعتمد على goal وduration
  const filtered = useMemo(() => {
    return programs.filter((p) => {
      const matchesGoal = goal === "all" || p.goal === goal;
      const matchesDuration =
        duration === "all" ||
        (duration === "4" && p.duration.includes("4")) ||
        (duration === "8" && p.duration.includes("8")) ||
        (duration === "12" && p.duration.includes("12")) ||
        (duration === "6m" && p.duration.includes("6"));
      return matchesGoal && matchesDuration;
    });
  }, [goal, duration]);

  // ✅ أعد التحميل من الأول كل ما تغير الفلتر
  useEffect(() => {
    const end = limit;
    setProgramsList(filtered.slice(0, end));
    setHasMore(end < filtered.length);
    setCurrentPage(1); // ابدأ من الصفحة 1
  }, [filtered, limit]); // filtered يتغير تلقائيًا عند تغير goal أو duration

  const loadMore = () => {
    const nextPage = currentPage + 1;
    const start = currentPage * limit;
    const end = nextPage * limit;
    const newPrograms = filtered.slice(start, end);

    // ✅ تأكد أنك مش بتحط بيانات مكررة
    setProgramsList((prev) => {
      // اختياري: تأكد من عدم التكرار
      const newUnique = newPrograms.filter(
        (p) => !prev.some((prevP) => prevP.id === p.id)
      );
      return [...prev, ...newUnique];
    });

    setHasMore(end < filtered.length);
    setCurrentPage(nextPage);
  };

  return (
    <>
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {programsList.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {hasMore && <LoadMoreButton onLoadMore={loadMore} />}
    </>
  );
}
