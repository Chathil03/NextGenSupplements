'use server'

import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/admin'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function addProduct(formData: FormData) {
  const supabase = createClient()
  const adminClient = createAdminClient()

  const name = formData.get('name') as string
  const category = formData.get('category') as string
  const price = parseFloat(formData.get('price') as string)
  const description = formData.get('description') as string
  const imageFile = formData.get('image') as File

  const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')

  if (!imageFile || imageFile.size === 0) {
    throw new Error('Product image is required')
  }

  const ext = imageFile.name.split('.').pop() ?? 'png'
  const filename = `${slug}-${Date.now()}.${ext}`

  const { error: uploadError } = await adminClient.storage
    .from('products')
    .upload(filename, imageFile, { contentType: imageFile.type, upsert: true })

  if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`)

  const { data: { publicUrl } } = adminClient.storage
    .from('products')
    .getPublicUrl(filename)

  const { data: product, error } = await supabase
    .from('products')
    .insert([{
      name,
      slug,
      category,
      description,
      price,
      image_url: publicUrl,
      image_alt: `${name} supplement container`,
      rating: 5,
      review_count: 0,
    }])
    .select()
    .single()

  if (error) throw new Error(error.message)

  await supabase.from('inventory').insert([{
    product_id: product.id,
    sku: `NGS-${category.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
    quantity: 0,
    warehouse_location: 'MAIN-WH',
  }])

  revalidatePath('/admin/products')
  revalidatePath('/shop')
  redirect('/admin/products')
}
