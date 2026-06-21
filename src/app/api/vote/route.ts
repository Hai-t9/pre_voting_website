import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

// Simple in-memory rate limiter (resets on server restart)
const rateLimit = new Map<string, number>();
const RATE_LIMIT_WINDOW = 10_000; // 10 seconds

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, time] of rateLimit) {
    if (now - time > RATE_LIMIT_WINDOW) rateLimit.delete(key);
  }
}, 300_000);

// GET keeps the function warm (called by cron job every 5 min)
export async function GET() {
  return NextResponse.json({ status: "ok", service: "vote-api" });
}

export async function POST(request: Request) {
  const {
    firstName,
    lastName,
    phone,
    wilayaCode,
    wouldVote,
    municipality,
    volunteerInterest,
    message,
    locale,
  } = await request.json();

  // Validate required fields
  if (!firstName || !lastName || !phone || !wilayaCode || !wouldVote) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 },
    );
  }

  // Algerian phone number validation
  const phoneClean = phone.replace(/[\s\-()]/g, "");
  const isAlgerianPhone =
    /^(05|06|07|02|03|04|08|09)[0-9]{8}$/.test(phoneClean) ||
    /^\+213[567023489][0-9]{8}$/.test(phoneClean);
  if (!isAlgerianPhone) {
    return NextResponse.json(
      {
        error:
          "Invalid phone number. Must be an Algerian number (e.g., 05XX XX XX XX)",
      },
      { status: 400 },
    );
  }

  // Rate limiting by IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const lastSubmission = rateLimit.get(ip);
  if (lastSubmission && Date.now() - lastSubmission < RATE_LIMIT_WINDOW) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait before voting again." },
      { status: 429 },
    );
  }

  // Insert into Supabase
  const { data, error } = await supabase
    .from("votes")
    .insert({
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      phone: phone.trim(),
      wilaya_code: wilayaCode,
      would_vote: wouldVote,
      municipality: municipality?.trim() || null,
      volunteer_interest: volunteerInterest || null,
      message: message?.trim() || null,
      locale: locale || null,
    })
    .select();

  if (error) {
    // Unique violation = duplicate email
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "You have already voted!" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  // Record successful attempt for rate limiting
  rateLimit.set(ip, Date.now());

  // Backup to Google Sheets (fire and forget)
  if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
    fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        phone,
        wilayaCode,
        wouldVote,
        municipality,
        volunteerInterest,
        message,
        locale,
      }),
    }).catch(() => {});
  }

  return NextResponse.json({
    success: true,
    message: "Thanks for voting! 🎉",
    data,
  });
}
