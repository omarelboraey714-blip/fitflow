"use client";

export default function NutritionPanel({ nutrition }) {
  return (
    <section id="nutrition" className="my-12">
      <h2 className="text-2xl font-bold mb-6">خطة التغذية</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">العناصر الغذائية</h3>
          <div className="space-y-3">
            {Object.entries(nutrition.macros).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span>{key}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">عينة وجبات</h3>
          {nutrition.sampleMeals.map((meal, i) => (
            <div key={i} className="mb-4">
              <strong>{meal.meal}:</strong>
              <ul className="list-disc list-inside text-sm text-gray-300 mt-1">
                {meal.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
