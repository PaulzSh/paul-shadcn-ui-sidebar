import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, PieChart, TrendingUp } from "lucide-react";

export function KnowledgeStats() {
  // Mock data - replace with real API calls
  const stats = {
    totalDocuments: 1243,
    last7Days: 24,
    storageUsage: "78%",
    weeklyQueries: 342
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Knowledge Base</CardTitle>
        <FileText className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stats.totalDocuments}</div>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
          <span>+{stats.last7Days} last 7 days</span>
          <TrendingUp className="h-3 w-3 text-green-500" />
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Storage</span>
            <span>{stats.storageUsage}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: stats.storageUsage }}
            ></div>
          </div>
        </div>
        <div className="flex items-center mt-2 text-xs text-muted-foreground">
          <PieChart className="h-3 w-3 mr-1" />
          <span>{stats.weeklyQueries} queries this week</span>
        </div>
      </CardContent>
    </Card>
  );
}