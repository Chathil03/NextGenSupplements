'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateStock(id: string, quantity: number) {
  const supabase = createClient()

  const { error } = await supabase
    .from('inventory')
    .update({ quantity })
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/inventory')
}

export async function receiveStock(id: string, addition: number) {
  const supabase = createClient()

  const { data, error: fetchError } = await supabase
    .from('inventory')
    .select('quantity')
    .eq('id', id)
    .single()

  if (fetchError) throw new Error(fetchError.message)

  const { error } = await supabase
    .from('inventory')
    .update({ quantity: (data?.quantity ?? 0) + addition })
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/inventory')
}
