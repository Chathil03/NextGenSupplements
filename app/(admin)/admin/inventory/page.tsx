import { createClient } from '@/utils/supabase/server'
import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react'
import { InventoryTable } from '@/components/admin/InventoryTable'

export default async function AdminInventoryPage() {
  const supabase = createClient()

  const { data: inventory, error } = await supabase
    .from('inventory_status')
    .select('*')
    .order('stock_status', { ascending: false })

  if (error) {
    return (
      <div className="p-8 text-center bg-red-500/10 border border-red-500/20 rounded-2xl">
        <p className="text-red-400">Failed to load inventory: {error.message}</p>
      </div>
    )
  }

  const items = inventory ?? []

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Inventory Control</h1>
          <p className="text-slate-400 text-sm">Monitor and update stock levels across all products.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm font-medium">In Stock</p>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-white">
            {items.filter(i => i.stock_status === 'in_stock').length}
            <span className="text-sm font-normal text-slate-500 ml-2">SKUs</span>
          </p>
        </div>
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm font-medium">Low Stock</p>
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-white">
            {items.filter(i => i.stock_status === 'low_stock').length}
            <span className="text-sm font-normal text-slate-500 ml-2">Alerts</span>
          </p>
        </div>
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm font-medium">Out of Stock</p>
            <XCircle className="w-5 h-5 text-rose-500" />
          </div>
          <p className="text-2xl font-bold text-white">
            {items.filter(i => i.stock_status === 'out_of_stock').length}
            <span className="text-sm font-normal text-slate-500 ml-2">Critical</span>
          </p>
        </div>
      </div>

      <InventoryTable inventory={items} />
    </div>
  )
}
