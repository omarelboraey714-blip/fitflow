"use client";

import { useState } from "react";

export default function FAQAccordion({ faq }) {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="my-12">
      <h2 className="text-2xl font-bold mb-6">الأسئلة الشائعة</h2>
      {faq.map((item, i) => (
        <div key={i} className="mb-4">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left bg-gray-800 p-4 rounded-lg font-semibold"
          >
            {item.q}
          </button>
          {open === i && (
            <div className="p-4 bg-gray-700 rounded-b-lg">{item.a}</div>
          )}
        </div>
      ))}
    </section>
  );
}
