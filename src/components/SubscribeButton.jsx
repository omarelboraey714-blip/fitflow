"use client";

import { supabase } from "@/lib/supabase";
import { toast } from "sonner"; // ✅ استخدم `toast` مباشرة

export default function SubscribeButton({ plan }) {
  const handleClick = async () => {
    const { error } = await supabase
      .from("subscriptions")
      .insert([{ user_email: "temp@user.com", plan, status: "pending" }]);

    if (error) {
      toast.error("فشل الاشتراك");
    } else {
      toast.success(`تم الاشتراك في خطة ${plan}!`);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full py-3 font-semibold rounded-xl transition ${
        plan === "المميز"
          ? "bg-blue-600 hover:bg-blue-700 text-white"
          : "bg-gray-200 hover:bg-gray-300 text-gray-800"
      }`}
    >
      اشترك الآن
    </button>
  );
}
