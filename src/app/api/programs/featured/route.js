import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("programs")
      .select("*")
      .eq("is_featured", true)
      .limit(1);

    if (error) {
      console.error("Supabase query error:", error.message, error.details);
      return Response.json(
        { error: "Failed to fetch featured program" },
        { status: 500 }
      );
    }

    return Response.json(data[0] || null);
  } catch (error) {
    console.error(
      "Unexpected error in /api/programs/featured:",
      error.message,
      error.stack
    );
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
