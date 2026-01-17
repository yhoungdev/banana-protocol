import type { ReactNode } from "react"
import { Header } from "./header"
import { BottomNav, SideNav } from "@/components/navigation"

interface LayoutProps {
  children: ReactNode
  contributed?: number
}

export function Layout({ children, contributed = 12 }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#0D0D0D]">
      <SideNav />
      <div className="flex flex-col flex-1">
        <Header contributed={contributed} />
        <main className="flex-1 overflow-auto pb-20 md:pb-6">{children}</main>
        <BottomNav />
      </div>
    </div>
  )
}
