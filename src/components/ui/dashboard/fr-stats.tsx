import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCode2, AlertCircle, CheckCircle } from "lucide-react";

export function FRStats() {
  // Mock data - replace with real API calls
  const stats = {
    totalFRs: 89,
    pendingReview: 12,
    approved: 42,
    implemented: 35,
    overdue: 3
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Functional Requirements</CardTitle>
        <FileCode2 className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stats.totalFRs}</div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="flex flex-col items-center">
            <div className="text-sm font-medium">{stats.pendingReview}</div>
            <div className="text-xs text-muted-foreground flex items-center">
              <AlertCircle className="h-3 w-3 mr-1 text-yellow-500" />
              Pending
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-sm font-medium">{stats.approved}</div>
            <div className="text-xs text-muted-foreground">Approved</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-sm font-medium">{stats.implemented}</div>
            <div className="text-xs text-muted-foreground flex items-center">
              <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
              Done
            </div>
          </div>
        </div>
        {stats.overdue > 0 && (
          <div className="mt-2 text-xs text-red-500 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            {stats.overdue} FRs overdue
          </div>
        )}
      </CardContent>
    </Card>
  );
}