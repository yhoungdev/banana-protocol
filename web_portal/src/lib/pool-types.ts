export interface Pool {
  id: string
  name: string
  peers: number
  storage: string
  health: number
  status: "healthy" | "degraded" | "offline"
}

export interface PoolStats {
  totalAggregated: string
  aggregatedChange: number
  activePeers: number
  peersOnline: number
}

export interface NearbyPool {
  id: string
  name: string
  latency: string
  peers: number
}

export interface PoolDetails {
  id: string
  name: string
  status: "active" | "inactive"
  isHealthy: boolean
  activePeers: number
  redundancy: string
  redundancyStatus: "safe" | "warning" | "critical"
  avgLatency: string
  latencyChange: number
  storageUsed: number
  storageTotal: number
  inviteCode: string
  inviteExpiry: string
}

export interface MeshMember {
  id: string
  name: string
  ip: string
  storage: string
  uptime: number
  status: "online" | "offline"
}
