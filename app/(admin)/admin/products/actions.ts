import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function addProduct(formData: FormData) {
  'use server'
  
  const supabase = createClient()
  
  const name = formData.get('name') as string
  const category = formData.get('category') as string
  const price = parseFloat(formData.get('price') as string)
  const description = formData.get('description') as string
  const image_url = formData.get('image_url') as string
  
  const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')

  const { data: product, error } = await supabase
    .from('products')
    .insert([{ 
        name, 
        slug, 
        category, 
        description, 
        price, 
        image_url, 
        image_alt: `${name} supplement container`,
        rating: 5,
        review_count: 0
    }])
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  // Create initial inventory
  await supabase.from('inventory').insert([{
    product_id: product.id,
    sku: `NGS-${category.substring(0,3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
    quantity: 0,
    warehouse_location: 'MAIN-WH'
  }])

  revalidatePath('/admin/products')
  revalidatePath('/shop')
  redirect('/admin/products')
}
