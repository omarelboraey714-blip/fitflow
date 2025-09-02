"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import "@/components/css/trainers/TrainersFilterBar.css";

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
    <div className="filter-bar">
      <div>
        <label className="filter-label">بحث</label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث عن مدرب..."
          className="filter-input"
        />
      </div>

      <div>
        <label className="filter-label">التخصص</label>
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="filter-select"
        >
          {specialties.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="filter-label">سنوات الخبرة</label>
        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="filter-select"
        >
          {experiences.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>

      <div className="trainer-filter-button-wrapper">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleFilter}
          className="trainer-filter-button"
        >
          تصفية
        </motion.button>
      </div>
    </div>
  );
}
