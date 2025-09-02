"use client";

import TrainersHeader from "@/components/Trainers/TrainersHeader";
import TrainersFilterBar from "@/components/Trainers/TrainersFilterBar";
import TrainersGrid from "@/components/Trainers/TrainersGrid";
import TrainersCTA from "@/components/Trainers/TrainersCTA";
import { useState, useEffect } from "react";

const trainers = [
  {
    id: 1,
    slug: "coach-ahmed",
    name: "Coach Ahmed",
    avatar: "images/CoachAhmed.webp",
    specialty: "كمال أجسام",
    experience: "أكثر من 5 سنوات",
  },
  {
    id: 2,
    slug: "coach-lina",
    name: "Coach Lina",
    avatar: "images/CoachLina.webp",
    specialty: "يوغا",
    experience: "3-5 سنوات",
  },
  {
    id: 3,
    slug: "coach-omar",
    name: "Coach Omar",
    avatar: "images/CoachOmar.webp",
    specialty: "كروس فيت",
    experience: "أكثر من 5 سنوات",
  },
];

export default function TrainersPage() {
  const [filteredTrainers, setFilteredTrainers] = useState(trainers);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilter = ({ search, specialty, experience }) => {
    setIsLoading(true);
    let result = trainers;

    if (search) {
      result = result.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (specialty !== "all") {
      result = result.filter((t) => t.specialty === specialty);
    }
    if (experience !== "all") {
      result = result.filter((t) => t.experience === experience);
    }

    setTimeout(() => {
      setFilteredTrainers(result);
      setIsLoading(false);
    }, 500); // Simulate loading delay
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <TrainersHeader />
      <div className="px-4 sm:px-6 max-w-7xl mx-auto">
        <TrainersFilterBar onFilter={handleFilter} />
        <TrainersGrid trainers={filteredTrainers} isLoading={isLoading} />
      </div>
      <TrainersCTA />
    </div>
  );
}
