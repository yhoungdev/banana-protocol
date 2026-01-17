import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  action?: React.ReactNode
}

export function Input({ className, icon, action, ...props }: InputProps) {
  return (
    <div className="relative flex items-center">
      {icon && (
        <div className="absolute left-3 text-gray-500">{icon}</div>
      )}
      <input
        className={cn(
          "w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600",
          "focus:outline-none focus:border-[#E5FF00]/50 focus:ring-1 focus:ring-[#E5FF00]/20",
          "transition-colors",
          icon && "pl-10",
          action && "pr-20",
          className
        )}
        {...props}
      />
      {action && (
        <div className="absolute right-2">{action}</div>
      )}
    </div>
  )
}
