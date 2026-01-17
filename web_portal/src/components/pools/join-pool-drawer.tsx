import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Wifi, LogIn } from "lucide-react"
import type { NearbyPool } from "@/lib/pool-types"

interface NearbyPoolItemProps {
  pool: NearbyPool
  onConnect: (pool: NearbyPool) => void
}

function NearbyPoolItem({ pool, onConnect }: NearbyPoolItemProps) {
  return (
    <Card className="flex items-center justify-between p-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#E5FF00]/10 flex items-center justify-center">
          <Wifi size={18} className="text-[#E5FF00]" />
        </div>
        <div>
          <p className="font-medium text-white">{pool.name}</p>
          <p className="text-xs text-gray-500">Latency: {pool.latency} • {pool.peers} Peers</p>
        </div>
      </div>
      <Button
        size="sm"
        onClick={() => onConnect(pool)}
        className="bg-[#E5FF00] hover:bg-[#D4EE00] text-black font-semibold text-xs h-8"
      >
        CONNECT
      </Button>
    </Card>
  )
}

interface JoinPoolDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  nearbyPools: NearbyPool[]
  onJoin: (inviteString: string) => void
  onConnectNearby: (pool: NearbyPool) => void
}

export function JoinPoolDrawer({
  open,
  onOpenChange,
  nearbyPools,
  onJoin,
  onConnectNearby,
}: JoinPoolDrawerProps) {
  const [inviteString, setInviteString] = useState("")

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setInviteString(text)
    } catch {
      console.error("Failed to read clipboard")
    }
  }

  const handleConfirm = () => {
    if (inviteString.trim()) {
      onJoin(inviteString)
      setInviteString("")
      onOpenChange(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="bg-[#1A1A1A] border-t border-[#2A2A2A] rounded-t-3xl max-h-[85vh] p-0"
      >
        <SheetHeader className="flex flex-row items-center justify-between p-4 pb-0">
          <SheetTitle className="text-xl font-semibold text-white">Join Pool</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 overflow-y-auto p-4">
          <div>
            <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-2">
              Invite String / MDNS
            </label>
            <Input
              placeholder="e.g. banana://pool-auth-x92..."
              value={inviteString}
              onChange={(e) => setInviteString(e.target.value)}
              action={
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handlePaste}
                  className="h-7 text-xs border-[#E5FF00] text-[#E5FF00] hover:bg-[#E5FF00]/10"
                >
                  PASTE
                </Button>
              }
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Wifi size={14} className="text-gray-500" />
              <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                Nearby Pools
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {nearbyPools.map((pool) => (
                <NearbyPoolItem key={pool.id} pool={pool} onConnect={onConnectNearby} />
              ))}
            </div>
          </div>

          <Button
            onClick={handleConfirm}
            disabled={!inviteString.trim()}
            className="w-full h-14 bg-[#E5FF00] hover:bg-[#D4EE00] text-black font-semibold text-base rounded-xl disabled:opacity-50"
          >
            <LogIn size={20} />
            Confirm Join
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
