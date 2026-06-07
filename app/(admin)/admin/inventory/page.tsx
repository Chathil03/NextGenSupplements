import { createClient } from '@/utils/supabase/server'
import { Truck, Search, AlertTriangle, CheckCircle2, XCircle, MoreVertical, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

export default async function AdminInventoryPage() {
  const supabase = createClient()
  
  // Use the view we created in schema_v2.sql
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

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight text-white mb-1">Inventory Control</h1>
          <p className="text-slate-400 text-sm">Monitor stock levels across all your products and warehouses.</p>
        </div>
        <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all font-semibold text-sm">
                <RefreshCw className="w-4 h-4" />
                Sync Updates
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-lg shadow-blue-500/20 font-semibold text-sm">
                Receive Stock
            </button>
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
            {inventory?.filter(i => i.stock_status === 'in_stock').length || 0}
            <span className="text-sm font-normal text-slate-500 ml-2">SKUs</span>
          </p>
        </div>
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm font-medium">Low Stock</p>
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-white">
            {inventory?.filter(i => i.stock_status === 'low_stock').length || 0}
            <span className="text-sm font-normal text-slate-500 ml-2">Alerts</span>
          </p>
        </div>
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm font-medium">Out of Stock</p>
            <XCircle className="w-5 h-5 text-rose-500" />
          </div>
          <p className="text-2xl font-bold text-white">
            {inventory?.filter(i => i.stock_status === 'out_of_stock').length || 0}
            <span className="text-sm font-normal text-slate-500 ml-2">Critical</span>
          </p>
        </div>
      </div>

      {/* Constraints & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-[#0f172a] border border-slate-800 p-4 rounded-2xl">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search by SKU, product name or location..."
            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 border-b border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">SKU / Product</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Available</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Total</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Reserved</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Location</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {inventory?.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition-all group">
                  <td className="px-6 py-4">
                    <div className="min-w-0">
                      <p className="text-xs font-mono font-bold text-blue-500 uppercase tracking-tight mb-0.5">{item.sku}</p>
                      <p className="text-sm font-semibold text-white truncate">{item.product_name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border",
                        item.stock_status === 'in_stock' && "bg-emerald-600/10 text-emerald-500 border-emerald-600/20",
                        item.stock_status === 'low_stock' && "bg-amber-600/10 text-amber-500 border-amber-600/20",
                        item.stock_status === 'out_of_stock' && "bg-rose-600/10 text-rose-500 border-rose-600/20"
                    )}>
                      {item.stock_status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={cn(
                        "text-sm font-bold",
                        item.available_quantity <= item.low_stock_threshold ? "text-amber-500" : "text-white"
                    )}>
                        {item.available_quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-slate-400">{item.quantity}</td>
                  <td className="px-6 py-4 text-right text-sm text-slate-500">{item.reserved_quantity}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-xs font-medium text-slate-400 bg-slate-800 px-2 py-1 rounded-md">
                        {item.warehouse_location}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all">
                        <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
