import type { ReactNode } from "react"
import { useState } from "react"
import { useNavigate, useLocation } from "@tanstack/react-router"
import { BottomNav } from "@/components/navigation"
import { SideNav } from "@/components/navigation"
import type { NavItemId } from "@/lib/constants"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const getActiveTab = (): NavItemId => {
    const path = location.pathname
    if (path === "/" || path.startsWith("/pools")) return "dashboard"
    if (path.startsWith("/files")) return "files"
    if (path.startsWith("/peers")) return "peers"
    if (path.startsWith("/settings")) return "settings"
    return "dashboard"
  }

  const [activeTab, setActiveTab] = useState<NavItemId>(getActiveTab())

  const handleTabChange = (id: NavItemId) => {
    setActiveTab(id)
    switch (id) {
      case "dashboard":
        navigate({ to: "/" })
        break
      case "files":
        navigate({ to: "/files" })
        break
      case "peers":
        navigate({ to: "/peers" })
        break
      case "settings":
        navigate({ to: "/settings" })
        break
    }
  }

  return (
    <div className="flex min-h-screen bg-[#0D0D0D]">
      <SideNav activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="flex flex-col flex-1">
        <main className="flex-1 overflow-auto pb-20 md:pb-6">{children}</main>
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </div>
  )
}
