import { Search, User } from "lucide-react"

interface PoolsHeaderProps {
  onSearch?: () => void
  onProfile?: () => void
}

export function PoolsHeader({ onSearch, onProfile }: PoolsHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-[#2A2A2A] bg-[#0D0D0D]">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#E5FF00] flex items-center justify-center">
          <span className="text-black font-bold text-lg">⚡</span>
        </div>
        <h1 className="text-xl font-bold text-white">Pools</h1>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onSearch}
          className="w-9 h-9 rounded-full bg-[#1A1A1A] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          <Search size={18} />
        </button>
        <button
          type="button"
          onClick={onProfile}
          className="w-9 h-9 rounded-full bg-[#E5FF00] flex items-center justify-center"
        >
          <User size={18} className="text-black" />
        </button>
      </div>
    </header>
  )
}
