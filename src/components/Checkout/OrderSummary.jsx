"use client";

import "@/components/css/Checkout/OrderSummary.css";

export default function OrderSummary({ items = [], total }) {
  return (
    <section className="order-summary">
      <h2 className="order-summary-title">ملخص الطلب</h2>
      <div className="order-summary-items">
        {items.map((item, i) => (
          <div key={i} className="order-summary-item">
            <img
              src={item.image}
              alt={item.name}
              className="order-summary-item-image"
            />
            <div className="order-summary-item-info">
              <h3 className="order-summary-item-name">{item.name}</h3>
              <p className="order-summary-item-price">
                {item.price} ر.س × {item.quantity}
              </p>
            </div>
            <div className="order-summary-item-total">
              {item.finalPrice} ر.س
            </div>
          </div>
        ))}
      </div>

      <div className="order-summary-totals">
        <div className="order-summary-total-row">
          <span>الإجمالي:</span>
          <span>{total} ر.س</span>
        </div>
      </div>
    </section>
  );
}
