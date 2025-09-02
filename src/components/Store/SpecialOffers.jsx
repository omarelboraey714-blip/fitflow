"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "@/components/css/Store/SpecialOffers.css";

export default function SpecialOffers() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 36,
    seconds: 22,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="special-offers-section">
      <div className="special-offers-container">
        <h2 className="special-offers-title">
          🔥 عرض خاص: خصم 30% على المكملات!
        </h2>
        <p className="special-offers-description">
          اشترِ أي بروتين أو فيتامين واحصل على خصم فوري
        </p>

        <div className="special-offers-timer">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="special-offers-timer-item">
              <span className="special-offers-timer-value">{value}</span>
              <div className="special-offers-timer-unit">{unit}</div>
            </div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(255,255,255,0.4)",
              "0 0 20px 10px rgba(255,255,255,0)",
            ],
          }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="special-offers-button"
        >
          اشتري الآن
        </motion.button>
      </div>
    </section>
  );
}
