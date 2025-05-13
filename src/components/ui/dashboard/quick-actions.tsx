import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Search, Bot } from "lucide-react";

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Button className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Create New FR
        </Button>
        <Button variant="outline" className="w-full">
          <Upload className="h-4 w-4 mr-2" />
          Upload Documents
        </Button>
        <Button variant="outline" className="w-full">
          <Search className="h-4 w-4 mr-2" />
          Search Knowledge Base
        </Button>
        <Button variant="outline" className="w-full">
          <Bot className="h-4 w-4 mr-2" />
          Generate FR from Chat
        </Button>
      </CardContent>
    </Card>
  );
}