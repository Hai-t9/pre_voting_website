import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  // Keep DB alive
  const { count, error } = await supabase
    .from("votes")
    .select("*", { count: "exact", head: true });

  if (error) {
    return NextResponse.json(
      { status: "error", error: error.message },
      { status: 500 },
    );
  }

  // Warm the vote API function too
  fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/vote`,
    {
      method: "GET",
    },
  ).catch(() => {});

  return NextResponse.json({ status: "alive", voteCount: count });
}
