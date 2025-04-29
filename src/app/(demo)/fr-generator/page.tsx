"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadCard } from "@/components/ui/fr-generator/upload-card";
import { InputFields } from "@/components/ui/fr-generator/input-fields";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function FRGeneratorPage() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    priority: "medium",
  });
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo purposes - create mock FR data
    const mockFRData = {
      projectName: formData.projectName || "Demo Project",
      description: formData.description || "Sample functional requirements",
      priority: formData.priority,
      generatedContent: `# Functional Requirements Document\n\n**Project:** ${formData.projectName || "Demo Project"}\n\n## Overview\n${formData.description || "Sample description"}\n\n## Requirements\n1. Sample requirement 1\n2. Sample requirement 2\n3. Sample requirement 3`,
      sourceDocuments: files.map(file => file.name)
    };

    // Store in sessionStorage for the draft page
    sessionStorage.setItem('frDraftData', JSON.stringify(mockFRData));
    
    // Navigate to draft page
    router.push("/fr-generator/draft");
  };


  return (
    <ContentLayout title="FR Generator">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>FR Generator</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mt-6">
        {/* Document Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <UploadCard files={files} setFiles={setFiles} />
          </CardContent>
        </Card>

        {/* FR Details Section */}
        <Card>
          <CardHeader>
            <CardTitle>FR Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputFields formData={formData} setFormData={setFormData} />
              
              <div className="flex justify-end gap-4 pt-4">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={files.length === 0 || !formData.projectName}
                >
                  Generate Draft
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}