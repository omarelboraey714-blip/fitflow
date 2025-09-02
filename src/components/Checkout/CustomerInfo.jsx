"use client";

import { useState } from "react";
import "@/components/css/Checkout/CustomerInfo.css";

export default function CustomerInfo({ formData: externalData, onChange }) {
  const [localData, setLocalData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    shipping: "عادي",
    coupon: "",
    ...externalData,
  });

  const [couponError, setCouponError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...localData, [name]: value };
    setLocalData(newData);
    if (onChange) onChange(newData);

    if (name === "coupon") {
      setCouponError("");
    }
  };

  return (
    <section className="customer-info-section">
      <div className="customer-info-container">
        <h2 className="customer-info-title">بيانات العميل</h2>
        <div className="customer-info-grid">
          <div>
            <label className="customer-info-label">الاسم الكامل</label>
            <div className="customer-info-input-container">
              <input
                type="text"
                name="name"
                value={localData.name}
                onChange={handleChange}
                className="customer-info-input"
                required
              />
              <span className="customer-info-icon">👤</span>
            </div>
          </div>

          <div>
            <label className="customer-info-label">البريد الإلكتروني</label>
            <div className="customer-info-input-container">
              <input
                type="email"
                name="email"
                value={localData.email}
                onChange={handleChange}
                className="customer-info-input"
                required
              />
              <span className="customer-info-icon">📧</span>
            </div>
          </div>

          <div>
            <label className="customer-info-label">رقم الهاتف</label>
            <div className="customer-info-input-container">
              <input
                type="tel"
                name="phone"
                value={localData.phone}
                onChange={handleChange}
                className="customer-info-input"
                required
              />
              <span className="customer-info-icon">📱</span>
            </div>
          </div>

          <div>
            <label className="customer-info-label">العنوان</label>
            <div className="customer-info-input-container">
              <input
                type="text"
                name="address"
                value={localData.address}
                onChange={handleChange}
                className="customer-info-input"
              />
              <span className="customer-info-icon">🏠</span>
            </div>
          </div>

          {/* إظهار طريقة الشحن فقط لو النوع هو "product" */}
          {items.some((item) => item.type === "product") && (
            <div>
              <label className="customer-info-label">طريقة الشحن</label>
              <select
                name="shipping"
                value={localData.shipping}
                onChange={handleChange}
                className="customer-info-select"
              >
                <option value="عادي">عادي (7-10 أيام)</option>
                <option value="سريع">سريع (3-5 أيام)</option>
              </select>
            </div>
          )}

          <div>
            <label className="customer-info-label">كوبون خصم (اختياري)</label>
            <div className="customer-info-input-container">
              <input
                type="text"
                name="coupon"
                value={localData.coupon}
                onChange={handleChange}
                placeholder="أدخل الكوبون"
                className="customer-info-input"
              />
              <span className="customer-info-icon">🎟️</span>
            </div>
            {couponError && (
              <p className="text-red-500 text-sm mt-1">{couponError}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
