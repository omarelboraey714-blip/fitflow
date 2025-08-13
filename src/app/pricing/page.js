"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "sonner";

const plans = [
  {
    id: 1,
    name: "الأساسي",
    price: 99,
    features: ["خطة تغذية", "تمارين أسبوعية"],
  },
  {
    id: 2,
    name: "المميز",
    price: 199,
    features: ["خطة تغذية + تمارين", "متابعة يومية"],
    popular: true,
  },
];

export default function PricingPage() {
  const [user, setUser] = useState({ email: "user@example.com" });
  const [subscriptions, setSubscriptions] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchSubs = async () => {
      const { data } = await supabase
        .from("subscriptions")
        .select("plan")
        .eq("user_email", user.email);
      setSubscriptions(data.map((s) => s.plan));
    };
    fetchSubs();
  }, [user.email]);

  const handleSubscribe = async (planName) => {
    const { error } = await supabase
      .from("subscriptions")
      .insert([{ user_email: user.email, plan: planName, status: "active" }]);

    if (error) {
      toast.error("أنت مشترك بالفعل");
    } else {
      setSubscriptions([...subscriptions, planName]);
      toast.success(`تم الاشتراك في خطة ${planName}!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 px-6">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          اختر الخطة المناسبة
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg ${
              plan.popular ? "ring-4 ring-blue-500 scale-105" : ""
            }`}
          >
            {plan.popular && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm block mb-4">
                الأكثر شيوعًا
              </span>
            )}
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {plan.name}
            </h3>
            <div className="my-6">
              <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {plan.price}
              </span>
              <span className="text-gray-600 dark:text-gray-400"> ج.م/شهر</span>
            </div>
            <ul className="space-y-3 mb-8 text-gray-700 dark:text-gray-300">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            {subscriptions.includes(plan.name) ? (
              <button className="w-full py-3 bg-gray-400 text-white rounded-xl cursor-not-allowed">
                مشترك
              </button>
            ) : (
              <button
                onClick={() => handleSubscribe(plan.name)}
                className={`w-full py-3 font-semibold rounded-xl transition ${
                  plan.popular
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
              >
                اشترك الآن
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
