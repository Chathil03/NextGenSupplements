import { createClient } from '@/utils/supabase/server'
import { Search, Filter, Edit, Trash2, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { AddProductButton } from './AddProductButton'

export default async function AdminProductsPage() {
  const supabase = createClient()
  
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="p-8 text-center bg-red-500/10 border border-red-500/20 rounded-2xl">
        <p className="text-red-400">Failed to load products: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Products</h1>
          <p className="text-slate-400 text-sm">Manage your supplement inventory and details.</p>
        </div>
        <AddProductButton />
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-[#0f172a] border border-slate-800 p-4 rounded-2xl">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search by name, SKU or slug..."
            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-slate-900/50 border border-slate-800 text-slate-300 rounded-xl hover:bg-slate-800 transition-all text-sm font-medium">
            <Filter className="w-4 h-4" />
            Category
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-slate-900/50 border border-slate-800 text-slate-300 rounded-xl hover:bg-slate-800 transition-all text-sm font-medium">
            Status
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 border-b border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Features</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {products?.map((product) => (
                <tr key={product.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-800 border border-slate-700 shrink-0">
                        <Image
                          src={product.image_url || '/placeholder.png'}
                          alt={product.image_alt || product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{product.name}</p>
                        <p className="text-xs text-slate-500 truncate font-mono uppercase tracking-tight">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-600/10 text-blue-500 border border-blue-600/20">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white">${product.price.toFixed(2)}</span>
                      {product.original_price && (
                        <span className="text-xs text-slate-500 line-through">${product.original_price.toFixed(2)}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                       {product.is_featured && (
                         <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-amber-600/10 text-amber-500 border border-amber-600/20">
                           FEAT
                         </span>
                       )}
                       {product.badge && (
                         <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-violet-600/10 text-violet-500 border border-violet-600/20">
                           {product.badge.substring(0, 4)}
                         </span>
                       )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <Link href={`/shop/${product.slug}`} target="_blank" className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-600/10 rounded-lg transition-all" title="View in Shop">
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/30 flex items-center justify-between">
          <p className="text-xs text-slate-500">Showing <span className="text-white font-medium">{products?.length}</span> products</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-400 rounded-lg text-xs disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-400 rounded-lg text-xs disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
