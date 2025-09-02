import ProgramsHeader from "@/components/Programs/ProgramsHeader";
import FilterBar from "@/components/Programs/FilterBar";
import ProgramsGrid from "@/components/Programs/ProgramsGrid";
import FeaturedProgram from "@/components/Programs/FeaturedProgram";
import MotivationSection from "@/components/Programs/MotivationSection";
import { createClient } from "@supabase/supabase-js";
import Head from "next/head";
import { redirect } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// دعم ISR مع إعادة تحديث كل 60 ثانية
export const revalidate = 60;

export default async function ProgramsPage({ searchParams }) {
  const { goal = "all", duration = "all", page = "1" } = await searchParams;

  const parsedPage = parseInt(page) || 1;
  const limit = 6;

  // جلب إجمالي عدد البرامج أولاً لتحديد totalPages
  let countQuery = supabase.from("programs").select("id", { count: "exact" });

  if (goal !== "all") {
    countQuery = countQuery.eq("goal", goal);
  }
  if (duration !== "all") {
    countQuery = countQuery.eq("duration", duration);
  }

  const { count, error: countError } = await countQuery;

  if (countError) {
    console.error("Supabase count query error:", countError);
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Head>
          <title>خطأ في جلب البرامج - صالة الجيم</title>
          <meta
            name="description"
            content="حدث خطأ أثناء جلب البرامج التدريبية. حاول مرة أخرى لاحقًا."
          />
        </Head>
        <div className="text-red-500 text-center">
          حدث خطأ أثناء جلب البرامج. حاول مرة أخرى لاحقًا.
        </div>
      </div>
    );
  }

  const totalPrograms = count || 0;
  const totalPages = Math.ceil(totalPrograms / limit);

  // إعادة توجيه لو page غير صالح قبل تنفيذ الاستعلام الرئيسي
  if (parsedPage < 1) {
    redirect(`/programs?page=1&goal=${goal}&duration=${duration}`);
  }
  if (parsedPage > totalPages && totalPages > 0) {
    redirect(`/programs?page=${totalPages}&goal=${goal}&duration=${duration}`);
  }

  // إذا كانت totalPages = 0 (لا توجد برامج)، اعرض الصفحة مباشرة
  if (totalPages === 0) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Head>
          <title>برامج تدريبية - صالة الجيم</title>
          <meta
            name="description"
            content="اكتشف برامجنا التدريبية المصممة لتحقيق أهدافك الرياضية."
          />
          <meta
            name="keywords"
            content="صالة جيم, برامج تدريبية, لياقة بدنية, تدريب شخصي"
          />
          <meta property="og:title" content="برامج تدريبية - صالة الجيم" />
          <meta
            property="og:description"
            content="برامج تدريبية مصممة لتحقيق أهدافك الرياضية."
          />
          <meta property="og:type" content="website" />
        </Head>
        <ProgramsHeader />
        <FilterBar initialGoal={goal} initialDuration={duration} />
        <ProgramsGrid
          programs={[]}
          goal={goal}
          duration={duration}
          currentPage={1}
          totalPages={0}
          totalPrograms={0}
        />
        <FeaturedProgram />
        <MotivationSection />
      </div>
    );
  }

  // بناء الاستعلام الرئيسي بعد التحقق من page
  const offset = (parsedPage - 1) * limit;
  let query = supabase.from("programs").select(
    `
      id,
      slug,
      name,
      title,
      subtitle,
      goal,
      duration,
      level,
      difficulty,
      image,
      price_sar,
      avg_rating,
      trainer_id,
      features,
      trainers (
        id, name, avatar, rating
      )
    `
  );

  if (goal !== "all") {
    query = query.eq("goal", goal);
  }
  if (duration !== "all") {
    query = query.eq("duration", duration);
  }

  const { data: programs, error } = await query
    .range(offset, offset + limit - 1)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase query error:", error);
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Head>
          <title>خطأ في جلب البرامج - صالة الجيم</title>
          <meta
            name="description"
            content="حدث خطأ أثناء جلب البرامج التدريبية. حاول مرة أخرى لاحقًا."
          />
        </Head>
        <div className="text-red-500 text-center">
          حدث خطأ أثناء جلب البرامج. حاول مرة أخرى لاحقًا.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Head>
        <title>برامج تدريبية - الصفحة {parsedPage} - صالة الجيم</title>
        <meta
          name="description"
          content={`اكتشف برامجنا التدريبية المصممة لتحقيق أهدافك الرياضية، الصفحة ${parsedPage}.`}
        />
        <meta
          name="keywords"
          content="صالة جيم, برامج تدريبية, لياقة بدنية, تدريب شخصي"
        />
        <meta
          property="og:title"
          content={`برامج تدريبية - الصفحة ${parsedPage} - صالة الجيم`}
        />
        <meta
          property="og:description"
          content={`برامج تدريبية مصممة لتحقيق أهدافك الرياضية، الصفحة ${parsedPage}.`}
        />
        <meta property="og:type" content="website" />
      </Head>
      <ProgramsHeader />
      <FilterBar initialGoal={goal} initialDuration={duration} />
      <ProgramsGrid
        programs={programs}
        goal={goal}
        duration={duration}
        currentPage={parsedPage}
        totalPages={totalPages}
        totalPrograms={totalPrograms}
      />
      <FeaturedProgram />
      <MotivationSection />
    </div>
  );
}
