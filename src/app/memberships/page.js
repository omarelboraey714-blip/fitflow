// Server Component
import MembershipHeader from "@/components/Membership/MembershipHeader";
import MembershipGrid from "@/components/Membership/MembershipGrid";
import ComparisonTable from "@/components/Membership/ComparisonTable";
import CTASection from "@/components/Membership/CTASection";

export default function MembershipsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <MembershipHeader />
      <MembershipGrid />
      <ComparisonTable />
      <CTASection />
    </div>
  );
}
