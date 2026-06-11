import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  // Simple lightweight query to keep the DB active
  const { count, error } = await supabase
    .from('votes')
    .select('*', { count: 'exact', head: true })

  if (error) {
    return NextResponse.json({ status: 'error', error: error.message }, { status: 500 })
  }

  return NextResponse.json({ status: 'alive', voteCount: count })
}
