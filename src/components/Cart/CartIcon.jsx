"use client";

import { useCart } from "@/lib/cart";
import { useState } from "react";
import MiniCart from "./MiniCart";
import "@/components/css/Cart/CartIcon.css";

export default function CartIcon() {
  const { getTotalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* أيقونة السلة */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cart-icon-button"
        aria-label="عرض السلة"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="cart-icon-svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13l-1.1.9M7 13v5a2 2 0 002 2h4a2 2 0 002-2v-5M7 13h10"
          />
        </svg>
        {getTotalItems() > 0 && (
          <span className="cart-icon-badge">{getTotalItems()}</span>
        )}
      </button>

      {/* نافذة السلة الصغيرة */}
      <MiniCart isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
