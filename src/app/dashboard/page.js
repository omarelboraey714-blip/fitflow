"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, isAdmin } from "@/lib/supabase";
import AdminPanel from "@/components/Admin/AdminPanel";
import DashboardContent from "@/components/User/DashboardContent";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setRole(isAdmin(currentUser.email) ? "admin" : "user");
      } else {
        window.location.href = "/auth/login";
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) return <p className="text-center py-10">جاري التحقق...</p>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          مرحباً، {user?.email}
        </h1>

        {role === "admin" ? <AdminPanel /> : <DashboardContent />}
      </div>
    </div>
  );
}
