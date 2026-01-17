import { Button } from "@/components/ui/button"
import { PlusCircle, Users } from "lucide-react"

interface PoolActionsProps {
  onCreatePool: () => void
  onJoinPool: () => void
}

export function PoolActions({ onCreatePool, onJoinPool }: PoolActionsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        variant="outline"
        onClick={onCreatePool}
        className="h-11 bg-transparent border-[#2A2A2A] hover:bg-[#2A2A2A] text-white"
      >
        <PlusCircle size={18} />
        Create Pool
      </Button>
      <Button
        onClick={onJoinPool}
        className="h-11 bg-[#E5FF00] hover:bg-[#D4EE00] text-black font-semibold"
      >
        <Users size={18} />
        Join Pool
      </Button>
    </div>
  )
}
