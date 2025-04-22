"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Pencil, Trash, Loader2, Plus, MoreHorizontal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import Image from "next/image";
import Pagination from "./Pagination";
import ConfirmationModal from "../ConfirmationModal";
import ProductForm from "./ProductForm";
import { Product } from "@/lib/generated/prisma";

interface DeleteState {
  isDeleting: boolean;
  type: "single" | "bulk" | null;
  slug?: string;
}

interface DeleteConfirmation {
  isOpen: boolean;
  productSlug: string | "bulk" | null;
}

export default function ProductsTab() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<Partial<Product>>({
    id: "",
    slug: "",
    name: "",
    description: "",
    origin: "",
    moisture: null,
    color: null,
    form: "",
    cultivation: "",
    cultivationType: null,
    purity: null,
    grades: null,
    admixture: null,
    defection: null,
    measurement: "",
    images: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [deleteState, setDeleteState] = useState<DeleteState>({
    isDeleting: false,
    type: null,
    slug: undefined,
  });
  const [deleteConfirmation, setDeleteConfirmation] =
    useState<DeleteConfirmation>({
      isOpen: false,
      productSlug: null,
    });
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    setIsPageLoading(true);
    try {
      const response = await fetch(
        `/api/products?page=${currentPage}&limit=${itemsPerPage}`
      );
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products. Please try again.");
    } finally {
      setIsPageLoading(false);
    }
  };

  const handleDelete = async (type: "single" | "bulk", slug?: string) => {
    setDeleteState({ isDeleting: true, type, slug });

    try {
      if (type === "single" && slug) {
        const response = await fetch(`/api/products/${slug}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete");
      } else {
        const response = await fetch("/api/products/bulk-delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productSlugs: selectedProducts }),
        });

        if (!response.ok) throw new Error("Failed to delete");
      }

      await fetchProducts();

      if (type === "bulk") {
        setSelectedProducts([]);
        setIsSelectionMode(false);
      }

      toast.success(
        type === "bulk"
          ? `${selectedProducts.length} products deleted successfully`
          : "Product deleted successfully"
      );
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error("Failed to delete. Please try again.");
    } finally {
      setDeleteState({ isDeleting: false, type: null, slug: undefined });
      setDeleteConfirmation({ isOpen: false, productSlug: null });
    }
  };

  const isItemLoading = (slug: string) =>
    deleteState.isDeleting &&
    deleteState.type === "single" &&
    deleteState.slug === slug;

  const handleEditProduct = (product: Product) => {
    setFormData(product);
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      id: "",
      slug: "",
      name: "",
      description: "",
      origin: "",
      moisture: null,
      color: null,
      form: "",
      cultivation: "",
      cultivationType: null,
      purity: null,
      grades: null,
      admixture: null,
      defection: null,
      measurement: "",
      images: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  const toggleProductSelection = (productSlug: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productSlug)
        ? prev.filter((slug) => slug !== productSlug)
        : [...prev, productSlug]
    );
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((product) => product.slug));
    }
  };

  const handleRowClick = (productSlug: string) => {
    if (!isSelectionMode) {
      router.push(`/admin/products/${productSlug}`);
    }
  };

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <CardTitle className="text-2xl font-bold">Products</CardTitle>
              <CardDescription>Manage your product catalog</CardDescription>
            </div>
            <div className="flex gap-2">
              {isSelectionMode ? (
                <>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setDeleteConfirmation({
                        isOpen: true,
                        productSlug: "bulk",
                      });
                    }}
                    disabled={
                      selectedProducts.length === 0 || deleteState.isDeleting
                    }
                  >
                    {deleteState.type === "bulk" && deleteState.isDeleting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash className="h-4 w-4" />
                    )}
                    <span className="ml-2">({selectedProducts.length})</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsSelectionMode(false);
                      setSelectedProducts([]);
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
              <Button
                onClick={() => {
                  resetForm();
                  setIsEditModalOpen(true);
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {isSelectionMode && (
                      <TableHead className="w-[50px]">
                        <Checkbox
                          checked={selectedProducts.length === products.length}
                          onCheckedChange={toggleSelectAll}
                        />
                      </TableHead>
                    )}
                    <TableHead>Name</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead className="w-1/3">Description</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isPageLoading ? (
                    Array.from({ length: itemsPerPage }).map((_, index) => (
                      <TableRow key={index}>
                        {isSelectionMode && (
                          <TableCell>
                            <Skeleton className="h-4 w-4" />
                          </TableCell>
                        )}
                        <TableCell>
                          <Skeleton className="h-4 w-[200px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-16 w-16 rounded" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[300px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[50px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-8 w-[100px]" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : products && products.length > 0 ? (
                    products.map((product) => (
                      <TableRow
                        key={product.slug}
                        onClick={() => handleRowClick(product.slug)}
                        className={
                          isSelectionMode
                            ? ""
                            : "cursor-pointer hover:bg-muted/50"
                        }
                      >
                        {isSelectionMode && (
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            <Checkbox
                              checked={selectedProducts.includes(product.slug)}
                              onCheckedChange={() =>
                                toggleProductSelection(product.slug)
                              }
                            />
                          </TableCell>
                        )}
                        <TableCell>{product.name}</TableCell>
                        <TableCell>
                          {product.images && product.images.length > 0 && (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              width={64}
                              height={64}
                              className="object-cover rounded"
                            />
                          )}
                        </TableCell>
                        <TableCell>
                          <div
                            className="line-clamp-2"
                            title={product.description}
                          >
                            {product.description}
                          </div>
                        </TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditProduct(product)}
                            disabled={isItemLoading(product.slug)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          {!isSelectionMode && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                setDeleteConfirmation({
                                  isOpen: true,
                                  productSlug: product.slug,
                                })
                              }
                              disabled={isItemLoading(product.slug)}
                            >
                              {isItemLoading(product.slug) ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash className="h-4 w-4" />
                              )}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={isSelectionMode ? 6 : 5}
                        className="text-center"
                      >
                        No products found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>

          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {formData.id ? "Edit Product" : "Add New Product"}
                </DialogTitle>
              </DialogHeader>
              <ProductForm
                initialData={formData.id ? (formData as Product) : undefined}
                isDialog={true}
                onSuccess={() => {
                  setIsEditModalOpen(false);
                  fetchProducts();
                }}
                onCancel={() => setIsEditModalOpen(false)}
              />
            </DialogContent>
          </Dialog>

          <ConfirmationModal
            isOpen={deleteConfirmation.isOpen}
            isDeleting={deleteState.isDeleting}
            onClose={() =>
              setDeleteConfirmation({ isOpen: false, productSlug: null })
            }
            onConfirm={() => {
              const type =
                deleteConfirmation.productSlug === "bulk" ? "bulk" : "single";
              const slug =
                deleteConfirmation.productSlug === "bulk"
                  ? undefined
                  : deleteConfirmation.productSlug || undefined;
              handleDelete(type, slug);
            }}
            title={
              deleteConfirmation.productSlug === "bulk"
                ? "Delete Selected Products"
                : "Delete Product"
            }
            description={
              deleteConfirmation.productSlug === "bulk"
                ? `Are you sure you want to delete ${selectedProducts.length} selected products? This action cannot be undone.`
                : "Are you sure you want to delete this product? This action cannot be undone."
            }
            confirmText={deleteState.isDeleting ? "Deleting..." : "Delete"}
            cancelText="Cancel"
          />
        </CardContent>
      </Card>
    </>
  );
}
