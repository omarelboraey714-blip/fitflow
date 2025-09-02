"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import "@/components/css/Checkout/CheckoutHeader.css";

export default function CheckoutHeader({ item }) {
  // تحديد الصفحة السابقة حسب نوع العنصر
  const getBackLink = () => {
    if (item?.type === "membership") return "/memberships";
    if (item?.type === "program") return "/programs";
    return "/store";
  };

  return (
    <header className="checkout-header">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="checkout-header-logo">FitFlow</div>
      </motion.div>

      <Link href={getBackLink()}>
        <motion.button
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
          className="checkout-header-back-button"
        >
          العودة
        </motion.button>
      </Link>
    </header>
  );
}
