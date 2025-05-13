import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Badge,
  BadgeDraft,
  BadgeApproved,
  BadgeInProgress,
  BadgeCompleted,
} from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function FRStatusBoard() {
  // Mock data - replace with real API calls
  const frStatus = {
    draft: 8,
    inReview: 12,
    approved: 15,
    inProgress: 10,
    completed: 44,
    completionRate: 72,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>FR Status Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col items-center">
            <BadgeDraft>{frStatus.draft}</BadgeDraft>
            <span className="text-xs mt-1">Draft</span>
          </div>
          <div className="flex flex-col items-center">
            <Badge variant="secondary">{frStatus.inReview}</Badge>
            <span className="text-xs mt-1">In Review</span>
          </div>
          <div className="flex flex-col items-center">
            <BadgeApproved>{frStatus.approved}</BadgeApproved>
            <span className="text-xs mt-1">Approved</span>
          </div>
          <div className="flex flex-col items-center">
            <BadgeCompleted>{frStatus.completed}</BadgeCompleted>
            <span className="text-xs mt-1">Completed</span>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Completion Rate</span>
            <span>{frStatus.completionRate}%</span>
          </div>
          <Progress value={frStatus.completionRate} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">High Priority</span>
            <Badge variant="destructive">3</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Due This Week</span>
            <Badge variant="warning">5</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Blocked</span>
            <Badge variant="outline">2</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}