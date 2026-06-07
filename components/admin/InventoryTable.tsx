'use client'

import { useState, useMemo } from 'react'
import { updateStock, receiveStock } from '@/app/(admin)/admin/inventory/actions'
import { Search, Edit2, X, Check, Plus, AlertTriangle, CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InventoryItem {
  id: string
  sku: string
  product_name: string
  stock_status: string
  available_quantity: number
  quantity: number
  reserved_quantity: number
  low_stock_threshold: number
  warehouse_location: string
}

export function InventoryTable({ inventory }: { inventory: InventoryItem[] }) {
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editQty, setEditQty] = useState('')
  const [receiveId, setReceiveId] = useState<string | null>(null)
  const [receiveQty, setReceiveQty] = useState('')
  const [loading, setLoading] = useState(false)

  const filtered = useMemo(() => {
    if (!search.trim()) return inventory
    const q = search.toLowerCase()
    return inventory.filter(
      i =>
        i.sku.toLowerCase().includes(q) ||
        i.product_name.toLowerCase().includes(q) ||
        i.warehouse_location.toLowerCase().includes(q)
    )
  }, [inventory, search])

  const startEdit = (item: InventoryItem) => {
    setReceiveId(null)
    setEditingId(item.id)
    setEditQty(String(item.quantity))
  }

  const startReceive = (item: InventoryItem) => {
    setEditingId(null)
    setReceiveId(item.id)
    setReceiveQty('')
  }

  const cancelAll = () => {
    setEditingId(null)
    setReceiveId(null)
    setEditQty('')
    setReceiveQty('')
  }

  const saveEdit = async (id: string) => {
    const qty = parseInt(editQty)
    if (isNaN(qty) || qty < 0) return
    setLoading(true)
    try {
      await updateStock(id, qty)
      cancelAll()
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Update failed')
    } finally {
      setLoading(false)
    }
  }

  const saveReceive = async (id: string) => {
    const qty = parseInt(receiveQty)
    if (isNaN(qty) || qty <= 0) return
    setLoading(true)
    try {
      await receiveStock(id, qty)
      cancelAll()
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Update failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-[#0f172a] border border-slate-800 p-4 rounded-2xl">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by SKU, product name or location..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 border-b border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">SKU / Product</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Available</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Total Stock</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Reserved</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Location</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition-all group">
                  <td className="px-6 py-4">
                    <div className="min-w-0">
                      <p className="text-xs font-mono font-bold text-blue-500 uppercase tracking-tight mb-0.5">{item.sku}</p>
                      <p className="text-sm font-semibold text-white truncate">{item.product_name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border',
                      item.stock_status === 'in_stock' && 'bg-emerald-600/10 text-emerald-500 border-emerald-600/20',
                      item.stock_status === 'low_stock' && 'bg-amber-600/10 text-amber-500 border-amber-600/20',
                      item.stock_status === 'out_of_stock' && 'bg-rose-600/10 text-rose-500 border-rose-600/20'
                    )}>
                      {item.stock_status === 'in_stock' && <CheckCircle2 className="w-3 h-3" />}
                      {item.stock_status === 'low_stock' && <AlertTriangle className="w-3 h-3" />}
                      {item.stock_status === 'out_of_stock' && <XCircle className="w-3 h-3" />}
                      {item.stock_status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={cn(
                      'text-sm font-bold',
                      item.available_quantity <= item.low_stock_threshold ? 'text-amber-500' : 'text-white'
                    )}>
                      {item.available_quantity}
                    </span>
                  </td>
                  {/* Total Stock — inline edit */}
                  <td className="px-6 py-4 text-right">
                    {editingId === item.id ? (
                      <div className="flex items-center justify-end gap-1">
                        <input
                          type="number"
                          min="0"
                          value={editQty}
                          onChange={e => setEditQty(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && saveEdit(item.id)}
                          className="w-20 bg-slate-900 border border-blue-500 rounded-lg px-2 py-1 text-sm text-white text-right focus:outline-none"
                          autoFocus
                        />
                        <button
                          onClick={() => saveEdit(item.id)}
                          disabled={loading}
                          className="p-1 text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-all disabled:opacity-50"
                        >
                          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                        </button>
                        <button onClick={cancelAll} className="p-1 text-slate-400 hover:bg-slate-700 rounded-lg transition-all">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : receiveId === item.id ? (
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-xs text-slate-500 mr-1">+</span>
                        <input
                          type="number"
                          min="1"
                          value={receiveQty}
                          onChange={e => setReceiveQty(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && saveReceive(item.id)}
                          placeholder="qty"
                          className="w-20 bg-slate-900 border border-violet-500 rounded-lg px-2 py-1 text-sm text-white text-right focus:outline-none"
                          autoFocus
                        />
                        <button
                          onClick={() => saveReceive(item.id)}
                          disabled={loading}
                          className="p-1 text-violet-500 hover:bg-violet-500/10 rounded-lg transition-all disabled:opacity-50"
                        >
                          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                        </button>
                        <button onClick={cancelAll} className="p-1 text-slate-400 hover:bg-slate-700 rounded-lg transition-all">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-sm text-slate-400">{item.quantity}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-slate-500">{item.reserved_quantity}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-xs font-medium text-slate-400 bg-slate-800 px-2 py-1 rounded-md">
                      {item.warehouse_location}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => startEdit(item)}
                        title="Set stock quantity"
                        className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => startReceive(item)}
                        title="Receive stock"
                        className="p-2 text-slate-400 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500 text-sm">
                    No inventory items match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
