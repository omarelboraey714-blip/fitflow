import { useEffect, useState } from "react";
import { supabase } from "./supabase";

const ADMIN_EMAILS = ["admin@fitflow.com", "omarelboraey714@gmail.com"];

export const isAdmin = (email) => ADMIN_EMAILS.includes(email);

export function useAuth() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ تحقق من localStorage أولاً
    const savedUser = localStorage.getItem("fitflow_user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setRole(isAdmin(userData.email) ? "admin" : "user");
      setLoading(false);
      return;
    }

    // ✅ تحقق من Supabase session (اختياري)
    const checkSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const userData = {
          id: user.id,
          email: user.email,
          name: user.email.split("@")[0], // اسم مؤقت
          role: isAdmin(user.email) ? "admin" : "user",
        };
        localStorage.setItem("fitflow_user", JSON.stringify(userData));
        setUser(userData);
        setRole(userData.role);
      }
      setLoading(false);
    };

    checkSession();

    // ✅ استمع لتغييرات localStorage (مثل تسجيل الخروج من تبويب تاني)
    const handleStorageChange = () => {
      const savedUser = localStorage.getItem("fitflow_user");
      if (!savedUser) {
        setUser(null);
        setRole(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return { user, role, isAdmin: role === "admin", loading };
}
