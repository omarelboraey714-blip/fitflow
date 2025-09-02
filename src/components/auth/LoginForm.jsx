"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import "../css/auth/LoginForm.css";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        // ✅ حفظ المستخدم في localStorage
        const userData = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role:
            data.user.email === "admin@fitflow.com" ||
            data.user.email === "omarelboraey714@gmail.com"
              ? "admin"
              : "user",
        };
        localStorage.setItem("fitflow_user", JSON.stringify(userData));

        // ✅ إرسال حدث لتغيير حالة التحقق
        window.dispatchEvent(new Event("storage"));

        toast.success("✅ تم تسجيل الدخول بنجاح!", { duration: 3000 });

        // ✅ التوجيه حسب الدور
        setTimeout(() => {
          if (userData.role === "admin") {
            window.location.href = "/dashboard";
          } else {
            window.location.href = "/";
          }
        }, 1000);
      } else {
        toast.error(`❌ ${data.message}`);
      }
    } catch (err) {
      toast.error("حدث خطأ في الاتصال");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="login-form"
    >
      {/* Email */}
      <div className="form-group">
        <label className="form-label">البريد الإلكتروني</label>
        <div className="form-input-container">
          <span className="form-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="form-icon-svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            required
            className="form-input"
          />
        </div>
      </div>

      {/* Password */}
      <div className="form-group">
        <label className="form-label">كلمة المرور</label>
        <div className="form-input-container">
          <span className="form-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="form-icon-svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
            required
            className="form-input-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="form-toggle-password"
            aria-label={
              showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
            }
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
      </div>

      {/* Remember Me */}
      <div className="form-checkbox-container">
        <input
          type="checkbox"
          id="remember"
          name="remember"
          checked={formData.remember}
          onChange={handleChange}
          className="form-checkbox"
        />
        <label htmlFor="remember" className="form-checkbox-label">
          تذكرني
        </label>
      </div>

      {/* Forgot Password */}
      <div className="form-forgot-password">
        <a href="/auth/forgot" className="form-forgot-link">
          نسيت كلمة المرور؟
        </a>
      </div>

      {/* Login Button */}
      <motion.button
        type="submit"
        disabled={loading}
        className="form-submit-button"
      >
        {loading ? (
          <div className="form-submit-button-spinner">
            <div className="form-submit-spinner"></div>
          </div>
        ) : (
          "تسجيل الدخول"
        )}
        {/* Ripple Effect */}
        <span className="form-submit-ripple"></span>
      </motion.button>

      {/* Sign Up Link */}
      <p className="form-signup-text">
        ليس لديك حساب؟{" "}
        <a href="/auth/register" className="form-signup-link">
          إنشاء حساب
        </a>
      </p>
    </motion.form>
  );
}
