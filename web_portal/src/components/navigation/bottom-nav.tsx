import { NAV_ITEMS } from "@/lib/constants"
import { useRouterState } from "@tanstack/react-router"
import { NavItem } from "./nav-item"

export function BottomNav() {
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-[#2A2A2A] bg-[#0D0D0D]/95 backdrop-blur-sm md:hidden">
      <div className="flex items-center justify-around">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.id}
            {...item}
            isActive={currentPath === item.path}
            variant="bottom"
          />
        ))}
      </div>
    </nav>
  )
}
