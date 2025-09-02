"use client";

import TrainerCard from "./TrainerCard";
import "@/components/css/prgramDetails/TrainersGrid.css";

export default function TrainersGrid({ trainers }) {
  const safeTrainers = Array.isArray(trainers) ? trainers : [];

  if (!safeTrainers || safeTrainers.length === 0) {
    return (
      <section
        id="trainers"
        className="trainers-section"
        role="region"
        aria-labelledby="trainers-heading"
      >
        <h2 id="trainers-heading" className="text-2xl font-bold mb-6">
          المدربون
        </h2>
        <p className="trainers-empty" role="alert" aria-live="polite">
          لا يوجد مدربون متاحون حاليًا.
        </p>
      </section>
    );
  }

  return (
    <section
      id="trainers"
      className="trainers-section"
      role="region"
      aria-labelledby="trainers-heading"
    >
      <h2 id="trainers-heading" className="text-2xl font-bold mb-6">
        المدربون
      </h2>
      <div className="grid md:grid-cols-2 gap-6" role="list">
        {safeTrainers.map((trainer) => (
          <TrainerCard
            key={trainer.id || Math.random()}
            trainer={trainer}
            role="listitem"
          />
        ))}
      </div>
    </section>
  );
}
