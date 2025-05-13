"use client";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { KnowledgeStats } from "./components/knowledge-stats";
import { FRStats } from "./components/fr-stats";
import { RecentDocuments } from "./components/recent-documents";
import { FRStatusBoard } from "./components/fr-status-board";
import { QuickActions } from "./components/quick-actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
  const sidebar = useStore(useSidebar, (x) => x);
  
  if (!sidebar) return null;

  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <TooltipProvider>
        <div className="space-y-4">
          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KnowledgeStats />
            <FRStats />
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="knowledge" className="space-y-4">
            <TabsList>
              <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
              <TabsTrigger value="fr">Functional Requirements</TabsTrigger>
              <TabsTrigger value="chat">AI Assistant</TabsTrigger>
            </TabsList>
            
            <TabsContent value="knowledge" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4">
                  <RecentDocuments />
                </div>
                <div className="col-span-3">
                  {/* Knowledge base health metrics */}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="fr" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4">
                  <FRStatusBoard />
                </div>
                <div className="col-span-3">
                  <QuickActions />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </TooltipProvider>
    </ContentLayout>
  );
}