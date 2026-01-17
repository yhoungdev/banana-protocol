import { cn } from "@/lib/utils"

interface PeerAvatarProps {
  status: "online" | "offline" | "syncing"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function PeerAvatar({ status, size = "lg", className }: PeerAvatarProps) {
  const sizes = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-28 h-28",
  }

  const statusColors = {
    online: "bg-[#4ADE80]",
    offline: "bg-gray-500",
    syncing: "bg-[#E5FF00]",
  }

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "rounded-full bg-[#E5FF00] flex items-center justify-center",
          sizes[size]
        )}
      >
        <svg
          viewBox="0 0 100 100"
          className={cn(
            "text-[#0D0D0D]/60",
            size === "lg" ? "w-20 h-20" : size === "md" ? "w-10 h-10" : "w-6 h-6"
          )}
        >
          <circle cx="50" cy="30" r="4" fill="currentColor" />
          <circle cx="30" cy="50" r="4" fill="currentColor" />
          <circle cx="70" cy="50" r="4" fill="currentColor" />
          <circle cx="40" cy="70" r="4" fill="currentColor" />
          <circle cx="60" cy="70" r="4" fill="currentColor" />
          <circle cx="50" cy="50" r="4" fill="currentColor" />
          <line x1="50" y1="30" x2="30" y2="50" stroke="currentColor" strokeWidth="1.5" />
          <line x1="50" y1="30" x2="70" y2="50" stroke="currentColor" strokeWidth="1.5" />
          <line x1="30" y1="50" x2="50" y2="50" stroke="currentColor" strokeWidth="1.5" />
          <line x1="70" y1="50" x2="50" y2="50" stroke="currentColor" strokeWidth="1.5" />
          <line x1="50" y1="50" x2="40" y2="70" stroke="currentColor" strokeWidth="1.5" />
          <line x1="50" y1="50" x2="60" y2="70" stroke="currentColor" strokeWidth="1.5" />
          <line x1="40" y1="70" x2="60" y2="70" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      <span
        className={cn(
          "absolute bottom-1 right-1 rounded-full border-2 border-[#0D0D0D]",
          statusColors[status],
          size === "lg" ? "w-5 h-5" : size === "md" ? "w-4 h-4" : "w-3 h-3"
        )}
      />
    </div>
  )
}
