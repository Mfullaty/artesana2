import { Button } from "@/components/ui/button";
import { FileText, Download, ExternalLink } from "lucide-react";

interface FilePreviewProps {
  files: string[];
}

export function FilePreview({ files }: FilePreviewProps) {
  const handleFileOpen = (filePath: string) => {
    const url = `/uploads/files/${encodeURIComponent(filePath)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleFileDownload = async (filePath: string) => {
    try {
      const url = `/uploads/files/${encodeURIComponent(filePath)}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filePath.split('/').pop() || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  if (!files?.length) return null;

  return (
    <div className="col-span-2">
      <h3 className="text-lg font-semibold mb-4">Attached Files</h3>
      <div className="grid grid-cols-1 gap-4">
        {files.map((file, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              <span className="text-sm">{file}</span>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleFileOpen(file)}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleFileDownload(file)}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}