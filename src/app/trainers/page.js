"use client";

import TrainersHeader from "@/components/Trainers/TrainersHeader";
import TrainersFilterBar from "@/components/Trainers/TrainersFilterBar";
import TrainersGrid from "@/components/Trainers/TrainersGrid";
import TrainersCTA from "@/components/Trainers/TrainersCTA";
import { useState } from "react";

// استخدم نفس ملف البرامج أو أنشئ `lib/trainers.js`
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

  const handleFilter = ({ search, specialty, experience }) => {
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
      if (experience === "أقل من 3 سنوات") {
        result = result.filter((t) => t.experience === "أقل من 3 سنوات");
      } else if (experience === "3-5 سنوات") {
        result = result.filter((t) => t.experience === "3-5 سنوات");
      } else {
        result = result.filter((t) => t.experience === "أكثر من 5 سنوات");
      }
    }

    setFilteredTrainers(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <TrainersHeader />
      <div className="px-6 max-w-7xl mx-auto">
        <TrainersFilterBar onFilter={handleFilter} />
        <TrainersGrid trainers={filteredTrainers} />
      </div>
      <TrainersCTA />
    </div>
  );
}
