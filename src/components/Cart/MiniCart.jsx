"use client";

import { useCart } from "@/lib/cart";
import Link from "next/link";
import "@/components/css/Cart/MiniCart.css";

export default function MiniCart({ isOpen, onClose }) {
  const { cart, getTotalPrice, removeFromCart, updateQuantity } = useCart();

  if (!isOpen) return null;

  return (
    <div className="mini-cart-overlay" onClick={onClose}>
      <div className="mini-cart-container" onClick={(e) => e.stopPropagation()}>
        <div className="mini-cart-header">
          <h2 className="mini-cart-title">سلة التسوق</h2>
          <button onClick={onClose} className="mini-cart-close-button">
            ✖️
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="mini-cart-empty">السلة فارغة</p>
        ) : (
          <div className="mini-cart-items">
            {cart.map((item) => (
              <div key={item.id} className="mini-cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="mini-cart-item-image"
                />
                <div className="mini-cart-item-details">
                  <h3 className="mini-cart-item-name">{item.name}</h3>
                  <p className="mini-cart-item-price">
                    {item.price} ر.س × {item.quantity}
                  </p>
                  <div className="mini-cart-item-controls">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="mini-cart-quantity-button-disabled"
                      aria-label="خفض الكمية"
                    >
                      -
                    </button>
                    <span className="mini-cart-quantity-text">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="mini-cart-quantity-button"
                      aria-label="زيادة الكمية"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="mini-cart-remove-button"
                      aria-label="حذف العنصر"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="mini-cart-footer">
              <div className="mini-cart-total">
                <span>الإجمالي:</span>
                <span>{getTotalPrice()} ر.س</span>
              </div>
              <Link href="/checkout" onClick={onClose}>
                <button className="mini-cart-checkout-button">
                  اذهب للدفع
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
