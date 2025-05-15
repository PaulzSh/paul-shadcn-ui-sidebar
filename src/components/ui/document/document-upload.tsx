"use client";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileUp, Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "@/components/ui/use-toast";

export function DocumentUpload({ onUploadSuccess }: { onUploadSuccess?: () => void }) {
  const [files, setFiles] = useState<Array<{ file: File, preview: string }>>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    })));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/markdown': ['.md'],
      'text/plain': ['.txt']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const handleUpload = () => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    
    // Simulate API upload
    setTimeout(() => {
      setIsUploading(false);
      setFiles([]);
      toast({
        title: "Upload Successful",
        description: `${files.length} document(s) have been added to the knowledge base`,
      });
      if (onUploadSuccess) onUploadSuccess();
    }, 2000);
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    URL.revokeObjectURL(newFiles[index].preview);
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <div className="border rounded-lg p-6 space-y-4">
      <h3 className="font-medium text-lg">Upload Documents</h3>
      
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {isDragActive ? 
              "Drop the files here" : 
              "Drag & drop files here, or click to select files"
            }
          </p>
          <p className="text-xs text-muted-foreground">
            PDF, DOC, DOCX, MD, TXT (Max 10MB)
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Selected Files:</h4>
          <ul className="space-y-2">
            {files.map((fileWrapper, index) => (
              <li key={index} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                <div className="flex items-center space-x-2">
                  <span className="truncate max-w-xs">{fileWrapper.file.name}</span>
                  <span className="text-muted-foreground text-xs">
                    {(fileWrapper.file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-red-600 hover:text-red-700"
                  onClick={() => removeFile(index)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
          <Button 
            onClick={handleUpload} 
            className="w-full mt-4"
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload Documents
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}