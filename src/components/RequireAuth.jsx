"use client";

import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RequireAuth({ children, roles = ["user", "admin"] }) {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // لو مش مسجل دخول
        router.push("/auth/login");
      } else if (!roles.includes(role)) {
        // لو معاك دور مش مسموح بيه
        router.push("/dashboard"); // أو صفحة خطأ
      }
    }
  }, [user, role, loading, roles, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 dark:text-gray-300">جاري التحقق...</p>
      </div>
    );
  }

  if (!user || !roles.includes(role)) {
    return null; // أو اعرض رسالة "غير مصرح"
  }

  return children;
}
