import { cn } from "@/lib/utils"
import { ScrollText, Radio } from "lucide-react"

interface PeerActionsProps {
  onLogs?: () => void
  onPing?: () => void
}

export function PeerActions({ onLogs, onPing }: PeerActionsProps) {
  return (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={onLogs}
        className={cn(
          "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl",
          "bg-[#2A2A2A] text-white font-medium",
          "hover:bg-[#3A3A3A] transition-colors"
        )}
      >
        <ScrollText size={18} />
        <span>Logs</span>
      </button>
      <button
        type="button"
        onClick={onPing}
        className={cn(
          "flex-[2] flex items-center justify-center gap-2 py-3 px-4 rounded-xl",
          "bg-[#E5FF00] text-black font-medium",
          "hover:bg-[#D4EE00] transition-colors"
        )}
      >
        <Radio size={18} />
        <span>Ping Node</span>
      </button>
    </div>
  )
}
