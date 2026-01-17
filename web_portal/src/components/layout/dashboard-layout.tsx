import type { ReactNode } from "react"
import { BottomNav, SideNav } from "@/components/navigation"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#0D0D0D]">
      <SideNav />
      <div className="flex flex-col flex-1">
        <main className="flex-1 overflow-auto pb-20 md:pb-6">{children}</main>
        <BottomNav />
      </div>
    </div>
  )
}
