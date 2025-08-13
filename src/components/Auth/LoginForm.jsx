"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import SocialLogin from "@/components/auth/SocialLogin";

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
      className="bg-black/20 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 space-y-6 text-white"
    >
      {/* Email */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-300 mb-1">
          البريد الإلكتروني
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
      </div>

      {/* Password */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-300 mb-1">
          كلمة المرور
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            className="w-full pl-10 pr-10 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-white"
            aria-label={
              showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
            }
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
      </div>

      {/* Remember Me */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="remember"
          name="remember"
          checked={formData.remember}
          onChange={handleChange}
          className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
        />
        <label
          htmlFor="remember"
          className="text-sm text-gray-300 cursor-pointer"
        >
          تذكرني
        </label>
      </div>

      {/* Forgot Password */}
      <div className="text-right">
        <a
          href="/auth/forgot"
          className="text-sm text-blue-400 hover:text-blue-300 hover:underline transition duration-300 after:block after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full"
        >
          نسيت كلمة المرور؟
        </a>
      </div>

      {/* Login Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white font-semibold rounded-lg transition disabled:opacity-70 relative overflow-hidden group"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          </div>
        ) : (
          "تسجيل الدخول"
        )}
        {/* Ripple Effect */}
        <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition"></span>
      </motion.button>

      {/* Sign Up Link */}
      <p className="text-center text-gray-400 text-sm">
        ليس لديك حساب؟{" "}
        <a
          href="/auth/register"
          className="text-blue-400 hover:text-blue-300 font-medium transition-transform duration-300 hover:scale-105"
        >
          إنشاء حساب
        </a>
      </p>

      <SocialLogin />
    </motion.form>
  );
}
