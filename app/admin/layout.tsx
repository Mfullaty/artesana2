import { ReactNode } from 'react'
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/admin/Sidebar'
import { authOptions } from '../api/auth/[...nextauth]/auth'


export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}