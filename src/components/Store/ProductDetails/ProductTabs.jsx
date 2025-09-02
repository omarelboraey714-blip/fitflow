"use client";

import { useState } from "react";
import "@/components/css/Store/ProductDetails/ProductTabs.css";

export default function ProductTabs({ product }) {
  const [active, setActive] = useState(0);
  const tabs = ["الوصف", "المواصفات", "الآراء"];

  return (
    <div className="product-tabs-container">
      <div className="product-tabs-nav">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`product-tab-button ${active === i ? "active" : ""}`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="product-tab-content">
        {active === 0 && <p>{product.long_description}</p>}
        {active === 1 && <ProductSpecs specs={product.specs} />}
        {active === 2 && <ProductReviews productId={product.id} />}
      </div>
    </div>
  );
}
