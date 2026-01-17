import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { FolderClosed, FileText, Shield } from "lucide-react"
import type { PeerFile } from "@/lib/peer-data"

const iconMap = {
  data: FolderClosed,
  metadata: FileText,
  system: Shield,
}

const iconColors = {
  data: "bg-[#E5FF00]/20 text-[#E5FF00]",
  metadata: "bg-[#E5FF00]/20 text-[#E5FF00]",
  system: "bg-[#E5FF00]/20 text-[#E5FF00]",
}

interface PeerFileItemProps {
  file: PeerFile
}

export function PeerFileItem({ file }: PeerFileItemProps) {
  const Icon = iconMap[file.icon]

  const statusStyles = {
    secure: "text-[#4ADE80]",
    syncing: "text-[#E5FF00]",
    pending: "text-gray-400",
  }

  const statusLabels = {
    secure: "SECURE",
    syncing: "SYNCING",
    pending: "PENDING",
  }

  return (
    <Card className="flex items-center gap-3 p-3">
      <div
        className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center",
          iconColors[file.icon]
        )}
      >
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{file.name}</p>
        <p className="text-[10px] text-gray-500">
          Size: {file.size} • Type: {file.type}
        </p>
      </div>
      <div className="text-right">
        <span className={cn("text-[10px] font-medium", statusStyles[file.status])}>
          {statusLabels[file.status]}
        </span>
        <p className="text-[10px] text-gray-600">{file.version}</p>
      </div>
    </Card>
  )
}

interface PeerFilesListProps {
  files: PeerFile[]
}

export function PeerFilesList({ files }: PeerFilesListProps) {
  return (
    <div className="flex flex-col gap-2">
      {files.map((file) => (
        <PeerFileItem key={file.id} file={file} />
      ))}
    </div>
  )
}
