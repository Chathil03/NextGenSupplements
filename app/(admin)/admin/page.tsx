import { createClient } from '@/utils/supabase/server'
import { Package, TrendingUp, Users, DollarSign, ArrowUpRight, ArrowDownRight, Truck } from 'lucide-react'
import { cn } from '@/lib/utils'

async function getStats() {
  const supabase = createClient()
  
  const [
    { count: productCount },
    { count: subscriberCount },
    { data: inventoryData }
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }),
    supabase.from('inventory').select('quantity')
  ])

  const totalInventory = inventoryData?.reduce((acc, curr) => acc + curr.quantity, 0) || 0

  return {
    products: productCount || 0,
    subscribers: subscriberCount || 0,
    inventory: totalInventory
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const statCards = [
    { name: 'Total Products', value: stats.products, icon: Package, change: '+2', trend: 'up', color: 'blue' },
    { name: 'Subscribers', value: stats.subscribers, icon: Users, change: '+12%', trend: 'up', color: 'emerald' },
    { name: 'Inventory Items', value: stats.inventory, icon: TrendingUp, change: '-4', trend: 'down', color: 'amber' },
    { name: 'Est. Revenue', value: '$12,450', icon: DollarSign, change: '+18%', trend: 'up', color: 'violet' },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-white tracking-tight">Overview</h1>
        <p className="text-slate-400">Welcome back, here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 hover:border-slate-600 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={cn(
                "p-3 rounded-xl transition-colors",
                stat.color === 'blue' && "bg-blue-600/10 text-blue-500",
                stat.color === 'emerald' && "bg-emerald-600/10 text-emerald-500",
                stat.color === 'amber' && "bg-amber-600/10 text-amber-500",
                stat.color === 'violet' && "bg-violet-600/10 text-violet-500",
              )}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full",
                stat.trend === 'up' ? "text-emerald-500 bg-emerald-500/10" : "text-rose-500 bg-rose-500/10"
              )}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <p className="text-slate-400 text-sm font-medium">{stat.name}</p>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#0f172a] border border-slate-800 rounded-2xl p-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 mb-4">
              <TrendingUp className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-lg font-semibold text-white">Sales Analytics coming soon</h3>
            <p className="text-slate-500 max-w-xs mx-auto mt-2">We are currently integrating Stripe data for real-time sales reporting.</p>
          </div>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Quick Actions</h3>
          <div className="grid gap-4">
            <button className="flex items-center gap-3 p-4 bg-slate-900/50 hover:bg-slate-800 transition-all rounded-xl border border-slate-800 group w-full text-left">
              <div className="w-10 h-10 rounded-lg bg-blue-600/10 text-blue-500 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Add Product</p>
                <p className="text-xs text-slate-500">List a new supplement</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 bg-slate-900/50 hover:bg-slate-800 transition-all rounded-xl border border-slate-800 group w-full text-left">
              <div className="w-10 h-10 rounded-lg bg-amber-600/10 text-amber-500 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Check Inventory</p>
                <p className="text-xs text-slate-500">View low stock items</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
