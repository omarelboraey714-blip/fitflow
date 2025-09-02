"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import "@/components/css/Contact/ContactForm.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // محاكاة الإرسال
    setTimeout(() => {
      setLoading(false);
      toast.success("✅ تم إرسال رسالتك بنجاح! سنرد عليك قريبًا.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="contact-form"
    >
      <h2 className="contact-title">أرسل رسالة</h2>

      <div>
        <label className="form-label">الاسم بالكامل</label>
        <div className="form-input-wrapper">
          <span className="form-icon">👤</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
      </div>

      <div>
        <label className="form-label">البريد الإلكتروني</label>
        <div className="form-input-wrapper">
          <span className="form-icon">📧</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
      </div>

      <div>
        <label className="form-label">رقم الهاتف (اختياري)</label>
        <div className="form-input-wrapper">
          <span className="form-icon">📱</span>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      </div>

      <div>
        <label className="form-label">الموضوع</label>
        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="form-select"
        >
          <option value="">اختر الموضوع</option>
          <option value="عضوية">عضوية</option>
          <option value="تدريب شخصي">تدريب شخصي</option>
          <option value="استفسار عام">استفسار عام</option>
        </select>
      </div>

      <div>
        <label className="form-label">نص الرسالة</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          className="form-textarea"
        ></textarea>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className="form-submit-btn group"
      >
        {loading ? <div className="loading-spinner"></div> : "إرسال الرسالة"}
        <span className="btn-overlay"></span>
      </motion.button>
    </motion.form>
  );
}
