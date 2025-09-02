"use client";

import "@/components/css/Store/ProductDetails/ProductSpecs.css";

export default function ProductSpecs({ specs }) {
  if (!specs || Object.keys(specs).length === 0) return null;

  return (
    <div className="product-specs">
      <h3>المواصفات</h3>
      <ul>
        {Object.entries(specs).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
