// app/programs/page.js
import ProgramsHeader from "@/components/Programs/ProgramsHeader";
import FilterBar from "@/components/Programs/FilterBar";
import ProgramsGrid from "@/components/Programs/ProgramsGrid";
import FeaturedProgram from "@/components/Programs/FeaturedProgram";
import MotivationSection from "@/components/Programs/MotivationSection";

// ✅ Server Component (يسمح بـ async)
export default async function ProgramsPage({ searchParams }) {
  // ✅ await على searchParams قبل استخدامه
  const { goal = "all", duration = "all", page = "1" } = await searchParams;

  const parsedPage = parseInt(page) || 1;
  const limit = 3;

  return (
    <div className="min-h-screen bg-gray-900">
      <ProgramsHeader />
      <FilterBar initialGoal={goal} initialDuration={duration} />
      <ProgramsGrid
        goal={goal}
        duration={duration}
        page={parsedPage}
        limit={limit}
      />
      <FeaturedProgram />
      <MotivationSection />
    </div>
  );
}
