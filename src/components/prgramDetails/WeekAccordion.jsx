"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import useSWR from "swr";
import "@/components/css/prgramDetails/WeekAccordion.css";

const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("فشل تحميل الخطة");
    return res.json();
  });

export default function WeekAccordion({ slug }) {
  const [openWeek, setOpenWeek] = useState(null);
  const { data: weeks, error } = useSWR(
    slug ? `/api/programs/${encodeURIComponent(slug)}/weeks` : null,
    fetcher
  );

  if (!slug) {
    return (
      <section
        id="weeks"
        className="week-accordion-section"
        role="region"
        aria-labelledby="week-accordion-heading"
      >
        <h2 id="week-accordion-heading" className="week-accordion-heading">
          الخطة الأسبوعية
        </h2>
        <p className="week-accordion-error" role="alert" aria-live="assertive">
          رابط البرنامج غير صالح.
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="weeks"
        className="week-accordion-section"
        role="region"
        aria-labelledby="week-accordion-heading"
      >
        <h2 id="week-accordion-heading" className="week-accordion-heading">
          الخطة الأسبوعية
        </h2>
        <div className="week-accordion-error">
          <p role="alert" aria-live="assertive">
            عذرًا، تعذر تحميل الخطة الأسبوعية حاليًا.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="retry-button"
            aria-label="إعادة تحميل الخطة الأسبوعية"
          >
            إعادة المحاولة
          </button>
        </div>
      </section>
    );
  }

  if (!weeks) {
    return (
      <section
        id="weeks"
        className="week-accordion-section"
        role="region"
        aria-labelledby="week-accordion-heading"
      >
        <h2 id="week-accordion-heading" className="week-accordion-heading">
          الخطة الأسبوعية
        </h2>
        <div className="week-accordion-loading">
          <div className="week-accordion-spinner" aria-hidden="true"></div>
          <p role="status" aria-live="polite">
            جاري تحميل الخطة...
          </p>
        </div>
      </section>
    );
  }

  const safeWeeks = Array.isArray(weeks) ? weeks : [];

  if (safeWeeks.length === 0) {
    return (
      <section
        id="weeks"
        className="week-accordion-section"
        role="region"
        aria-labelledby="week-accordion-heading"
      >
        <h2 id="week-accordion-heading" className="week-accordion-heading">
          الخطة الأسبوعية
        </h2>
        <p className="week-accordion-empty" role="alert" aria-live="polite">
          الخطة الأسبوعية لم تُضاف بعد.
        </p>
      </section>
    );
  }

  return (
    <section
      id="weeks"
      className="week-accordion-section"
      role="region"
      aria-labelledby="week-accordion-heading"
    >
      <h2 id="week-accordion-heading" className="week-accordion-heading">
        الخطة الأسبوعية
      </h2>
      <div className="week-accordion-list" role="list">
        {safeWeeks.map((week) => (
          <div
            key={`${week.programSlug || slug}-week-${week.week}`} // مفتاح فريد باستخدام programSlug
            className="week-accordion-item"
            role="listitem"
          >
            <button
              onClick={() =>
                setOpenWeek(openWeek === week.week ? null : week.week)
              }
              className={`week-accordion-button ${
                openWeek === week.week
                  ? "week-accordion-button-open"
                  : "week-accordion-button-closed"
              }`}
              aria-expanded={openWeek === week.week}
              aria-controls={`week-content-${week.week}`}
              aria-label={`عرض تفاصيل الأسبوع ${week.week}`}
            >
              الأسبوع {week.week || "غير محدد"}: {week.focus || "غير محدد"}
            </button>
            {openWeek === week.week && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="week-accordion-content"
                id={`week-content-${week.week}`}
                role="region"
                aria-labelledby={`week-button-${week.week}`}
              >
                {week.sessions &&
                Array.isArray(week.sessions) &&
                week.sessions.length > 0 ? (
                  <ul className="week-accordion-sessions-list" role="list">
                    {week.sessions.map((session, sessionIndex) => (
                      <li
                        key={`${week.programSlug || slug}-week-${
                          week.week
                        }-session-${session.id || sessionIndex}`} // مفتاح فريد
                        className="week-accordion-session-item"
                        role="listitem"
                      >
                        <div className="week-accordion-session-header">
                          <strong>{session.day || "غير محدد"}</strong> —{" "}
                          {session.title || "غير محدد"}
                          <span className="week-accordion-session-duration">
                            {session.duration || 0} دقيقة
                          </span>
                        </div>
                        <p className="week-accordion-session-goal">
                          <strong>الهدف:</strong> {session.goal || "غير محدد"}
                        </p>
                        {session.exercises &&
                        Array.isArray(session.exercises) &&
                        session.exercises.length > 0 ? (
                          <div className="week-accordion-exercises">
                            <strong>التمارين:</strong>
                            <ul className="exercises-grid" role="list">
                              {session.exercises.map((exercise, exIndex) => (
                                <li
                                  key={`${week.programSlug || slug}-week-${
                                    week.week
                                  }-session-${
                                    session.id || sessionIndex
                                  }-exercise-${exIndex}`} // مفتاح فريد
                                  className="exercise-item"
                                  role="listitem"
                                >
                                  <span className="exercise-name">
                                    {exercise.name || "تمرين غير محدد"}
                                  </span>
                                  <span className="exercise-specs">
                                    {exercise.sets || 0} مجموعات ×{" "}
                                    {exercise.reps || 0} | راحة:{" "}
                                    {exercise.restSec || 0} ثانية
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <p
                            className="no-exercises"
                            role="alert"
                            aria-live="polite"
                          >
                            لا توجد تمارين لهذه الجلسة.
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-sessions" role="alert" aria-live="polite">
                    لا توجد جلسات لهذا الأسبوع بعد.
                  </p>
                )}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
