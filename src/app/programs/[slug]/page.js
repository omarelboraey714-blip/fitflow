// Server Component
import { Suspense } from "react";
import ProgramHero from "@/components/prgramDetails/ProgramHero";
import SectionTabs from "@/components/prgramDetails/SectionTabs";
import OverviewSection from "@/components/prgramDetails/OverviewSection";
import WeekAccordion from "@/components/prgramDetails/WeekAccordion";
import NutritionPanel from "@/components/prgramDetails/NutritionPanel";
import TrainersGrid from "@/components/prgramDetails/TrainersGrid";
import ReviewsList from "@/components/prgramDetails/ReviewsList";
import FAQAccordion from "@/components/prgramDetails/FAQAccordion";
import EnrollSticky from "@/components/prgramDetails/EnrollSticky";
import ProgramDetailContainer from "@/components/prgramDetails/ProgramDetailContainer";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// دالة لتحويل duration إلى عدد أسابيع
function parseDurationToWeeks(duration) {
  if (!duration) return null; // بدل 0، عشان نعرض "غير متوفر"
  const match = duration.match(/(\d+)\s*(أسابيع|أسبوع|شهور|شهر)/);
  if (match) {
    const number = parseInt(match[1], 10);
    const unit = match[2];
    if (unit.includes("أسابيع") || unit.includes("أسبوع")) {
      return number;
    } else if (unit.includes("شهور") || unit.includes("شهر")) {
      return number * 4;
    }
  }
  return null;
}

// دالة لتنظيم البيانات
function formatProgramData(program) {
  return {
    ...program,
    price: {
      SAR: program.price_sar || 0,
      original: program.original_price_sar || 0,
      discountPercent: program.discount_percent || 0,
    },
    stats: {
      estCaloriesPerWeek: program.stats_est_calories_per_week || null, // استخدام الحقل الصحيح
      intensity: program.stats_intensity || "غير محدد",
    },
    overview: {
      about: program.overview_about || "غير متوفر",
      benefits: Array.isArray(program.overview_benefits)
        ? program.overview_benefits
        : [],
      requirements: Array.isArray(program.overview_requirements)
        ? program.overview_requirements
        : [],
    },
    nutrition: {
      macros: program.nutrition_macros || {},
      sampleMeals: Array.isArray(program.nutrition_sample_meals)
        ? program.nutrition_sample_meals
        : [],
      note: program.nutrition_note || "",
    },
    faq: Array.isArray(program.faq) ? program.faq : [],
    badges: Array.isArray(program.tags)
      ? program.tags.map((tag) => ({ label: tag, type: "tag" }))
      : [],
    weeks: Array.isArray(program.weeks) ? program.weeks : [],
    durationWeeks:
      program.duration_weeks || parseDurationToWeeks(program.duration),
    sessionsPerWeek: program.sessions_per_week || null,
    avgSessionMinutes: program.avg_session_minutes || null,
  };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data, error } = await supabase
    .from("programs")
    .select(
      "name, subtitle, image, duration, duration_weeks, sessions_per_week, avg_session_minutes, stats_est_calories_per_week"
    )
    .eq("slug", slug);

  if (error || !data || data.length === 0) {
    console.error("Metadata Error:", { error, slug, data });
    return {
      title: "البرنامج غير موجود",
      description: "البرنامج المطلوب غير موجود في قاعدة البيانات.",
    };
  }

  const program = data[0];
  return {
    title: program.name,
    description:
      program.subtitle || "برنامج تدريبي مميز لتحقيق أهدافك الرياضية.",
    keywords: `برامج تدريبية, لياقة بدنية, صالة جيم, ${program.name}`,
    openGraph: {
      title: program.name,
      description: program.subtitle || "برنامج تدريبي مميز.",
      images: [program.image || "/images/default-program.webp"],
      type: "article",
    },
    canonical: `https://your-site.com/programs/${slug}`,
  };
}

export default async function ProgramDetailPage({ params }) {
  const { slug } = await params;

  if (!slug) {
    console.error("No slug provided:", { params });
    return (
      <div
        className="text-center py-20 text-red-500"
        role="alert"
        aria-live="assertive"
      >
        رابط البرنامج غير صالح
      </div>
    );
  }

  const { data, error } = await supabase
    .from("programs")
    .select(
      `
      id, name, subtitle, slug, price_sar, original_price_sar, discount_percent,
      duration, duration_weeks, sessions_per_week, avg_session_minutes, stats_est_calories_per_week,
      overview_about, overview_benefits, overview_requirements,
      nutrition_macros, nutrition_sample_meals, nutrition_note,
      stats_intensity, tags, faq, weeks, hero_image,
      trainers (
        id, name, avatar, rating, bio, certs
      )
    `
    )
    .eq("slug", slug);

  if (error || !data || data.length === 0) {
    console.error("Program Fetch Error:", { error, slug, data });
    return (
      <div
        className="text-center py-20 text-red-500"
        role="alert"
        aria-live="assertive"
      >
        البرنامج غير موجود. تحقق من الرابط أو حاول مرة أخرى لاحقًا.
      </div>
    );
  }

  const program = data[0];
  const { data: reviews } = await supabase
    .from("reviews")
    .select("id, user_name, rating, text, date")
    .eq("program_id", program.id)
    .order("created_at", { ascending: false });

  const formattedProgram = formatProgramData(program);
  const formattedTrainers =
    program.trainers && typeof program.trainers === "object"
      ? [program.trainers]
      : [];
  const formattedReviews =
    reviews?.map((r) => ({
      id: r.id,
      user: r.user_name || "مجهول",
      rating: r.rating || 0,
      text: r.text || "",
      date: r.date || new Date().toISOString(),
    })) || [];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <ProgramDetailContainer slug={slug}>
        <ProgramHero program={formattedProgram} />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <SectionTabs />
          <Suspense
            fallback={
              <div className="text-center py-4">
                جاري تحميل النظرة العامة...
              </div>
            }
          >
            <OverviewSection program={formattedProgram} />
          </Suspense>
          <Suspense
            fallback={
              <div className="text-center py-4">
                جاري تحميل الخطة الأسبوعية...
              </div>
            }
          >
            <WeekAccordion slug={formattedProgram.slug} />
          </Suspense>
          <Suspense
            fallback={
              <div className="text-center py-4">جاري تحميل خطة التغذية...</div>
            }
          >
            <NutritionPanel nutrition={formattedProgram.nutrition} />
          </Suspense>
          <TrainersGrid trainers={formattedTrainers} />
          <Suspense
            fallback={
              <div className="text-center py-4">جاري تحميل التقييمات...</div>
            }
          >
            <ReviewsList reviews={formattedReviews} programId={program.id} />
          </Suspense>
          <FAQAccordion faq={formattedProgram.faq} />
        </div>
        <EnrollSticky
          price={program.price_sar}
          discount={program.discount_percent}
          slug={program.slug}
        />
      </ProgramDetailContainer>
    </div>
  );
}

export const revalidate = 60;
