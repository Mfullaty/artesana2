import { ReactNode } from 'react'
import { Sidebar } from '@/components/admin/Sidebar'
import { Toaster } from 'sonner'


export default async function AdminLayout({ children }: { children: ReactNode }) {

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        {children}
      </main>
      <Toaster richColors duration={3000} />
    </div>
  )
}