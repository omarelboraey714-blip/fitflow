"use client";

import { motion } from "framer-motion";
import "@/components/css/membership/ComparisonTable.css";

// الميزات المهمة فقط (ليست كل شيء)
const comparisonFeatures = [
  "دخول يومي",
  "استخدام الأجهزة",
  "تدريبات إرشادية",
  "تدريب شخصي",
  "ورش عمل",
  "هدية سنوية",
  "استشارات شهرية",
];

export default function ComparisonTable({ memberships = [] }) {
  return (
    <section className="comparison-section">
      <div className="comparison-container">
        <h2 className="comparison-title">مقارنة الباقات</h2>
        <div className="comparison-table-container">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="comparison-table-header">الميزة</th>
                {memberships.map((plan) => (
                  <th key={plan.id} className="comparison-table-header-plan">
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
                  className="comparison-table-row"
                >
                  <td className="comparison-table-feature">{feature}</td>
                  {memberships.map((plan) => (
                    <td key={plan.id} className="comparison-table-cell">
                      <span
                        className={
                          plan.features.includes(feature)
                            ? "comparison-table-status active"
                            : "comparison-table-status inactive"
                        }
                      >
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
