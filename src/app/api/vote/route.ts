import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { name, email, city } = await request.json()

  // Validate
  if (!name || !email || !city) {
    return NextResponse.json(
      { error: 'All fields are required' },
      { status: 400 }
    )
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: 'Invalid email address' },
      { status: 400 }
    )
  }

  // Insert into Supabase
  const { data, error } = await supabase
    .from('votes')
    .insert({ name: name.trim(), email: email.trim().toLowerCase(), city: city.trim() })
    .select()

  if (error) {
    // Check for duplicate email (unique constraint violation)
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'You have already voted!' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true, message: 'Thanks for voting! 🎉', data })
}
