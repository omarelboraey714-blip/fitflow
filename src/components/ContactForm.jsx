"use client";

import { useState } from "react";
import useToastWithSound from "../hooks/useToastWithSound";

export default function ContactForm() {
  const [message, setMessage] = useState("");
  const notify = useToastWithSound(); // ← هنا

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    console.log("تم الإرسال:", data);

    // إرسال إشعار + صوت
    notify("success", "تم إرسال رسالتك بنجاح!");

    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="text"
        name="name"
        placeholder="اسمك"
        required
        className="w-full md:w-96 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        name="email"
        placeholder="إيميلك"
        required
        className="w-full md:w-96 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        name="message"
        placeholder="رسالتك"
        rows="5"
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      <button
        type="submit"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition"
      >
        أرسل الرسالة
      </button>
    </form>
  );
}
