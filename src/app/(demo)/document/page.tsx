"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FRManagement } from "./components/fr-management";
import { KnowledgeBase } from "./components/knowledge-base";
import { DocumentUpload } from "./components/document-upload";

export default function DocumentsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Document Management</h1>
      
      <Tabs defaultValue="fr" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="fr">Functional Requirements</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
        </TabsList>
        
        <TabsContent value="fr" className="mt-6">
          <FRManagement />
        </TabsContent>
        
        <TabsContent value="knowledge" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <KnowledgeBase />
            </div>
            <div>
              <DocumentUpload />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}