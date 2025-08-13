"use client";

import { useState } from "react";

export default function CTA() {
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setMsg("تم الاشتراك!");
      e.target.reset();
    } else {
      const data = await res.json();
      setMsg(data.error || "حدث خطأ");
    }
  };

  return (
    <section className="py-20 px-6 bg-blue-700 text-white text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">ابقَ على تواصل</h2>
        <p className="text-xl opacity-90 mb-8">
          اشترك في نشرتنا للحصول على نصائح لياقة مجانية.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <input
            type="email"
            name="email"
            placeholder="إيميلك"
            required
            className="w-full px-4 py-3 rounded-lg focus:outline-none"
          />
          <button
            type="submit"
            className="w-full py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-gray-100"
          >
            اشترك الآن
          </button>
        </form>
        {msg && <p className="mt-4 text-lg">{msg}</p>}
      </div>
    </section>
  );
}
