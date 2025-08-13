"use client";

import { useState } from "react";

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          الاسم الكامل
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
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
            className="w-full pl-10 p-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* البريد الإلكتروني */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          البريد الإلكتروني
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
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
            className="w-full pl-10 p-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* كلمة المرور */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          كلمة المرور
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
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
            className="w-full pl-10 pr-10 p-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      {/* تأكيد كلمة المرور */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          تأكيد كلمة المرور
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
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
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="********"
            className="w-full pl-10 pr-10 p-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* رقم الهاتف */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            رقم الهاتف
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
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
              className="w-full pl-10 p-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* العمر */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            العمر
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
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
              className="w-full pl-10 p-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* الجنس */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          الجنس
        </label>
        <div className="flex gap-6">
          {["ذكر", "أنثى", "أفضل عدم الإفصاح"].map((gender) => (
            <label
              key={gender}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="gender"
                value={gender}
                checked={formData.gender === gender}
                onChange={handleChange}
                className="text-blue-600"
              />
              <span className="text-gray-700 dark:text-gray-300">{gender}</span>
            </label>
          ))}
        </div>
        {errors.gender && (
          <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* هدفك من الاشتراك */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            هدفك من الاشتراك
          </label>
          <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">اختر الهدف</option>
            <option>فقدان الوزن</option>
            <option>بناء العضلات</option>
            <option>زيادة اللياقة</option>
            <option>المرونة والصحة العامة</option>
          </select>
        </div>

        {/* مستوى خبرتك */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            مستوى خبرتك الرياضي
          </label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">اختر المستوى</option>
            <option>مبتدئ</option>
            <option>متوسط</option>
            <option>متقدم</option>
          </select>
        </div>
      </div>

      {/* خطط الاشتراك */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
          اختر خطتك
        </label>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {[
            { id: "monthly", name: "شهري", price: "99 ج.م" },
            { id: "quarterly", name: "3 شهور", price: "270 ج.م" },
            { id: "yearly", name: "سنوي", price: "999 ج.م", popular: true },
          ].map((plan) => (
            <div
              key={plan.id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                formData.plan === plan.id
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                  : "border-gray-300 hover:border-gray-400"
              } ${plan.popular ? "ring-2 ring-yellow-400" : ""}`}
              onClick={() =>
                setFormData((prev) => ({ ...prev, plan: plan.id }))
              }
            >
              {plan.popular && (
                <span className="block text-xs text-center text-yellow-600 font-bold mb-1">
                  الأفضل
                </span>
              )}
              <p className="font-semibold text-gray-800 dark:text-white">
                {plan.name}
              </p>
              <p className="text-blue-600 dark:text-blue-400 font-bold">
                {plan.price}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* رفع صورة شخصية */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          رفع صورة شخصية (اختياري)
        </label>
        <div className="flex items-center gap-4">
          {formData.avatar ? (
            <img
              src={formData.avatar}
              alt="الصورة الشخصية"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-gray-500">+</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="flex-1"
          />
        </div>
      </div>

      {/* الموافقة على الشروط */}
      <div>
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            className="mt-1 text-blue-600"
          />
          <span className="text-gray-700 dark:text-gray-300 text-sm">
            أوافق على{" "}
            <a href="#" className="text-blue-600 hover:underline">
              الشروط والأحكام
            </a>{" "}
            الخاصة بالخدمة.
          </span>
        </label>
        {errors.terms && (
          <p className="text-red-500 text-sm mt-1">{errors.terms}</p>
        )}
      </div>

      {/* رسالة النجاح/الخطأ */}
      {message && (
        <div
          className={`p-3 text-center rounded-lg text-sm ${
            message.includes("نجاح")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}

      {/* زر الإرسال (مع حالة التحميل) */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition"
      >
        {loading ? "جاري التسجيل..." : "إنشاء الحساب"}
      </button>

      <p className="text-center text-gray-600 dark:text-gray-400">
        لديك حساب بالفعل؟{" "}
        <a
          href="/auth/login"
          className="text-blue-600 hover:underline font-medium"
        >
          سجل الدخول
        </a>
      </p>
    </form>
  );
}
