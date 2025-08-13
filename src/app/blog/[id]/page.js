import { supabase } from "@/lib/supabase";

export default async function PostPage({ params }) {
  const { id } = params;
  const { data: post, error } = await supabase
    .from("posts")
    .select()
    .eq("id", id)
    .single();

  if (error || !post) return <p>المقال غير موجود</p>;

  return (
    <div className="min-h-screen py-20 px-6 bg-gray-50 dark:bg-gray-900">
      <article className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-10 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          {post.title}
        </h1>
        <div className="text-gray-500 dark:text-gray-400 mb-6">
          {new Date(post.created_at).toLocaleDateString("ar-SA")} -{" "}
          {post.category}
        </div>
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>{post.content}</p>
        </div>
      </article>
    </div>
  );
}
