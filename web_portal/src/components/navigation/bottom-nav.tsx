import { NAV_ITEMS, type NavItemId } from "@/lib/constants"
import { NavItem } from "./nav-item"

interface BottomNavProps {
  activeTab: NavItemId
  onTabChange: (id: NavItemId) => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-[#2A2A2A] bg-[#0D0D0D]/95 backdrop-blur-sm md:hidden">
      <div className="flex items-center justify-around">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.id}
            {...item}
            isActive={activeTab === item.id}
            onClick={onTabChange}
            variant="bottom"
          />
        ))}
      </div>
    </nav>
  )
}
