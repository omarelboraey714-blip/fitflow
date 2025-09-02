import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const type = searchParams.get("type");

  if (type === "email" && token) {
    return NextResponse.redirect(
      new URL(`/auth/login?verify=true`, request.url)
    );
  }

  return NextResponse.redirect(new URL("/auth/login", request.url));
}
