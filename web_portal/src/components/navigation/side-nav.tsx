import { cn } from "@/lib/utils"
import { LayoutGrid, FolderClosed, Users, Settings, type LucideIcon } from "lucide-react"
import type { NavItemId } from "@/lib/constants"

const iconMap: Record<string, LucideIcon> = {
  LayoutGrid,
  FolderClosed,
  Users,
  Settings,
}

interface SideNavItemProps {
  id: NavItemId
  label: string
  icon: string
  isActive: boolean
  onClick: (id: NavItemId) => void
}

function SideNavItem({ id, label, icon, isActive, onClick }: SideNavItemProps) {
  const Icon = iconMap[icon]

  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      className={cn(
        "flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all",
        isActive
          ? "bg-[#E5FF00]/10 text-[#E5FF00] border border-[#E5FF00]/30"
          : "text-gray-400 hover:bg-[#2A2A2A] hover:text-white"
      )}
    >
      <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
      <span className="font-medium">{label}</span>
    </button>
  )
}

interface SideNavProps {
  activeTab: NavItemId
  onTabChange: (id: NavItemId) => void
}

export function SideNav({ activeTab, onTabChange }: SideNavProps) {
  const items = [
    { id: "dashboard" as const, label: "Dashboard", icon: "LayoutGrid" },
    { id: "files" as const, label: "Files", icon: "FolderClosed" },
    { id: "peers" as const, label: "Peers", icon: "Users" },
    { id: "settings" as const, label: "Settings", icon: "Settings" },
  ]

  return (
    <aside className="hidden md:flex flex-col w-56 border-r border-[#2A2A2A] bg-[#0D0D0D] p-4">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 rounded-lg bg-[#E5FF00] flex items-center justify-center">
          <span className="text-black font-bold text-lg">🍌</span>
        </div>
        <div>
          <h1 className="text-white font-bold text-lg leading-tight">Banana</h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Storage Mesh v2.0</p>
        </div>
      </div>
      <nav className="flex flex-col gap-2">
        {items.map((item) => (
          <SideNavItem
            key={item.id}
            {...item}
            isActive={activeTab === item.id}
            onClick={onTabChange}
          />
        ))}
      </nav>
    </aside>
  )
}
