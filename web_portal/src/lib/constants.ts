export const BRAND_COLORS = {
  primary: "#E5FF00",
  background: "#0D0D0D",
  cardBg: "#1A1A1A",
  cardBorder: "#2A2A2A",
  success: "#4ADE80",
  warning: "#FACC15",
  danger: "#F87171",
  muted: "#6B7280",
} as const

export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutGrid", path: "/" },
  { id: "files", label: "Files", icon: "FolderClosed", path: "/files" },
  { id: "peers", label: "Peers", icon: "Users", path: "/peers" },
  { id: "settings", label: "Settings", icon: "Settings", path: "/settings" },
] as const

export type NavItemId = (typeof NAV_ITEMS)[number]["id"]
