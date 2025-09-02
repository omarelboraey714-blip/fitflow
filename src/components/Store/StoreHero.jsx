"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import CartIcon from "@/components/Cart/CartIcon";
import MiniCart from "@/components/Cart/MiniCart";
import "@/components/css/Store/StoreHero.css";

export default function StoreHero() {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <section className="store-hero-section">
      <CartIcon onClick={() => setCartOpen(true)} />
      <MiniCart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <div className="store-hero-overlay"></div>
      <div className="store-hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="store-hero-container"
        >
          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="store-hero-title"
          >
            كمل رحلتك مش بس بالتمرين، لكن بالستايل الصح!
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="store-hero-button"
          >
            تسوق الآن
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
