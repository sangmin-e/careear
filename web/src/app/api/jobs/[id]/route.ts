import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 })
  }

  return NextResponse.json(data)
}
