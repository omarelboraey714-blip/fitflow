"use client";

import { motion } from "framer-motion";
import TrainerCard from "./TrainerCard";
import "@/components/css/trainers/TrainersGrid.css";

export default function TrainersGrid({ trainers, isLoading }) {
  return (
    <section className="trainers-grid-section">
      <div className="trainers-grid-container">
        <motion.div
          className="trainers-grid"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
        >
          {isLoading
            ? Array(3)
                .fill()
                .map((_, index) => (
                  <TrainerCard
                    key={index}
                    trainer={{
                      id: index,
                      name: "",
                      avatar: "",
                      specialty: "",
                      experience: "",
                    }}
                    isLoading={true}
                  />
                ))
            : trainers.map((trainer) => (
                <TrainerCard
                  key={trainer.id}
                  trainer={trainer}
                  isLoading={false}
                />
              ))}
        </motion.div>
      </div>
    </section>
  );
}
