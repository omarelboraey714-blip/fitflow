"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function TrainersFilterBar({ onFilter }) {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const [experience, setExperience] = useState("all");

  const specialties = [
    "all",
    "كمال أجسام",
    "كروس فيت",
    "يوغا",
    "لياقة عامة",
    "تدريب شخصي",
  ];
  const experiences = ["all", "أقل من 3 سنوات", "3-5 سنوات", "أكثر من 5 سنوات"];

  const handleFilter = () => {
    onFilter({ search, specialty, experience });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-2xl mb-8 grid md:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm text-gray-300 mb-2">بحث</label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث عن مدرب..."
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-2">التخصص</label>
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none"
        >
          {specialties.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-2">سنوات الخبرة</label>
        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none"
        >
          {experiences.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-end">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleFilter}
          className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg"
        >
          تصفية
        </motion.button>
      </div>
    </div>
  );
}
