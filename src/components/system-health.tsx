import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, Database, Cpu } from "lucide-react";

export function SystemHealth() {
  // Mock data
  const stats = {
    systemStatus: "Operational",
    databaseUsage: "64%",
    apiLatency: "128ms",
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">System Health</CardTitle>
        <Server className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="text-2xl font-bold text-green-600">{stats.systemStatus}</div>
            <p className="text-xs text-muted-foreground">All systems normal</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Database className="h-3 w-3 mr-1 text-blue-500" />
              <span>DB: {stats.databaseUsage}</span>
            </div>
            <div className="flex items-center text-sm">
              <Cpu className="h-3 w-3 mr-1 text-purple-500" />
              <span>API: {stats.apiLatency}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}