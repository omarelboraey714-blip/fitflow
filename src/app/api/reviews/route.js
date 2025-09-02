import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  // انتظار الكوكيز
  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const { program_id, user_name, rating, text } = await request.json();

  if (!program_id || !user_name || !rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "بيانات غير صحيحة" }, { status: 400 });
  }

  const { error } = await supabase
    .from("reviews")
    .insert({ program_id, user_name, rating, text });

  if (error) {
    console.error("Insert Review Error:", error); // تسجيل الخطأ للتصحيح
    return NextResponse.json({ error: "فشل الحفظ" }, { status: 500 });
  }

  // تحديث التقييم المتوسط
  const { data } = await supabase
    .from("reviews")
    .select("rating")
    .eq("program_id", program_id);

  const avg =
    data.length > 0
      ? data.map((r) => r.rating).reduce((a, b) => a + b, 0) / data.length
      : 0;

  await supabase
    .from("programs")
    .update({ avg_rating: parseFloat(avg.toFixed(1)) })
    .eq("id", program_id);

  return NextResponse.json({ success: true });
}
