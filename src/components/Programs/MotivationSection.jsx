"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import useSWR from "swr";
import "@/components/css/programs/MotivationSection.css";

const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("فشل تحميل الاقتباسات");
    return res.json();
  });

export default function MotivationSection() {
  const [currentQuote, setCurrentQuote] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data: quotes, error } = useSWR("/api/quotes", async () => {
    const { data, error } = await supabase
      .from("motivation_quotes")
      .select("quote");

    if (error) throw error;
    return data.map((q) => q.quote);
  });

  useEffect(() => {
    if (quotes && quotes.length > 0) {
      setCurrentQuote(quotes[0]);
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [quotes]);

  useEffect(() => {
    if (quotes && quotes.length > 0) {
      setCurrentQuote(quotes[currentIndex]);
    }
  }, [currentIndex, quotes]);

  if (error) {
    return <p>خطأ في تحميل الاقتباسات</p>;
  }

  return (
    <section
      className="motivation-section"
      style={{
        backgroundImage: "url('/images/motivation-bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="motivation-overlay"></div>
      <div className="motivation-content">
        <motion.blockquote
          key={currentQuote} // يضمن إعادة تشغيل الأنيميشن عند تغيير الاقتباس
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="motivation-blockquote"
        >
          {currentQuote}
        </motion.blockquote>
        <Link href="#programs-section">
          <motion.button
            className="motivation-button"
            aria-label="ابدأ رحلتك التدريبية اليوم"
          >
            ابدأ اليوم
          </motion.button>
        </Link>
      </div>
    </section>
  );
}
