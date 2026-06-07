'use client'

import { useState } from 'react'
import { addProduct } from './actions'
import { Plus, X, Upload, Package, DollarSign, Tag, Info, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function AddProductButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-lg shadow-blue-500/20 font-semibold active:scale-95"
      >
        <Plus className="w-4 h-4" />
        Add Product
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#0f172a] border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-500" />
                Add New Supplement
              </h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form action={async (formData) => {
              setLoading(true)
              try {
                await addProduct(formData)
              } catch (e) {
                // Re-throw Next.js redirect/not-found errors so the router handles them
                if (e && typeof e === 'object' && 'digest' in e) throw e
                setLoading(false)
                alert(e instanceof Error ? e.message : 'Something went wrong')
              }
            }} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Product Name
                  </label>
                  <input
                    name="name"
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="e.g. APEX Whey Isolate"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Category</label>
                  <select 
                    name="category"
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
                  >
                    <option value="Protein">Protein</option>
                    <option value="Pre-Workout">Pre-Workout</option>
                    <option value="Recovery">Recovery</option>
                    <option value="Wellness">Wellness</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Price (USD)
                  </label>
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Image URL
                  </label>
                  <input
                    name="image_url"
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-xs"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Description
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                  placeholder="Key benefits, ingredients, and dosages..."
                />
              </div>

              <div className="pt-4 flex justify-end gap-4">
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 text-slate-300 hover:text-white transition-colors font-medium"
                >
                  Cancel
                </button>
                <button 
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-8 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Save Product"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
