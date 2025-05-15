"use client";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, XCircle, CircleDashed } from "lucide-react";

export function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    pending: {
      icon: <Clock className="h-3 w-3" />,
      text: "Pending",
      variant: "secondary"
    },
    approved: {
      icon: <CheckCircle2 className="h-3 w-3" />,
      text: "Approved",
      variant: "default"
    },
    rejected: {
      icon: <XCircle className="h-3 w-3" />,
      text: "Rejected",
      variant: "destructive"
    },
    draft: {
      icon: <CircleDashed className="h-3 w-3" />,
      text: "Draft",
      variant: "outline"
    }
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      {config.icon}
      {config.text}
    </Badge>
  );
}