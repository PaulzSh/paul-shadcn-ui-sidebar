"use client";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { FRStats } from "./components/fr-stats";
import { KnowledgeStats } from "./components/knowledge-stats";
import { SystemHealth } from "./components/system-health";
import { RecentDocuments } from "./components/recent-documents";
import { FRStatusBoard } from "./components/fr-status-board";
import { QuickActions } from "./components/quick-actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chat } from "@/components/ui/chat";
import { useState } from "react";

export default function DashboardPage() {
  const sidebar = useStore(useSidebar, (x) => x);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  if (!sidebar) return null;

  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <TooltipProvider>
        <div className="space-y-4">
          {/* Stats Overview - 3 Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <FRStats />
            <KnowledgeStats />
            <SystemHealth />
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="fr" className="space-y-4">
            <TabsList>
              <TabsTrigger value="fr">Functional Requirements</TabsTrigger>
              <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
              <TabsTrigger value="chat">AI Assistant</TabsTrigger>
            </TabsList>
            
            {/* FR Tab */}
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
            
            {/* Knowledge Base Tab */}
            <TabsContent value="knowledge" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4">
                  <RecentDocuments />
                </div>
                <div className="col-span-3">
                  <QuickActions />
                </div>
              </div>
            </TabsContent>

            {/* AI Assistant Tab */}
            <TabsContent value="chat" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4">
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 h-[600px]">
                    <Chat
                      messages={messages}
                      input={input}
                      onInputChange={setInput}
                      onSend={(message) => {
                        setMessages([...messages, { 
                          id: Date.now().toString(), 
                          content: message, 
                          role: "user" 
                        }]);
                        setInput("");
                        setIsTyping(true);
                        // Simulate AI response
                        setTimeout(() => {
                          setMessages(prev => [
                            ...prev,
                            {
                              id: Date.now().toString(),
                              content: `I received your message: "${message}". As an AI assistant for your knowledge base, I can help you find documents or generate FRs. Try asking specific questions.`,
                              role: "assistant"
                            }
                          ]);
                          setIsTyping(false);
                        }, 1500);
                      }}
                      isTyping={isTyping}
                    />
                  </div>
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