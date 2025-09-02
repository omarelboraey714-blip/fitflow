"use client";

import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaCalendarAlt,
  FaBullseye,
  FaLevelUpAlt,
  FaCheckSquare,
} from "react-icons/fa"; // أضف هذا الإمبورت
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
    if (!formData.name || formData.name.length < 2)
      newErrors.name = "الاسم يجب أن يكون من حرفين على الأقل";
    if (!formData.email) newErrors.email = "البريد الإلكتروني مطلوب";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "بريد إلكتروني غير صالح";
    if (!formData.password) newErrors.password = "كلمة المرور مطلوبة";
    else if (formData.password.length < 6)
      newErrors.password = "يجب أن تكون كلمة المرور 6 أحرف على الأقل";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "كلمتا المرور غير متطابقتين";
    if (!formData.gender) newErrors.gender = "الجنس مطلوب";
    if (
      formData.age &&
      (Number(formData.age) < 12 || Number(formData.age) > 100)
    )
      newErrors.age = "العمر يجب أن يكون بين 12 و100";
    if (!formData.terms) newErrors.terms = "يجب الموافقة على الشروط";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setMessage("");
    setErrors({}); // مسح الأخطاء السابقة

    const submitData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      phone: formData.phone,
      age: formData.age ? Number(formData.age) : undefined,
      gender: formData.gender,
      goal: formData.goal,
      experience: formData.experience,
      plan: formData.plan,
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
        // هندلة الأخطاء المفصلة من الـ API
        if (data.errors && Array.isArray(data.errors)) {
          const apiErrors = {};
          data.errors.forEach((err) => {
            apiErrors[err.path] = err.message;
          });
          setErrors((prev) => ({ ...prev, ...apiErrors }));
        }
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
            <FaUser className="form-icon-svg" />
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
            <FaEnvelope className="form-icon-svg" />
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
            <FaLock className="form-icon-svg" />
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
            <FaLock className="form-icon-svg" />
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
              <FaPhone className="form-icon-svg" />
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
          {errors.phone && <p className="form-error">{errors.phone}</p>}
        </div>

        {/* العمر */}
        <div className="form-group">
          <label className="form-label">العمر</label>
          <div className="form-input-container">
            <span className="form-icon">
              <FaCalendarAlt className="form-icon-svg" />
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
          {errors.age && <p className="form-error">{errors.age}</p>}
        </div>
      </div>

      {/* الجنس */}
      <div className="form-group">
        <label className="form-label">الجنس</label>
        <div className="form-radio-group">
          {["ذكر", "أنثى", "أفضل عدم الإفصاح"].map((gender) => (
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
          <span className="form-icon">
            <FaBullseye className="form-icon-svg" />
          </span>
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
          {errors.goal && <p className="form-error">{errors.goal}</p>}
        </div>

        {/* مستوى خبرتك */}
        <div className="form-group">
          <label className="form-label">مستوى خبرتك الرياضي</label>
          <span className="form-icon">
            <FaLevelUpAlt className="form-icon-svg" />
          </span>
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
          {errors.experience && (
            <p className="form-error">{errors.experience}</p>
          )}
        </div>
      </div>

      {/* خطط الاشتراك */}
      <div className="form-group">
        <label className="form-label">اختر خطتك</label>
        <div className="form-plan-group">
          {[
            { id: "monthly", name: "شهري", price: "99 ج.م" },
            { id: "quarterly", name: "ربع سنوي", price: "270 ج.م" },
            { id: "yearly", name: "سنوي", price: "999 ج.م" },
            { id: "VIP", name: "VIP", price: "1999 ج.م", popular: true },
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
        {errors.plan && <p className="form-error">{errors.plan}</p>}
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
