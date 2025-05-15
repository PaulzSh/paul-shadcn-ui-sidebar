"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, FileText, Download, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

// Demo data
const documents = [
  {
    id: "DOC-001",
    name: "Technical Architecture.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploaded: "2023-10-12",
    category: "Technical"
  },
  {
    id: "DOC-002",
    name: "User Manual.docx",
    type: "Word",
    size: "1.7 MB",
    uploaded: "2023-10-08",
    category: "User Guides"
  },
  {
    id: "DOC-003",
    name: "API Specifications.md",
    type: "Markdown",
    size: "45 KB",
    uploaded: "2023-10-05",
    category: "Technical"
  },
];

export function KnowledgeBase() {
  return (
    <div className="space-y-4">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search documents..." 
          className="pl-10"
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
            {documents.map((doc) => (
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
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
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