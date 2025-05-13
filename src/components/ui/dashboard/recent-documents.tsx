import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RecentDocuments() {
  // Mock data - replace with real API calls
  const documents = [
    { id: 1, name: "Project_Requirements_v2.pdf", type: "PDF", size: "2.4 MB", uploaded: "2 hours ago" },
    { id: 2, name: "User_Manual.docx", type: "Word", size: "1.7 MB", uploaded: "1 day ago" },
    { id: 3, name: "API_Specification.md", type: "Markdown", size: "45 KB", uploaded: "2 days ago" },
    { id: 4, name: "Database_Schema.xlsx", type: "Excel", size: "3.1 MB", uploaded: "3 days ago" },
    { id: 5, name: "Meeting_Notes_2023.txt", type: "Text", size: "12 KB", uploaded: "1 week ago" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  {doc.name}
                </TableCell>
                <TableCell>{doc.type}</TableCell>
                <TableCell>{doc.size}</TableCell>
                <TableCell>{doc.uploaded}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}