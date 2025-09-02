"use client";

import { useState } from "react";
import "@/components/css/Checkout/PaymentMethods.css";

const paymentMethods = [
  { id: "visa", name: "بطاقة ائتمان", icon: "💳" },
  { id: "vodafone", name: "فودافون كاش", icon: "🟢" },
  { id: "bank", name: "تحويل بنكي", icon: "🏦" },
];

export default function PaymentMethods({
  selected: externalSelected,
  onSelect,
}) {
  const [localSelected, setLocalSelected] = useState(
    externalSelected || "visa"
  );

  const handleSelect = (id) => {
    const newSelected = id;
    setLocalSelected(newSelected);
    if (onSelect) onSelect(newSelected);
  };

  return (
    <section className="payment-methods-section">
      <div className="payment-methods-container">
        <h2 className="payment-methods-title">طرق الدفع</h2>
        <div className="payment-methods-grid">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => handleSelect(method.id)}
              className={`payment-method-card ${
                localSelected === method.id
                  ? `payment-method-card-selected-${method.id}`
                  : "payment-method-card-unselected"
              }`}
            >
              <div className="payment-method-icon">{method.icon}</div>
              <h3 className="payment-method-title">{method.name}</h3>

              {localSelected === "visa" && method.id === "visa" && (
                <div className="payment-method-details">
                  <input
                    type="text"
                    placeholder="رقم البطاقة"
                    className="payment-method-input"
                  />
                  <div className="payment-method-input-grid">
                    <input
                      type="text"
                      placeholder="تاريخ الانتهاء"
                      className="payment-method-input"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="payment-method-input"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
