"use client";

import { useState } from "react";
import "../css/auth/RegisterForm.css";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    age: "",
    gender: "",
    goal: "",
    experience: "",
    plan: "monthly",
    avatar: null,
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // مسح الخطأ عند الكتابة
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        avatar: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "الاسم مطلوب";
    if (!formData.email) newErrors.email = "البريد الإلكتروني مطلوب";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "بريد إلكتروني غير صالح";
    if (!formData.password) newErrors.password = "كلمة المرور مطلوبة";
    else if (formData.password.length < 6)
      newErrors.password = "يجب أن تكون كلمة المرور 6 أحرف على الأقل";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "كلمتا المرور غير متطابقتين";
    if (!formData.gender) newErrors.gender = "الجنس مطلوب";
    if (!formData.terms) newErrors.terms = "يجب الموافقة على الشروط";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setMessage("");

    const submitData = {
      ...formData,
      age: formData.age ? Number(formData.age) : undefined,
    };

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const data = await res.json();

      if (data.success) {
        setMessage(data.message);
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          age: "",
          gender: "",
          goal: "",
          experience: "",
          plan: "monthly",
          avatar: null,
          terms: false,
        });
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("حدث خطأ في الاتصال");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label className="form-label">الاسم الكامل</label>
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="اكتب اسمك الكامل"
            className="form-input"
          />
        </div>
        {errors.name && <p className="form-error">{errors.name}</p>}
      </div>

      {/* البريد الإلكتروني */}
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
            className="form-input"
          />
        </div>
        {errors.email && <p className="form-error">{errors.email}</p>}
      </div>

      {/* كلمة المرور */}
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
            className="form-input-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="form-toggle-password"
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
        {errors.password && <p className="form-error">{errors.password}</p>}
      </div>

      {/* تأكيد كلمة المرور */}
      <div className="form-group">
        <label className="form-label">تأكيد كلمة المرور</label>
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
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="********"
            className="form-input-password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="form-toggle-password"
          >
            {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="form-error">{errors.confirmPassword}</p>
        )}
      </div>

      <div className="form-grid">
        {/* رقم الهاتف */}
        <div className="form-group">
          <label className="form-label">رقم الهاتف</label>
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </span>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+966XXXXXXXXX"
              className="form-input"
            />
          </div>
        </div>

        {/* العمر */}
        <div className="form-group">
          <label className="form-label">العمر</label>
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="18"
              className="form-input"
            />
          </div>
        </div>
      </div>

      {/* الجنس */}
      <div className="form-group">
        <label className="form-label">الجنس</label>
        <div className="form-radio-group">
          {["ذكر", "أنثى"].map((gender) => (
            <label key={gender} className="form-radio-label">
              <input
                type="radio"
                name="gender"
                value={gender}
                checked={formData.gender === gender}
                onChange={handleChange}
                className="form-radio"
              />
              <span className="form-radio-text">{gender}</span>
            </label>
          ))}
        </div>
        {errors.gender && <p className="form-error">{errors.gender}</p>}
      </div>

      <div className="form-grid">
        {/* هدفك من الاشتراك */}
        <div className="form-group">
          <label className="form-label">هدفك من الاشتراك</label>
          <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">اختر الهدف</option>
            <option>فقدان الوزن</option>
            <option>بناء العضلات</option>
            <option>زيادة اللياقة</option>
            <option>المرونة والصحة العامة</option>
          </select>
        </div>

        {/* مستوى خبرتك */}
        <div className="form-group">
          <label className="form-label">مستوى خبرتك الرياضي</label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">اختر المستوى</option>
            <option>مبتدئ</option>
            <option>متوسط</option>
            <option>متقدم</option>
          </select>
        </div>
      </div>

      {/* خطط الاشتراك */}
      <div className="form-group">
        <label className="form-label">اختر خطتك</label>
        <div className="form-plan-group">
          {[
            { id: "monthly", name: "شهري", price: "99 ج.م" },
            { id: "quarterly", name: "ربع سنوي", price: "270 ج.م" },
            { id: "yearly", name: "سنوي", price: "999 ج.م", popular: true },
            { id: "VIP", name: "VIP", price: "999 ج.م", popular: true },
          ].map((plan) => (
            <div
              key={plan.id}
              className={`form-plan ${
                formData.plan === plan.id
                  ? "form-plan-selected"
                  : "form-plan-unselected"
              } ${plan.popular ? "form-plan-popular" : ""}`}
              onClick={() =>
                setFormData((prev) => ({ ...prev, plan: plan.id }))
              }
            >
              {plan.popular}
              <p className="form-plan-name">{plan.name}</p>
              <p className="form-plan-price">{plan.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* الموافقة على الشروط */}
      <div className="form-group">
        <label className="form-checkbox-label">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            className="form-checkbox"
          />
          <span className="form-checkbox-text">
            أوافق على{" "}
            <a href="#" className="form-link">
              الشروط والأحكام
            </a>{" "}
            الخاصة بالخدمة.
          </span>
        </label>
        {errors.terms && <p className="form-error">{errors.terms}</p>}
      </div>

      {/* رسالة النجاح/الخطأ */}
      {message && (
        <div
          className={
            message.includes("نجاح")
              ? "form-message-success"
              : "form-message-error"
          }
        >
          {message}
        </div>
      )}

      {/* زر الإرسال (مع حالة التحميل) */}
      <button type="submit" disabled={loading} className="form-submit-button">
        {loading ? "جاري التسجيل..." : "إنشاء الحساب"}
      </button>

      <p className="form-login-text">
        لديك حساب بالفعل؟{" "}
        <a href="/auth/login" className="form-login-link">
          سجل الدخول
        </a>
      </p>
    </form>
  );
}
