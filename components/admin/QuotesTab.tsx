"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Trash,
  Loader2,
  FileText,
  Image as ImageIcon,
  MoreHorizontal,
  X,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import Pagination from "./Pagination";
import ConfirmationModal from "../ConfirmationModal";
import { getQuotes, QuoteResponse } from "@/actions/quote";

export default function Component() {
  const router = useRouter();
  const { toast } = useToast();
  const [quotes, setQuotes] = useState<QuoteResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    quoteId: string | null;
  }>({ isOpen: false, quoteId: null });
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{
    url: string;
    type: string;
  } | null>(null);

  useEffect(() => {
    fetchQuotes();
  }, [currentPage]);

  const fetchQuotes = async () => {
    setIsLoading(true);
    try {
      const result = await getQuotes(currentPage, 10);
      if (result.success && result.data) {
        setQuotes(result.data.quotes);
        setTotalPages(result.data.pagination.totalPages);
      } else {
        throw new Error(result.error || "Failed to fetch quotes");
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
      toast({
        title: "Error",
        description: "Failed to fetch quotes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedQuotes.length === 0) return;

    setIsBulkDeleting(true);
    setIsDeleting(true);
    try {
      const response = await fetch('/api/quotes', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quoteIds: selectedQuotes }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete quotes');
      }

      const result = await response.json();

      await fetchQuotes();
      setSelectedQuotes([]);
      setIsSelectionMode(false);
      toast({
        title: "Success",
        description: `${result.deletedCount} quotes deleted successfully.`,
      });
    } catch (error) {
      console.error("Error deleting quotes:", error);
      toast({
        title: "Error",
        description: "Failed to delete quotes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsBulkDeleting(false);
      setDeleteConfirmation({ isOpen: false, quoteId: null });
      setIsDeleting(false);
    }
  };

  const toggleQuoteSelection = (quoteId: string) => {
    setSelectedQuotes((prev) =>
      prev.includes(quoteId)
        ? prev.filter((id) => id !== quoteId)
        : [...prev, quoteId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedQuotes.length === quotes.length) {
      setSelectedQuotes([]);
    } else {
      setSelectedQuotes(quotes.map((quote) => quote.id));
    }
  };

  const handleRowClick = (quoteId: string) => {
    if (!isSelectionMode) {
      router.push(`/admin/quotes/${quoteId}`);
    }
  };

  const isImageFile = (url: string) => {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  };

  const isPDFFile = (url: string) => {
    return /\.pdf$/i.test(url);
  };

  const renderFilePreview = (file: string) => {
    if (isImageFile(file)) {
      return (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedFile({ url: file, type: "image" });
          }}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
      );
    } else if (isPDFFile(file)) {
      return (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedFile({ url: file, type: "pdf" });
          }}
        >
          <FileText className="h-4 w-4" />
        </Button>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <CardTitle className="text-2xl font-bold">Quote Enquiries</CardTitle>
            <CardDescription>Manage incoming quote requests</CardDescription>
          </div>
          <div className="flex gap-2">
            {isSelectionMode ? (
              <>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setDeleteConfirmation({
                      isOpen: true,
                      quoteId: "bulk",
                    });
                  }}
                  disabled={selectedQuotes.length === 0 || isBulkDeleting}
                >
                  {isBulkDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash className="h-4 w-4" />
                  )}
                  <span className="ml-2">({selectedQuotes.length})</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsSelectionMode(false);
                    setSelectedQuotes([]);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                onClick={() => setIsSelectionMode(true)}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {isSelectionMode && (
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectedQuotes.length === quotes.length}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                )}
                <TableHead>Name</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Files</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? Array.from({ length: 10 }).map((_, index) => (
                    <TableRow key={index}>
                      {isSelectionMode && (
                        <TableCell>
                          <Skeleton className="h-4 w-4" />
                        </TableCell>
                      )}
                      <TableCell>
                        <Skeleton className="h-4 w-[150px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[100px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[80px]" />
                      </TableCell>
                    </TableRow>
                  ))
                : quotes.map((quote) => (
                    <TableRow 
                      key={quote.id} 
                      className={isSelectionMode ? "" : "cursor-pointer hover:bg-muted/50"}
                      onClick={() => handleRowClick(quote.id)}
                    >
                      {isSelectionMode && (
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={selectedQuotes.includes(quote.id)}
                            onCheckedChange={() =>
                              toggleQuoteSelection(quote.id)
                            }
                          />
                        </TableCell>
                      )}
                      <TableCell>{quote.fullName}</TableCell>
                      <TableCell>{quote.product}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {quote.files?.map((file, index) => (
                            <div key={index}>{renderFilePreview(file)}</div>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <ConfirmationModal
          isDeleting={isDeleting}
          isOpen={deleteConfirmation.isOpen}
          onClose={() =>
            setDeleteConfirmation({ isOpen: false, quoteId: null })
          }
          onConfirm={() => {
            if (deleteConfirmation.quoteId === "bulk") {
              handleBulkDelete();
            }
          }}
          title="Delete Selected Quotes"
          description={`Are you sure you want to delete ${selectedQuotes.length} selected quotes? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
        />

        <Dialog
          open={!!selectedFile}
          onOpenChange={() => setSelectedFile(null)}
        >
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>File Preview</DialogTitle>
            </DialogHeader>
            {selectedFile?.type === "image" ? (
              <div className="relative w-full h-[600px]">
                <Image
                  src={selectedFile.url}
                  alt="Preview"
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <iframe
                src={selectedFile?.url}
                className="w-full h-[600px]"
                title="PDF Preview"
              />
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
      <Toaster />
    </Card>
  );
}