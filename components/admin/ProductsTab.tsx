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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import {
  X,
  Upload,
  Pencil,
  Trash,
  Loader2,
  Plus,
  Check,
  MoreHorizontal,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import Image from "next/image";
import Pagination from "./Pagination";
import ConfirmationModal from "../ConfirmationModal";

export default function ProductsTab() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    origin: "",
    moisture: "",
    color: "",
    form: "",
    cultivation: "",
    cultivationType: "",
    purity: "",
    grades: "",
    measurement: "",
    inStock: "",
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    productId: string | null;
  }>({ isOpen: false, productId: null });
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImageFiles = Array.from(files).slice(0, 4 - imageFiles.length);
      setImageFiles((prev) => [...prev, ...newImageFiles]);

      const newPreviews = newImageFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    const newImageFiles = [...imageFiles];
    newImageFiles.splice(index, 1);
    setImageFiles(newImageFiles);

    const newPreviews = [...imagePreviews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formDataToSend.append(key, value.toString());
      }
    });

    imageFiles.forEach((file, index) => {
      formDataToSend.append(`image${index + 1}`, file);
    });

    try {
      const response = await fetch("/api/products", {
        method: formData.id ? "PUT" : "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        fetchProducts();
        resetForm();
        setIsEditModalOpen(false);
        toast.success(
          `Product ${formData.id ? "updated" : "created"} successfully.`
        );
      } else {
        throw new Error("Failed to save product");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error(
        `Failed to ${
          formData.id ? "update" : "create"
        } product. Please try again.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchProducts();
        toast.success("Product deleted successfully.");
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product. Please try again.");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
      setDeleteConfirmation({ isOpen: false, productId: null });
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) return;

    setIsBulkDeleting(true);
    try {
      const response = await fetch("/api/products/bulk-delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productIds: selectedProducts }),
      });

      if (response.ok) {
        const result = await response.json();
        fetchProducts();
        setSelectedProducts([]);
        setIsSelectionMode(false);
        toast.success(result.message);
      } else {
        throw new Error("Failed to delete products");
      }
    } catch (error) {
      console.error("Error deleting products:", error);
      toast.error("Failed to delete products. Please try again.");
    } finally {
      setIsBulkDeleting(false);
      setDeleteConfirmation({ isOpen: false, productId: null });
    }
  };

  const handleEditProduct = (product: any) => {
    setFormData(product);
    setImagePreviews(product.images || []);
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      description: "",
      origin: "",
      moisture: "",
      color: "",
      form: "",
      cultivation: "",
      cultivationType: "",
      purity: "",
      grades: "",
      measurement: "",
      inStock: "",
    });
    setImageFiles([]);
    setImagePreviews([]);
  };

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((product: any) => product.id));
    }
  };

  const handleRowClick = (productId: string) => {
    if (!isSelectionMode) {
      router.push(`/admin/products/${productId}`);
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
                        productId: "bulk",
                      });
                    }}
                    disabled={selectedProducts.length === 0 || isBulkDeleting}
                  >
                    {isBulkDeleting ? (
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
                    <TableHead>In Stock</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
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
                    products.map((product: any) => (
                      <TableRow
                        key={product.id}
                        onClick={() => handleRowClick(product.id)}
                        className={
                          isSelectionMode
                            ? ""
                            : "cursor-pointer hover:bg-muted/50"
                        }
                      >
                        {isSelectionMode && (
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            <Checkbox
                              checked={selectedProducts.includes(product.id)}
                              onCheckedChange={() =>
                                toggleProductSelection(product.id)
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
                        <TableCell>{product.inStock}</TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditProduct(product)}
                            disabled={loadingStates[product.id]}
                          >
                            {loadingStates[product.id] ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Pencil className="h-4 w-4" />
                            )}
                          </Button>
                          {!isSelectionMode && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                setDeleteConfirmation({
                                  isOpen: true,
                                  productId: product.id,
                                })
                              }
                              disabled={loadingStates[product.id]}
                            >
                              {loadingStates[product.id] ? (
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="origin">Origin</Label>
                    <Select
                      name="origin"
                      value={formData.origin}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, origin: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cameroon">Cameroon</SelectItem>
                        <SelectItem value="Egypt">Egypt</SelectItem>
                        <SelectItem value="Ghana">Ghana</SelectItem>
                        <SelectItem value="Nigeria">Nigeria</SelectItem>
                        <SelectItem value="Niger">Niger</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="moisture">Moisture</Label>
                    <Input
                      id="moisture"
                      name="moisture"
                      value={formData.moisture}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Form</Label>
                    <RadioGroup
                      name="form"
                      value={formData.form}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, form: value }))
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="single" id="form-single" />
                        <Label htmlFor="form-single">Single</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pieces" id="form-pieces" />
                        <Label htmlFor="form-pieces">Pieces</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="whole" id="form-whole" />
                        <Label htmlFor="form-whole">Whole</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cultivation">Cultivation</Label>
                    <Select
                      name="cultivation"
                      value={formData.cultivation}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, cultivation: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select cultivation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="organic">Organic</SelectItem>
                        <SelectItem value="conventional">
                          Conventional
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cultivationType">Cultivation Type</Label>
                    <Input
                      id="cultivationType"
                      name="cultivationType"
                      value={formData.cultivationType}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="purity">Purity</Label>
                    <Input
                      id="purity"
                      name="purity"
                      value={formData.purity}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grades">Grades</Label>
                    <Input
                      id="grades"
                      name="grades"
                      value={formData.grades}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="measurement">Measurement</Label>
                    <Select
                      name="measurement"
                      value={formData.measurement}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, measurement: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select measurement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ton">Ton</SelectItem>
                        <SelectItem value="metric-ton">Metric Ton</SelectItem>
                        <SelectItem value="kg">KG</SelectItem>
                        <SelectItem value="lb">lb</SelectItem>
                        <SelectItem value="grams">grams</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inStock">In Stock</Label>
                    <Input
                      id="inStock"
                      name="inStock"
                      type="number"
                      value={formData.inStock}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="images">Images (Max 4)</Label>
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-[120px]"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                    <p className="text-sm text-gray-500">
                      {imagePreviews.length}/4 images selected
                    </p>
                  </div>
                  <Input
                    id="images"
                    name="images"
                    type="file"
                    accept="image/*"
                    multiple
                    max="4"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                  />
                </div>

                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          width={100}
                          height={100}
                          className="object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {formData.id ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Plus className="h-4 w-4 mr-2" />
                  )}
                  {formData.id ? "Update Product" : "Add Product"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <ConfirmationModal
            isOpen={deleteConfirmation.isOpen}
            onClose={() =>
              setDeleteConfirmation({ isOpen: false, productId: null })
            }
            onConfirm={() => {
              if (deleteConfirmation.productId === "bulk") {
                handleBulkDelete();
              } else if (deleteConfirmation.productId) {
                handleDeleteProduct(deleteConfirmation.productId);
              }
            }}
            title={
              deleteConfirmation.productId === "bulk"
                ? "Delete Selected Products"
                : "Delete Product"
            }
            description={
              deleteConfirmation.productId === "bulk"
                ? `Are you sure you want to delete ${selectedProducts.length} selected products? This action cannot be undone.`
                : "Are you sure you want to delete this product? This action cannot be undone."
            }
            confirmText="Delete"
            cancelText="Cancel"
          />
        </CardContent>
      </Card>
    </>
  );
}
