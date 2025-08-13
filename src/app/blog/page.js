import { supabase } from "@/lib/supabase";

export default async function BlogPage() {
  const { data: posts, error } = await supabase.from("posts").select();

  if (error) return <p>خطأ في تحميل المقالات</p>;

  return (
    <div className="min-h-screen py-20 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
          مدونة اللياقة
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              <img
                src={post.image_url || "/images/placeholder.jpg"}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mb-3">
                  {post.category}
                </span>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-3 line-clamp-3">
                  {post.excerpt}
                </p>
                <a
                  href={`/blog/${post.id}`}
                  className="text-blue-600 dark:text-blue-400 font-semibold mt-4 inline-block hover:underline"
                >
                  اقرأ المزيد →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
