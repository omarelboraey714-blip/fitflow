"use client";

import { useCart } from "@/lib/cart";
import { useEffect, useState } from "react";
import CheckoutHeader from "@/components/Checkout/CheckoutHeader";
import CheckoutSteps from "@/components/Checkout/CheckoutSteps";
import CustomerInfo from "@/components/Checkout/CustomerInfo";
import OrderSummary from "@/components/Checkout/OrderSummary";
import PaymentMethods from "@/components/Checkout/PaymentMethods";
import ConfirmButton from "@/components/Checkout/ConfirmButton";
import TrustBadges from "@/components/Checkout/TrustBadges";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function CheckoutPage() {
  const { cart, getTotalPrice } = useCart();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب بيانات كاملة من Supabase
  useEffect(() => {
    const fetchItems = async () => {
      if (cart.length === 0) {
        setItems([]);
        setLoading(false);
        return;
      }

      const promises = cart.map(async (item) => {
        let data, type;

        if (item.membership_id) {
          const { membership } = await supabase
            .from("memberships")
            .select("*")
            .eq("id", item.id)
            .single();
          data = membership;
          type = "membership";
        } else if (item.program_id) {
          const { program } = await supabase
            .from("programs")
            .select("*")
            .eq("id", item.id)
            .single();
          data = program;
          type = "program";
        } else {
          const { product } = await supabase
            .from("products")
            .select("*")
            .eq("id", item.id)
            .single();
          data = product;
          type = "product";
        }

        return {
          ...data,
          quantity: item.quantity,
          type,
          finalPrice: data.price * item.quantity,
        };
      });

      try {
        const resolvedItems = await Promise.all(promises);
        setItems(resolvedItems);
      } catch (err) {
        setError("فشل تحميل العناصر");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [cart]);

  if (loading) {
    return <div className="p-8 text-center">جاري تحميل السلة...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  if (items.length === 0) {
    return (
      <div className="p-8 text-center">
        <p>السلة فارغة</p>
        <a href="/store" className="text-emerald-500">
          تسوق الآن
        </a>
      </div>
    );
  }

  const total = getTotalPrice();

  return (
    <div className="min-h-screen bg-gray-900">
      <CheckoutHeader item={{ name: "مراجعة الطلب" }} />
      <CheckoutSteps currentStep={1} />
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <CustomerInfo formData={{}} />
          <PaymentMethods />
        </div>
        <div className="lg:col-span-1">
          <OrderSummary items={items} total={total} />
          <ConfirmButton items={items} total={total} />
          <TrustBadges />
        </div>
      </div>
    </div>
  );
}
