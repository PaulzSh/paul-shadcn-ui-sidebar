"use client";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, FileText, Download, Trash2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

// Enhanced demo data with file paths
const initialDocuments = [
  {
    id: "DOC-001",
    name: "Technical Architecture.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploaded: "2023-10-12",
    category: "Technical",
    path: "/documents/tech-architecture.pdf"
  },
  {
    id: "DOC-002",
    name: "User Manual.docx",
    type: "Word",
    size: "1.7 MB",
    uploaded: "2023-10-08",
    category: "User Guides",
    path: "/documents/user-manual.docx"
  },
  {
    id: "DOC-003",
    name: "API Specifications.md",
    type: "Markdown",
    size: "45 KB",
    uploaded: "2023-10-05",
    category: "Technical",
    path: "/documents/api-specs.md"
  },
];

export function KnowledgeBase() {
  const [documents, setDocuments] = useState(initialDocuments);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (docId: string, docName: string) => {
    setIsDownloading(docId);
    // Simulate download delay
    setTimeout(() => {
      const doc = documents.find(d => d.id === docId);
      if (doc) {
        const link = document.createElement('a');
        link.href = doc.path;
        link.download = docName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "Download Started",
          description: `${docName} is being downloaded`,
        });
      }
      setIsDownloading(null);
    }, 1000);
  };

  const handleDelete = (docId: string) => {
    setIsDeleting(docId);
    // Simulate API call delay
    setTimeout(() => {
      setDocuments(documents.filter(doc => doc.id !== docId));
      setIsDeleting(null);
      toast({
        title: "Document Deleted",
        description: "The document has been removed from the knowledge base",
      });
    }, 800);
  };

  return (
    <div className="space-y-4">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search documents..." 
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-blue-500" />
                  {doc.name}
                </TableCell>
                <TableCell>{doc.type}</TableCell>
                <TableCell>{doc.size}</TableCell>
                <TableCell>{doc.category}</TableCell>
                <TableCell>{doc.uploaded}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDownload(doc.id, doc.name)}
                      disabled={isDownloading === doc.id}
                    >
                      {isDownloading === doc.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(doc.id)}
                      disabled={isDeleting === doc.id}
                    >
                      {isDeleting === doc.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}