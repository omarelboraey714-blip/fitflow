// app/api/auth/register/route.js
import { registerSchema } from "@/lib/validators";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

// Rate Limiting بسيط (مثلاً: 5 محاولات كل 15 دقيقة)
const rateLimit = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const timeWindow = 15 * 60 * 1000; // 15 دقيقة
  const maxAttempts = 5;

  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, []);
  }

  const requests = rateLimit.get(ip).filter((t) => t > now - timeWindow);
  rateLimit.set(ip, requests);

  if (requests.length >= maxAttempts) {
    return true;
  }

  requests.push(now);
  return false;
}

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";

  // تحقق من Rate Limit
  if (isRateLimited(ip)) {
    return Response.json(
      { success: false, message: "تم تجاوز عدد المحاولات. حاول لاحقًا." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    // تحقق من البيانات
    const validated = registerSchema.safeParse(body);
    if (!validated.success) {
      const errors = validated.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));
      console.error("Validation Errors:", errors);
      return Response.json(
        {
          success: false,
          message: "بيانات غير صحيحة",
          errors,
        },
        { status: 400 }
      );
    }

    const {
      email,
      password,
      name,
      phone,
      age,
      gender,
      goal,
      experience,
      plan,
    } = validated.data;

    // تحقق إذا كان الإيميل موجود
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return Response.json(
        { success: false, message: "البريد الإلكتروني مستخدم بالفعل" },
        { status: 409 }
      );
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    // إنشاء المستخدم
    const { error } = await supabase.from("users").insert([
      {
        name,
        email,
        password: hashedPassword,
        phone,
        age,
        gender,
        goal,
        experience,
        plan,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Supabase Insert Error:", error);
      return Response.json(
        { success: false, message: `حدث خطأ أثناء التسجيل: ${error.message}` },
        { status: 500 }
      );
    }

    return Response.json(
      { success: true, message: "تم إنشاء الحساب بنجاح!" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Registration Error:", err);
    return Response.json(
      { success: false, message: "حدث خطأ داخلي" },
      { status: 500 }
    );
  }
}
