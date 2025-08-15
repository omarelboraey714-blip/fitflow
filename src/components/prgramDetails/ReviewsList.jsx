"use client";

export default function ReviewsList({ reviews }) {
  return (
    <section id="reviews" className="my-12">
      <h2 className="text-2xl font-bold mb-6">التقييمات</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-gray-800 p-4 rounded-xl">
            <div className="flex justify-between">
              <strong>{review.user}</strong>
              <span>{review.rating} نجوم</span>
            </div>
            <p className="text-gray-300 mt-2">{review.text}</p>
            <small className="text-gray-500">{review.date}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
