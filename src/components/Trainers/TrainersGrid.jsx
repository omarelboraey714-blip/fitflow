"use client";

import { motion } from "framer-motion";
import TrainerCard from "./TrainerCard";

export default function TrainersGrid({ trainers }) {
  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {trainers.map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
