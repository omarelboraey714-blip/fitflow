"use client";

import { motion } from "framer-motion";
import { membershipPlans } from "@/lib/plans";

// الميزات المشتركة اللي نقارن عليها
const comparisonFeatures = [
  "دخول يومي",
  "تدريب شخصي",
  "ورش عمل",
  "تغذية مخصصة",
  "استشارات شهرية",
];

export default function ComparisonTable() {
  return (
    <section className="py-20 px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          مقارنة الباقات
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-white text-left pb-4">الميزة</th>
                {membershipPlans.map((plan, i) => (
                  <th key={i} className="text-white pb-4 text-center">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((feature, i) => (
                <motion.tr
                  key={i}
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border-t border-gray-700"
                >
                  <td className="py-4 text-gray-300">{feature}</td>
                  {membershipPlans.map((plan, j) => (
                    <td key={j} className="py-4 text-center">
                      <span className="text-green-400">
                        {plan.features.includes(feature) ? "✔" : "✖"}
                      </span>
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
