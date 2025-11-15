import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function GET(
  _request: Request,
  { params }: { params: { category: string } }
) {
  const category = decodeURIComponent(params.category)

  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('category', category)
    .limit(20)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data ?? [])
}
