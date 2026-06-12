// src/app/api/keep-alive/route.ts
// Lightweight query hit weekly by Vercel Cron to prevent Supabase free-tier pause.
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { count, error } = await supabase.from("votes").select("*", { count: "exact", head: true });

  if (error) {
    return NextResponse.json({ status: "error", error: error.message }, { status: 500 });
  }

  return NextResponse.json({ status: "alive", voteCount: count });
}