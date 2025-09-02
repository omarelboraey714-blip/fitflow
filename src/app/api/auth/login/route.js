// app/api/auth/login/route.js
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

const rateLimit = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const timeWindow = 15 * 60 * 1000;
  const maxAttempts = 5;

  if (!rateLimit.has(ip)) rateLimit.set(ip, []);
  const requests = rateLimit.get(ip).filter((t) => t > now - timeWindow);
  rateLimit.set(ip, requests);

  if (requests.length >= maxAttempts) return true;
  requests.push(now);
  return false;
}

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  if (isRateLimited(ip)) {
    return Response.json(
      { success: false, message: "تم تجاوز عدد المحاولات" },
      { status: 429 }
    );
  }

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        { success: false, message: "البريد الإلكتروني وكلمة المرور مطلوبان" },
        { status: 400 }
      );
    }

    // جلب المستخدم
    const { data: user, error } = await supabase
      .from("users")
      .select("id, email, password, name")
      .eq("email", email)
      .single();

    if (error || !user) {
      return Response.json(
        {
          success: false,
          message: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
        },
        { status: 401 }
      );
    }

    // التحقق من كلمة المرور
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return Response.json(
        { success: false, message: "كلمة المرور غير صحيحة" },
        { status: 401 }
      );
    }

    // في الإصدار الكامل، هتولد JWT أو Session
    return Response.json(
      {
        success: true,
        message: "تم تسجيل الدخول بنجاح",
        user: { id: user.id, name: user.name, email: user.email },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Login Error:", err);
    return Response.json(
      { success: false, message: "حدث خطأ داخلي" },
      { status: 500 }
    );
  }
}
