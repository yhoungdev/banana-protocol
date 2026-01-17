import { cn } from "@/lib/utils"
import { LayoutGrid, FolderClosed, Users, Settings, type LucideIcon } from "lucide-react"
import type { NavItemId } from "@/lib/constants"

const iconMap: Record<string, LucideIcon> = {
  LayoutGrid,
  FolderClosed,
  Users,
  Settings,
}

interface NavItemProps {
  id: NavItemId
  label: string
  icon: string
  isActive: boolean
  onClick: (id: NavItemId) => void
}

export function NavItem({ id, label, icon, isActive, onClick }: NavItemProps) {
  const Icon = iconMap[icon]

  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      className={cn(
        "flex flex-col items-center gap-1 py-2 px-4 transition-colors",
        isActive ? "text-[#E5FF00]" : "text-gray-500 hover:text-gray-300"
      )}
    >
      <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
      <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
    </button>
  )
}

interface BottomNavProps {
  activeTab: NavItemId
  onTabChange: (id: NavItemId) => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const items = [
    { id: "dashboard" as const, label: "Dashboard", icon: "LayoutGrid" },
    { id: "files" as const, label: "Files", icon: "FolderClosed" },
    { id: "peers" as const, label: "Peers", icon: "Users" },
    { id: "settings" as const, label: "Settings", icon: "Settings" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-[#2A2A2A] bg-[#0D0D0D]/95 backdrop-blur-sm md:hidden">
      <div className="flex items-center justify-around">
        {items.map((item) => (
          <NavItem
            key={item.id}
            {...item}
            isActive={activeTab === item.id}
            onClick={onTabChange}
          />
        ))}
      </div>
    </nav>
  )
}
