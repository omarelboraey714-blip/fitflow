// Server Component
import { getProgramBySlug } from "@/lib/programs";
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

export default async function ProgramDetailPage({ params }) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);

  if (!program) {
    return (
      <div className="text-center py-20 text-red-500">البرنامج غير موجود</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <ProgramDetailContainer slug={slug}>
        <ProgramHero program={program} />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <SectionTabs />
          <OverviewSection program={program} />
          <WeekAccordion weeks={program.weeks} />
          <NutritionPanel nutrition={program.nutrition} />
          <TrainersGrid trainers={program.trainers} />
          <ReviewsList reviews={program.reviews} />
          <FAQAccordion faq={program.faq} />
        </div>
        <EnrollSticky
          price={program.price.SAR}
          discount={program.price.discountPercent}
        />
      </ProgramDetailContainer>
    </div>
  );
}
