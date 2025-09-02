import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const { slug } = await params;

  if (!slug) {
    console.error("No slug provided:", { params });
    return NextResponse.json(
      { error: "رابط البرنامج غير صالح" },
      { status: 400 }
    );
  }

  const { data: program, error } = await supabase
    .from("programs")
    .select("weeks, slug")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !program) {
    console.error("Weeks Fetch Error:", { error, slug, program });
    return NextResponse.json({ error: "البرنامج غير موجود" }, { status: 404 });
  }

  const weeks = Array.isArray(program.weeks) ? program.weeks : [];

  // إضافة slug إلى كل أسبوع لضمان الفرادة
  const enhancedWeeks = weeks.map((week) => ({
    ...week,
    programSlug: slug, // إضافة slug لاستخدامه في المفاتيح
    sessions: Array.isArray(week.sessions)
      ? week.sessions.map((session, index) => ({
          ...session,
          id: session.id || `w${week.week}s${index + 1}`, // ضمان id فريد
        }))
      : [],
  }));

  console.log("Enhanced Weeks Data:", enhancedWeeks);

  return NextResponse.json(enhancedWeeks, {
    headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate" },
  });
}
