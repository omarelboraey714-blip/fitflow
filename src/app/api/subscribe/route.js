// src/app/api/subscribe/route.js
import { supabase } from "@/lib/supabase"; // تأكد إن المسار صح

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return Response.json(
        { error: "بريد إلكتروني غير صالح" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("subscribers")
      .insert([{ email, created_at: new Date().toISOString() }]);

    if (error) {
      // لو الإيميل مكرر (Unique constraint)
      if (error.code === "23505") {
        return Response.json({ error: "أنت مشترك بالفعل" }, { status: 409 });
      }
      console.error("Supabase Error:", error);
      return Response.json({ error: "حدث خطأ في الحفظ" }, { status: 500 });
    }

    return Response.json({ message: "تم الاشتراك بنجاح!" }, { status: 201 });
  } catch (err) {
    console.error("Server Error:", err);
    return Response.json({ error: "حدث خطأ داخلي" }, { status: 500 });
  }
}
