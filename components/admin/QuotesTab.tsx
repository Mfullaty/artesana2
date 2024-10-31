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
  Eye,
  FileText,
  Image as ImageIcon,
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
  DialogTrigger,
} from "@/components/ui/dialog";
import Pagination from "./Pagination";
import ConfirmationModal from "../ConfirmationModal";
import { deleteQuote, getQuotes, QuoteResponse } from "@/actions/quote";

export default function QuotesTab() {
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
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
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

  const handleDeleteQuote = async (id: string) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
    try {
      const result = await deleteQuote(id);
      if (result.success) {
        await fetchQuotes();
        toast({
          title: "Success",
          description: "Quote deleted successfully.",
        });
      } else {
        throw new Error(result.error || "Failed to delete quote");
      }
    } catch (error) {
      console.error("Error deleting quote:", error);
      toast({
        title: "Error",
        description: "Failed to delete quote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
      setDeleteConfirmation({ isOpen: false, quoteId: null });
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
          onClick={() => setSelectedFile({ url: file, type: "image" })}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
      );
    } else if (isPDFFile(file)) {
      return (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSelectedFile({ url: file, type: "pdf" })}
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
        <CardTitle className="text-2xl font-bold">Quote Enquiries</CardTitle>
        <CardDescription>Manage incoming quote requests</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Files</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? Array.from({ length: 10 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="h-4 w-[150px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[100px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[80px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[80px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[100px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[100px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-[100px]" />
                      </TableCell>
                    </TableRow>
                  ))
                : quotes.map((quote) => (
                    <TableRow key={quote.id} className="hover:bg-gray-100">
                      <TableCell>{quote.fullName}</TableCell>
                      <TableCell>{quote.product}</TableCell>
                      <TableCell>{`${quote.volume} ${quote.unit}`}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {quote.files?.map((file, index) => (
                            <div key={index}>{renderFilePreview(file)}</div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(quote.deliveryDate)}</TableCell>
                      <TableCell>{formatDate(quote.createdAt)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            router.push(`/admin/quotes/${quote.id}`)
                          }
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setDeleteConfirmation({
                              isOpen: true,
                              quoteId: quote.id,
                            })
                          }
                          disabled={loadingStates[quote.id]}
                        >
                          {loadingStates[quote.id] ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash className="h-4 w-4" />
                          )}
                        </Button>
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
          isOpen={deleteConfirmation.isOpen}
          onClose={() =>
            setDeleteConfirmation({ isOpen: false, quoteId: null })
          }
          onConfirm={() =>
            deleteConfirmation.quoteId &&
            handleDeleteQuote(deleteConfirmation.quoteId)
          }
          title="Delete Quote"
          description="Are you sure you want to delete this quote? This action cannot be undone."
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
