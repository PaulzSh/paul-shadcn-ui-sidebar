// Add this import at the top
import { Download } from "lucide-react";

// Add this function inside your component
const handleDownloadFR = (frId: string) => {
  // This assumes you have PDFs named like "FR-001.pdf" in your public/documents folder
  const link = document.createElement('a');
  link.href = `/documents/${frId}.pdf`;
  link.download = `${frId}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Update the actions column in your table to include the download button
<TableCell>
  <div className="flex space-x-2">
    <Button 
      variant="ghost" 
      size="sm"
      onClick={() => setViewingFr(fr)}
    >
      <Eye className="h-4 w-4" />
    </Button>
    <Button 
      variant="ghost" 
      size="sm"
      onClick={() => setEditingFr(fr)}
    >
      <FileEdit className="h-4 w-4" />
    </Button>
    {/* Add Download Button */}
    <Button 
      variant="ghost" 
      size="sm"
      onClick={() => handleDownloadFR(fr.id)}
      className="text-blue-600 hover:text-blue-700"
    >
      <Download className="h-4 w-4" />
    </Button>
    {fr.status === "pending" && (
      <>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-green-600 hover:text-green-700"
          onClick={() => handleApprove(fr.id)}
        >
          <CheckCircle2 className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-red-600 hover:text-red-700"
          onClick={() => handleReject(fr.id)}
        >
          <XCircle className="h-4 w-4" />
        </Button>
      </>
    )}
  </div>
</TableCell>