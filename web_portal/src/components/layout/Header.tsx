import { Badge } from "@/components/ui/badge"

interface HeaderProps {
  contributed: number
}

export function Header({ contributed }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-[#2A2A2A] bg-[#0D0D0D] md:px-6">
      <div className="flex items-center gap-3 md:hidden">
        <div className="w-9 h-9 rounded-lg bg-[#E5FF00] flex items-center justify-center">
          <span className="text-black font-bold">🍌</span>
        </div>
        <div>
          <h1 className="text-white font-bold leading-tight">Banana Protocol</h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Storage Mesh v2.0</p>
        </div>
      </div>
      <div className="hidden md:block">
        <h2 className="text-lg font-semibold text-white">Dashboard</h2>
      </div>
      <Badge variant="warning" className="text-xs">
        {contributed}GB Contributed
      </Badge>
    </header>
  )
}
