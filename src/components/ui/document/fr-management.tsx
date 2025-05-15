"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, FileEdit, CheckCircle2, XCircle, Eye } from "lucide-react";
import { StatusBadge } from "./status-badge";
import { Input } from "@/components/ui/input";

// Demo data
const frData = [
  {
    id: "FR-001",
    title: "User Authentication System",
    description: "Implement JWT based authentication",
    status: "pending",
    created: "2023-10-15",
    author: "John Doe"
  },
  {
    id: "FR-002",
    title: "Document Upload Feature",
    description: "Allow PDF, DOCX uploads up to 10MB",
    status: "approved",
    created: "2023-10-10",
    author: "Jane Smith"
  },
  {
    id: "FR-003",
    title: "Search Functionality",
    description: "Full-text search across documents",
    status: "rejected",
    created: "2023-10-05",
    author: "Mike Johnson"
  },
];

export function FRManagement() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search FRs..." 
            className="pl-10"
          />
        </div>
        <Button>
          <FileEdit className="h-4 w-4 mr-2" />
          Create New FR
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {frData.map((fr) => (
              <TableRow key={fr.id}>
                <TableCell className="font-medium">{fr.id}</TableCell>
                <TableCell>{fr.title}</TableCell>
                <TableCell className="text-muted-foreground">{fr.description}</TableCell>
                <TableCell>
                  <StatusBadge status={fr.status} />
                </TableCell>
                <TableCell>{fr.created}</TableCell>
                <TableCell>{fr.author}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <FileEdit className="h-4 w-4" />
                    </Button>
                    {fr.status === "pending" && (
                      <>
                        <Button variant="ghost" size="sm" className="text-green-600">
                          <CheckCircle2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
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