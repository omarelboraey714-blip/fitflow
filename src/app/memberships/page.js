// app/memberships/page.js

import MembershipHeader from "@/components/Membership/MembershipHeader";
import MembershipGrid from "@/components/Membership/MembershipGrid";
import ComparisonTable from "@/components/Membership/ComparisonTable";
import CTASection from "@/components/Membership/CTASection";
import { createClient } from "@supabase/supabase-js";

// استخدم البيئة
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function MembershipsPage() {
  const { data: memberships, error } = await supabase
    .from("memberships")
    .select("*")
    .eq("is_active", true)
    .order("id");

  if (error) {
    console.error("فشل جلب العضويات:", error);
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <p className="text-red-400">حدث خطأ أثناء تحميل العضويات</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <MembershipHeader />
      <MembershipGrid memberships={memberships} />
      <ComparisonTable memberships={memberships} />
      <CTASection />
    </div>
  );
}
