import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FolderClosed, Image, FileText, Lock } from "lucide-react"
import type { FileFragment } from "@/lib/types"
import { cn } from "@/lib/utils"

const fileIcons = {
  backup: FolderClosed,
  image: Image,
  document: FileText,
}

interface FileItemProps {
  file: FileFragment
}

export function FileItem({ file }: FileItemProps) {
  const Icon = fileIcons[file.type]
  const isComplete = file.fragments.current === file.fragments.total
  const isDegraded = file.status === "degraded"

  return (
    <Card
      className={cn(
        "flex items-center gap-3 p-3",
        isDegraded && "border-[#F87171]/30"
      )}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center",
          isDegraded ? "bg-[#F87171]/20" : "bg-[#E5FF00]/10"
        )}
      >
        <Icon size={20} className={isDegraded ? "text-[#F87171]" : "text-[#E5FF00]"} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{file.name}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <Badge
            variant={isComplete ? "success" : isDegraded ? "danger" : "warning"}
            className="text-[10px]"
          >
            {file.fragments.current}/{file.fragments.total} fragments
          </Badge>
          {file.encrypted && <Lock size={10} className="text-gray-500" />}
        </div>
      </div>
      <div className="text-right">
        {isDegraded ? (
          <span className="text-xs text-[#F87171] font-medium">Degraded</span>
        ) : (
          <span className="text-sm font-mono text-gray-400">{file.size}</span>
        )}
        <p className="text-[10px] text-gray-600">{file.timestamp}</p>
      </div>
    </Card>
  )
}

interface RecentFilesProps {
  files: FileFragment[]
  onViewAll?: () => void
}

export function RecentFiles({ files, onViewAll }: RecentFilesProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-white">Recent Bunches</h3>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs text-[#E5FF00] hover:underline"
        >
          View All
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {files.map((file) => (
          <FileItem key={file.id} file={file} />
        ))}
      </div>
    </div>
  )
}
