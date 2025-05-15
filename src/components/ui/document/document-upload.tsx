"use client";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileUp } from "lucide-react";
import { useDropzone } from "react-dropzone";

export function DocumentUpload() {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
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
      'text/markdown': ['.md']
    }
  });

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      setFiles([]);
      alert('Files uploaded successfully!');
    }, 2000);
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
            PDF, DOC, DOCX, MD (Max 10MB)
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Selected Files:</h4>
          <ul className="space-y-2">
            {files.map((fileWrapper, index) => (
              <li key={index} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                <span className="truncate">{fileWrapper.file.name}</span>
                <span className="text-muted-foreground">
                  {(fileWrapper.file.size / 1024 / 1024).toFixed(2)} MB
                </span>
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
                <FileUp className="h-4 w-4 mr-2 animate-pulse" />
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