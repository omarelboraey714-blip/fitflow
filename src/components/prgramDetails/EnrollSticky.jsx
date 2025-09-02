"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import "@/components/css/prgramDetails/EnrollSticky.css";

export default function EnrollSticky({ price, discount, slug }) {
  // تحققات البيانات
  const safePrice = Number.isFinite(price) ? price : 0;
  const safeDiscount = Number.isFinite(discount) && discount > 0 ? discount : 0;
  const safeSlug = slug || "";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="enroll-sticky"
      role="complementary"
      aria-label="معلومات التسجيل"
    >
      <div className="enroll-sticky-container">
        <div>
          <strong className="enroll-sticky-price">{safePrice} ر.س</strong>
          {safeDiscount > 0 && (
            <span className="enroll-sticky-discount">
              {Math.round(safePrice / (1 - safeDiscount / 100))} ر.س
            </span>
          )}
        </div>
        <Link
          href={`/checkout?item=${encodeURIComponent(safeSlug)}&type=program`}
          passHref
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="enroll-sticky-button"
            aria-label={`الانضمام إلى برنامج ${safeSlug}`}
          >
            انضم الآن
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
