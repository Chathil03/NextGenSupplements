import { AdminSidebar } from '@/components/admin/Sidebar'
import { Bell, Search, User } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[#020817]">
      <AdminSidebar />
      
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 bg-[#020817]/80 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 max-w-xl w-full">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search products, orders..."
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full border-2 border-[#020817]" />
            </button>
            <div className="h-8 w-px bg-slate-800" />
            <button className="flex items-center gap-3 p-1.5 pr-3 hover:bg-slate-800 rounded-xl transition-all">
              <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
                <User className="w-5 h-5 text-slate-300" />
              </div>
              <span className="text-sm font-medium text-slate-300">Admin</span>
            </button>
          </div>
        </header>

        {/* Viewport content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
