"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "@/components/css/Checkout/ConfirmButton.css";

export default function ConfirmButton({ item, customerInfo, paymentMethod }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePay = async () => {
    if (
      !item ||
      !customerInfo?.name ||
      !customerInfo?.phone ||
      !paymentMethod
    ) {
      alert("يرجى ملء جميع البيانات");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item,
          customer: customerInfo,
          paymentMethod,
          total:
            typeof item.price === "string"
              ? parseFloat(item.price)
              : item.price,
        }),
      });

      // في handlePay
      const validateCoupon = async (code) => {
        if (!code) return { valid: true, discount: 0 };

        const res = await fetch(`/api/coupons/validate?code=${code}`);
        const data = await res.json();
        return data;
      };

      // في handlePay
      const couponData = await validateCoupon(customerInfo.coupon);
      if (couponData.error && customerInfo.coupon) {
        alert(couponData.error);
        return;
      }

      const result = await response.json();

      if (response.ok) {
        router.push("/order-success");
      } else {
        alert(`خطأ: ${result.error}`);
      }
    } catch (err) {
      alert("فشل الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePay}
      disabled={loading}
      className="confirm-button group"
      style={{
        scale: loading ? 0.98 : 1,
        transition: "all 0.2s ease",
      }}
    >
      {loading ? (
        <div className="confirm-button-loading">
          <div className="confirm-button-spinner"></div>
        </div>
      ) : (
        <>
          <span className="confirm-button-icon">🔒</span>
          إتمام الدفع
        </>
      )}
      <span className="confirm-button-overlay"></span>
    </button>
  );
}
