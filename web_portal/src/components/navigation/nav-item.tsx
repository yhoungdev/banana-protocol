import { cn } from "@/lib/utils"
import { Link } from "@tanstack/react-router"
import {
  LayoutGrid,
  FolderClosed,
  Users,
  Settings,
  type LucideIcon,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  LayoutGrid,
  FolderClosed,
  Users,
  Settings,
}

interface NavItemProps {
  label: string
  icon: string
  path: string
  isActive: boolean
  variant?: "side" | "bottom"
}

export function NavItem({
  label,
  icon,
  path,
  isActive,
  variant = "bottom",
}: NavItemProps) {
  const Icon = iconMap[icon]

  if (variant === "side") {
    return (
      <Link
        to={path}
        className={cn(
          "flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all",
          isActive
            ? "bg-[#E5FF00]/10 text-[#E5FF00] border border-[#E5FF00]/30"
            : "text-gray-400 hover:bg-[#2A2A2A] hover:text-white"
        )}
      >
        <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
        <span className="font-medium">{label}</span>
      </Link>
    )
  }

  return (
    <Link
      to={path}
      className={cn(
        "flex flex-col items-center gap-1 py-2 px-4 transition-colors",
        isActive ? "text-[#E5FF00]" : "text-gray-500 hover:text-gray-300"
      )}
    >
      <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
      <span className="text-xs font-medium uppercase tracking-wider">
        {label}
      </span>
    </Link>
  )
}
