import { Badge, BadgeProps } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Clock, CheckCircle2, CircleDashed, Loader2 } from "lucide-react"

export function BadgeDraft({ className, ...props }: BadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      <CircleDashed className="h-3 w-3" />
      <span>Draft</span>
    </Badge>
  )
}

export function BadgeInProgress({ className, ...props }: BadgeProps) {
  return (
    <Badge
      className={cn("flex items-center gap-1 bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/50 dark:text-amber-300", className)}
      {...props}
    >
      <Loader2 className="h-3 w-3 animate-spin" />
      <span>In Progress</span>
    </Badge>
  )
}

export function BadgeApproved({ className, ...props }: BadgeProps) {
  return (
    <Badge
      className={cn("flex items-center gap-1 bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/50 dark:text-blue-300", className)}
      {...props}
    >
      <CheckCircle2 className="h-3 w-3" />
      <span>Approved</span>
    </Badge>
  )
}

export function BadgeCompleted({ className, ...props }: BadgeProps) {
  return (
    <Badge
      className={cn("flex items-center gap-1 bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/50 dark:text-green-300", className)}
      {...props}
    >
      <CheckCircle2 className="h-3 w-3" />
      <span>Completed</span>
    </Badge>
  )
}

export function BadgePending({ className, ...props }: BadgeProps) {
  return (
    <Badge
      className={cn("flex items-center gap-1 bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900/50 dark:text-purple-300", className)}
      {...props}
    >
      <Clock className="h-3 w-3" />
      <span>Pending</span>
    </Badge>
  )
}