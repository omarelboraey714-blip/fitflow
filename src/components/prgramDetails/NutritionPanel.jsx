"use client";

import "@/components/css/prgramDetails/NutritionPanel.css";

export default function NutritionPanel({ nutrition }) {
  const safeNutrition = {
    macros: nutrition?.macros || {},
    sampleMeals: Array.isArray(nutrition?.sampleMeals)
      ? nutrition.sampleMeals
      : [],
    note: nutrition?.note || "",
  };

  return (
    <section
      id="nutrition"
      className="nutrition-section"
      role="region"
      aria-labelledby="nutrition-heading"
    >
      <h2 id="nutrition-heading" className="nutrition-heading">
        خطة التغذية
      </h2>
      {safeNutrition.macros &&
      Object.keys(safeNutrition.macros).length === 0 &&
      safeNutrition.sampleMeals.length === 0 ? (
        <p className="nutrition-empty" role="alert" aria-live="polite">
          لا توجد خطة تغذية متاحة حاليًا.
        </p>
      ) : (
        <div className="nutrition-grid">
          <div className="nutrition-card">
            <h3 className="nutrition-card-heading">العناصر الغذائية</h3>
            {Object.keys(safeNutrition.macros).length > 0 ? (
              <div className="nutrition-macros">
                {Object.entries(safeNutrition.macros).map(([key, value]) => (
                  <div key={key} className="nutrition-macro-item">
                    <span>{key}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            ) : (
              <p>لا توجد بيانات غذائية متاحة.</p>
            )}
          </div>
          <div className="nutrition-card">
            <h3 className="nutrition-card-heading">عينة وجبات</h3>
            {safeNutrition.sampleMeals.length > 0 ? (
              safeNutrition.sampleMeals.map((meal, i) => (
                <div key={i} className="nutrition-meal">
                  <strong>{meal.meal || "وجبة غير محددة"}:</strong>
                  <ul className="nutrition-meal-list" role="list">
                    {Array.isArray(meal.items) && meal.items.length > 0 ? (
                      meal.items.map((item, j) => (
                        <li key={j} role="listitem">
                          {item}
                        </li>
                      ))
                    ) : (
                      <li role="listitem">لا توجد عناصر متاحة.</li>
                    )}
                  </ul>
                </div>
              ))
            ) : (
              <p>لا توجد وجبات عينة متاحة.</p>
            )}
          </div>
          {safeNutrition.note && (
            <p className="nutrition-note">{safeNutrition.note}</p>
          )}
        </div>
      )}
    </section>
  );
}
