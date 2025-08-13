"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyForm({ email }) {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();

    if (data.success) {
      setMessage("تم التحقق بنجاح! جاري التوجيه...");
      setTimeout(() => router.push("/dashboard"), 1500);
    } else {
      setMessage(data.message);
    }

    setLoading(false);
  };

  const handleResend = async () => {
    const res = await fetch("/api/auth/resend-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-gray-600 dark:text-gray-300 text-center">
        أدخل الكود المرسل إلى <strong>{email}</strong>
      </p>

      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="123456"
        maxLength="6"
        className="w-full p-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg text-center text-xl font-mono"
        required
      />

      {message && (
        <p
          className={`text-sm text-center ${
            message.includes("نجاح") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <div className="space-y-3">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-semibold rounded-lg"
        >
          {loading ? "جاري التحقق..." : "تحقق"}
        </button>

        <button
          type="button"
          onClick={handleResend}
          className="w-full py-2 text-sm text-blue-600 hover:underline"
        >
          أعد إرسال الكود
        </button>
      </div>
    </form>
  );
}
