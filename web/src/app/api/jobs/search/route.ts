import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const keyword = (searchParams.get('keyword') || '').trim()

  if (!keyword) {
    return NextResponse.json([], { status: 200 })
  }

  // Basic ilike OR search across name/description/category
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .or(
      `name.ilike.%${keyword}%,description.ilike.%${keyword}%,category.ilike.%${keyword}%`
    )
    .limit(10)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data ?? [])
}
