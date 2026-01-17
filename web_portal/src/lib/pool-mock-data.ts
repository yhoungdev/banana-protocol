import type { Pool, PoolStats, NearbyPool, PoolDetails, MeshMember } from "./pool-types"

export const mockPoolStats: PoolStats = {
  totalAggregated: "162.2 TB",
  aggregatedChange: 5.4,
  activePeers: 32,
  peersOnline: 2,
}

export const mockPools: Pool[] = [
  {
    id: "palm_8009_alpha",
    name: "Home Mesh",
    peers: 8,
    storage: "12.4 TB",
    health: 98,
    status: "healthy",
  },
  {
    id: "palm_2103_beta",
    name: "Office Network",
    peers: 12,
    storage: "45.2 TB",
    health: 95,
    status: "healthy",
  },
  {
    id: "palm_5507_gamma",
    name: "Backup Cluster",
    peers: 5,
    storage: "8.7 TB",
    health: 72,
    status: "degraded",
  },
]

export const mockNearbyPools: NearbyPool[] = [
  { id: "nearby-001", name: "Local-Mesh-01", latency: "12ms", peers: 4 },
  { id: "nearby-002", name: "Banana-Shared-HQ", latency: "8ms", peers: 12 },
]

export const mockPoolDetails: PoolDetails = {
  id: "palm_8009_alpha",
  name: "Home Mesh",
  status: "active",
  isHealthy: true,
  activePeers: 5,
  redundancy: "3-of-5",
  redundancyStatus: "safe",
  avgLatency: "14ms",
  latencyChange: -2,
  storageUsed: 1.2,
  storageTotal: 2.0,
  inviteCode: "BANANA-7721-X",
  inviteExpiry: "04:59",
}

export const mockMeshMembers: MeshMember[] = [
  { id: "member-001", name: "Node-Alpha-01", ip: "192.168.1.44", storage: "400 GB", uptime: 99.9, status: "online" },
  { id: "member-002", name: "Node-Delta-09", ip: "192.168.1.102", storage: "250 GB", uptime: 98.2, status: "online" },
  { id: "member-003", name: "Node-Zeta-14", ip: "192.168.1.201", storage: "550 GB", uptime: 0, status: "offline" },
]
