"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPanel() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      const [subscribers, posts, subscriptions] = await Promise.all([
        supabase.from("subscribers").select("*", { count: "exact" }),
        supabase.from("posts").select("*", { count: "exact" }),
        supabase.from("subscriptions").select("*", { count: "exact" }),
      ]);
      setStats({
        subscribers: subscribers.count,
        posts: posts.count,
        subscriptions: subscriptions.count,
      });
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center">
          <h3 className="text-lg text-gray-600 dark:text-gray-300">
            المشتركين
          </h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {stats.subscribers}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center">
          <h3 className="text-lg text-gray-600 dark:text-gray-300">المقالات</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {stats.posts}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center">
          <h3 className="text-lg text-gray-600 dark:text-gray-300">
            الاشتراكات
          </h3>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            {stats.subscriptions}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
          إدارة المحتوى
        </h2>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          أضف مقال جديد
        </button>
      </div>
    </div>
  );
}
