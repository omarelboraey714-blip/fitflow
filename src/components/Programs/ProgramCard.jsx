"use client";

import Link from "next/link";
import "@/components/css/programs/ProgramCard.css";

export default function ProgramCard({ program }) {
  const trainer =
    program.trainers &&
    typeof program.trainers === "object" &&
    program.trainers.name
      ? program.trainers
      : null;
  const defaultImage = "/images/default-program.webp";

  return (
    <div className="program-card group">
      <Link href={`/programs/${program.slug}`}>
        <div className="program-card-image-container">
          <img
            src={program.image || defaultImage}
            alt={`صورة برنامج ${program.name}`}
            className="program-card-image program-card-image-hover"
            loading="lazy"
          />
          <div className="program-card-overlay"></div>
          <div className="program-card-title-overlay">
            <h3 className="program-card-title">{program.name}</h3>
            <p>{program.duration}</p>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <Link href={`/programs/${program.slug}`}>
          <h3 className="program-card-title-link">{program.name}</h3>
        </Link>
        <p className="program-card-duration">{program.duration}</p>

        {trainer ? (
          <div className="program-card-trainer">
            <img
              src={trainer.avatar || defaultImage}
              alt={`صورة المدرب ${trainer.name}`}
              className="program-card-trainer-avatar"
              loading="lazy"
            />
            <span>{trainer.name}</span>
          </div>
        ) : (
          <div className="program-card-trainer">
            <span>لا يوجد مدرب محدد</span>
          </div>
        )}

        <div className="program-card-meta">
          <span className="program-card-level">{program.level}</span>
          <div className="program-card-stars">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={
                  i < program.difficulty
                    ? "program-card-star-active"
                    : "program-card-star-inactive"
                }
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div className="program-card-rating">
          ⭐ {program.avg_rating?.toFixed(1) || "جديد"}
        </div>

        <ul className="program-card-features">
          {program.features &&
          Array.isArray(program.features) &&
          program.features.length > 0 ? (
            program.features.slice(0, 2).map((f, i) => <li key={i}>• {f}</li>)
          ) : (
            <li>لا توجد مميزات محددة</li>
          )}
        </ul>

        <Link href={`/programs/${program.slug}`}>
          <button
            className="program-card-button"
            aria-label={`عرض تفاصيل برنامج ${program.name}`}
          >
            عرض التفاصيل
          </button>
        </Link>
      </div>
    </div>
  );
}
