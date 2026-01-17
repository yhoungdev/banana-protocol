import type { ReactNode } from "react"
import { useState } from "react"
import { Header } from "./header"
import { BottomNav, SideNav } from "@/components/navigation"
import type { NavItemId } from "@/lib/constants"

interface LayoutProps {
  children: ReactNode
  contributed?: number
}

export function Layout({ children, contributed = 12 }: LayoutProps) {
  const [activeTab, setActiveTab] = useState<NavItemId>("dashboard")

  return (
    <div className="flex min-h-screen bg-[#0D0D0D]">
      <SideNav activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex flex-col flex-1">
        <Header contributed={contributed} />
        <main className="flex-1 overflow-auto pb-20 md:pb-6">{children}</main>
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  )
}
