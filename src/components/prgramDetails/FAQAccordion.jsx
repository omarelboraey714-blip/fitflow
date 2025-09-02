"use client";

import { useState } from "react";
import "@/components/css/prgramDetails/FAQAccordion.css";

export default function FAQAccordion({ faq }) {
  const [open, setOpen] = useState(null);
  const safeFaq = Array.isArray(faq) ? faq : [];

  if (safeFaq.length === 0) {
    return (
      <section
        id="faq"
        className="faq-section"
        role="region"
        aria-labelledby="faq-heading"
      >
        <h2 id="faq-heading" className="faq-heading">
          الأسئلة الشائعة
        </h2>
        <p className="faq-empty" role="alert" aria-live="polite">
          لا توجد أسئلة شائعة متاحة حاليًا.
        </p>
      </section>
    );
  }

  return (
    <section
      id="faq"
      className="faq-section"
      role="region"
      aria-labelledby="faq-heading"
    >
      <h2 id="faq-heading" className="faq-heading">
        الأسئلة الشائعة
      </h2>
      {safeFaq.map((item, i) => (
        <div key={i} className="faq-item">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="faq-question-button"
            aria-expanded={open === i}
            aria-controls={`faq-answer-${i}`}
            aria-label={`عرض إجابة السؤال: ${item.q}`}
          >
            {item.q || "سؤال غير متوفر"}
          </button>
          {open === i && (
            <div
              id={`faq-answer-${i}`}
              className="faq-answer"
              role="region"
              aria-live="polite"
            >
              {item.a || "إجابة غير متوفرة"}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
