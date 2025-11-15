import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function GET() {
  const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
  const hasAnon = !!process.env.SUPABASE_ANON_KEY

  let dbOk = false
  let count: number | null = null
  let error: string | null = null

  if (hasUrl && hasAnon) {
    const { count: c, error: err } = await supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true })
    if (err) {
      error = err.message
    } else {
      dbOk = true
      count = c ?? 0
    }
  } else {
    error = 'Missing environment variables'
  }

  return NextResponse.json({ env: { hasUrl, hasAnon }, db: { ok: dbOk, count }, error })
}
