// src/app/api/vote/route.ts
// Handles vote/pledge submissions: validates input and inserts into Supabase "votes" table.
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { fullName, email, wilayaCode, wouldVote, message, locale } = await request.json();

  // Basic validation
  if (!fullName || !email || !wilayaCode || !wouldVote) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { error } = await supabase.from("votes").insert({
    full_name: fullName,
    email,
    wilaya_code: wilayaCode,
    would_vote: wouldVote,
    message: message || null,
    locale: locale || null,
  });

  if (error) {
    // Unique violation = duplicate email
    if (error.code === "23505") {
      return NextResponse.json({ error: "duplicate" }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}