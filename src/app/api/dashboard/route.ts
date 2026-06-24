// src/app/api/dashboard/route.ts
// Secure API for the dashboard — requires a secret token
// Uses the service role key to bypass RLS (never exposed to the browser)

import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// Same password as the dashboard login
const DASHBOARD_PASSWORD = "kehal2025";

export async function GET(request: Request) {
  // Check auth header
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${DASHBOARD_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch all votes using service role (bypasses RLS)
  const { data, error } = await supabaseAdmin
    .from("votes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
