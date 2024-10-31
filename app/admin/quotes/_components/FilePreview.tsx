import { Button } from "@/components/ui/button"
import { FileText, Download, ExternalLink } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

interface FilePreviewProps {
  files: string[]
}

export function FilePreview({ files }: FilePreviewProps) {
  const [isDownloading, setIsDownloading] = useState<string | null>(null)
  const { toast } = useToast()

  const handleFileOpen = (fileUrl: string) => {
    window.open(fileUrl, '_blank', 'noopener,noreferrer')
  }

  const handleFileDownload = async (fileUrl: string) => {
    setIsDownloading(fileUrl)
    try {
      const response = await fetch(fileUrl)
      if (!response.ok) throw new Error('Download failed')
      
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = fileUrl.split('/').pop() || 'download'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
      
      toast({
        title: "File downloaded successfully",
        description: `${link.download} has been downloaded to your device.`,
      })
    } catch (error) {
      console.error('Error downloading file:', error)
      toast({
        title: "Download failed",
        description: "There was an error downloading the file. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(null)
    }
  }

  if (!files?.length) return null

  return (
    <div className="col-span-2">
      <h3 className="text-lg font-semibold mb-4">Attached Files</h3>
      <div className="grid grid-cols-1 gap-4">
        {files.map((file, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">{file.split('/').pop()}</span>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleFileOpen(file)}
                className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleFileDownload(file)}
                disabled={isDownloading === file}
                className="text-green-600 hover:text-green-800 hover:bg-green-100"
              >
                <Download className="h-4 w-4 mr-2" />
                {isDownloading === file ? 'Downloading...' : 'Download'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}