"use client";

import TrainerCard from "./TrainerCard";

export default function TrainersGrid({ trainers }) {
  return (
    <section id="trainers" className="my-12">
      <h2 className="text-2xl font-bold mb-6">المدربون</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {trainers.map((trainer) => (
          <TrainerCard key={trainer.id} trainer={trainer} />
        ))}
      </div>
    </section>
  );
}
