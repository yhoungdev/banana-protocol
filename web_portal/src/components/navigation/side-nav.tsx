import { NAV_ITEMS, type NavItemId } from "@/lib/constants"
import { NavItem } from "./nav-item"

interface SideNavProps {
  activeTab: NavItemId
  onTabChange: (id: NavItemId) => void
}

export function SideNav({ activeTab, onTabChange }: SideNavProps) {

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
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.id}
            {...item}
            isActive={activeTab === item.id}
            onClick={onTabChange}
            variant="side"
          />
        ))}
      </nav>
    </aside>
  )
}
