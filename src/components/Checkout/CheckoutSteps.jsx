"use client";

import { motion } from "framer-motion";
import "@/components/css/Checkout/CheckoutSteps.css";

export default function CheckoutSteps({ currentStep = 1 }) {
  const steps = [
    { icon: "🛒", label: "مراجعة الطلب", active: currentStep >= 1 },
    { icon: "📦", label: "بيانات العميل", active: currentStep >= 2 },
    { icon: "💳", label: "طريقة الدفع", active: currentStep >= 3 },
    { icon: "✅", label: "تأكيد الطلب", active: currentStep >= 4 },
  ];

  return (
    <section className="checkout-steps-section">
      <div className="checkout-steps-container">
        <div className="checkout-steps-list">
          {steps.map((step, i) => (
            <div key={i} className="checkout-step-item">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`checkout-step-icon ${
                  step.active
                    ? "checkout-step-icon-active"
                    : "checkout-step-icon-inactive"
                }`}
              >
                {step.icon}
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div
                  className="checkout-step-connector"
                  style={{
                    background: step.active
                      ? "linear-gradient(90deg, #2563eb, #059669)"
                      : "#374151",
                    backgroundSize: step.active ? "200% 100%" : "100% 100%",
                  }}
                  animate={
                    step.active
                      ? {
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }
                      : {}
                  }
                  transition={{
                    duration: 3,
                    repeat: step.active ? Infinity : 0,
                    ease: "linear",
                  }}
                ></motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
