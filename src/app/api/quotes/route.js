import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data, error } = await supabase
    .from("motivation_quotes")
    .select("quote");

  if (error) {
    console.error("Fetch Quotes Error:", error);
    return NextResponse.json(
      { error: "فشل تحميل الاقتباسات" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    data.map((q) => q.quote),
    { status: 200 }
  );
}
