"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function WeekAccordion({ weeks }) {
  const [openWeek, setOpenWeek] = useState(null);

  return (
    <section id="weeks" className="my-12">
      <h2 className="text-2xl font-bold mb-6">الخطة الأسبوعية</h2>
      {weeks.map((week) => (
        <div key={week.week} className="mb-4">
          <button
            onClick={() =>
              setOpenWeek(openWeek === week.week ? null : week.week)
            }
            className="w-full text-left bg-gray-800 p-4 rounded-lg font-semibold"
          >
            الأسبوع {week.week}: {week.focus}
          </button>
          {openWeek === week.week && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-2 space-y-2"
            >
              {week.sessions.map((session) => (
                <div key={session.id} className="bg-gray-700 p-3 rounded-lg">
                  <p>
                    <strong>{session.day}</strong>: {session.title}
                  </p>
                  <p className="text-sm text-gray-300">{session.goal}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      ))}
    </section>
  );
}
