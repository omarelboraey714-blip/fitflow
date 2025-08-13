// src/lib/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

// تفعيل الـ connection caching
let client;

if (!client) {
  client = createClient(supabaseUrl, supabaseAnonKey);
}

export { client as supabase };

// ✅ الدالة: جلب المستخدم الحالي
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("خطأ في جلب المستخدم:", error.message);
    return null;
  }
  return data?.user || null;
}

// ✅ الدالة: التحقق من إذا كان مدير
const ADMIN_EMAILS = ["admin@fitflow.com", "omarelboraey714@gmail.com"];
export function isAdmin(email) {
  return ADMIN_EMAILS.includes(email);
}
