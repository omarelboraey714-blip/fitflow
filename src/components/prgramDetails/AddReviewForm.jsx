"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { mutate } from "swr"; // إضافة SWR لإعادة تحميل التقييمات
import "@/components/css/prgramDetails/AddReviewForm.css";

export default function AddReviewForm({ programId }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  if (!user) {
    return (
      <div className="add-review-prompt" role="alert" aria-live="polite">
        <p>لإضافة تقييم، يجب أن تكون مسجل دخول.</p>
        <a
          href="/auth/login"
          className="add-review-login-link"
          aria-label="الذهاب إلى صفحة تسجيل الدخول"
        >
          سجل دخول
        </a>
      </div>
    );
  }

  if (!programId) {
    return (
      <div className="add-review-error" role="alert" aria-live="assertive">
        خطأ: معرف البرنامج غير صالح.
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (text.trim().length < 10) {
      setError("التقييم قصير جدًا، يجب أن يكون 10 أحرف على الأقل.");
      setLoading(false);
      return;
    }

    const reviewData = {
      program_id: Number(programId), // التأكد من أن programId هو رقم
      user_name: user.name || user.email.split("@")[0],
      rating: Math.max(1, Math.min(5, rating)),
      text: text.trim(),
    };
    console.log("Sending review data:", reviewData);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      console.log("Response status:", response.status, response.statusText);
      if (response.ok) {
        setSuccess(true);
        setText("");
        setRating(5);
        mutate(`/api/reviews?program_id=${programId}`); // إعادة تحميل التقييمات
        setTimeout(() => setSuccess(false), 3000);
      } else {
        const errorData = await response.json();
        console.error("Response error:", errorData);
        setError(`فشل إرسال التقييم: ${errorData.error || "حاول مرة أخرى"}`);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("خطأ في الاتصال بالخادم.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="add-review-success" role="alert" aria-live="polite">
        ✅ تم إرسال تقييمك بنجاح!
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="add-review-form"
      role="form"
      aria-labelledby="add-review-heading"
    >
      <h3 id="add-review-heading">أضف تقييمك</h3>
      {error && (
        <div className="add-review-error" role="alert" aria-live="assertive">
          {error}
        </div>
      )}
      <div
        className="add-review-rating"
        role="radiogroup"
        aria-label="اختيار تقييم بالنجوم"
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={star <= rating ? "star-active" : "star-inactive"}
            aria-label={`اختيار ${star} نجوم`}
            aria-checked={star <= rating}
            role="radio"
          >
            ★
          </button>
        ))}
        <span aria-live="polite">{rating} نجوم</span>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="اكتب رأيك في البرنامج..."
        className="add-review-textarea"
        rows="4"
        required
        aria-required="true"
        aria-label="نص التقييم"
      />
      <button
        type="submit"
        disabled={loading}
        className="add-review-submit"
        aria-label={loading ? "جاري إرسال التقييم" : "إرسال التقييم"}
      >
        {loading ? "جاري الإرسال..." : "أرسل التقييم"}
      </button>
    </form>
  );
}
