"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import useSWR from "swr";
import "@/components/css/programs/FeaturedProgram.css";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch featured program");
  }
  const data = await res.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
};

export default function FeaturedProgram() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const { data: featured, error } = useSWR("/api/programs/featured", fetcher);

  if (error) {
    return (
      <section className="featured-program-section">
        <div className="featured-program-container">
          <p className="text-red-500 text-center">
            تعذر تحميل البرنامج المميز. حاول مرة أخرى لاحقًا.
          </p>
        </div>
      </section>
    );
  }

  if (!featured) {
    return (
      <section className="featured-program-section">
        <div className="featured-program-container">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="featured-program-section">
      <motion.div style={{ y }} className="featured-program-container">
        <div className="featured-program-content">
          <div className="featured-program-image-container">
            <img
              src={featured.image}
              alt={`صورة البرنامج المميز ${featured.name}`}
              className="featured-program-image"
              loading="lazy"
            />
          </div>
          <div className="featured-program-text-container">
            <motion.h2
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="featured-program-title"
            >
              {featured.name}
            </motion.h2>
            <motion.p
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="featured-program-description"
            >
              {featured.duration}
            </motion.p>
            <Link href={`/programs/${featured.slug}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="featured-program-button"
                aria-label={`سجل الآن في برنامج ${featured.name}`}
              >
                سجّل الآن
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
