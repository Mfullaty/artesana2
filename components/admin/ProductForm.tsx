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
import { X, Upload, Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { Product } from "@/lib/generated/prisma";
import { slugify } from "@/lib/utils";

interface ProductFormProps {
  initialData?: Product;
  isDialog?: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
  title?: string;
  description?: string;
}

export default function ProductForm({
  initialData,
  isDialog = true,
  onSuccess,
  onCancel,
  title = "Edit Product",
  description = "Update product information",
}: ProductFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    id: initialData?.id || "",
    slug: initialData?.slug || "",
    name: initialData?.name || "",
    description: initialData?.description || "",
    origin: initialData?.origin || "",
    moisture: initialData?.moisture || "",
    color: initialData?.color || "",
    form: initialData?.form || "",
    cultivation: initialData?.cultivation || "",
    cultivationType: initialData?.cultivationType || "",
    purity: initialData?.purity || "",
    grades: initialData?.grades || "",
    admixture: initialData?.admixture || "",
    defection: initialData?.defection || "",
    measurement: initialData?.measurement || "",
  });

  // Auto-generate slug from name when name changes
  useEffect(() => {
    if (formData.name) {
      setFormData((prev) => ({
        ...prev,
        slug: slugify({ text: formData.name }),
      }));
    }
  }, [formData.name]);

  const [imagePreviews, setImagePreviews] = useState<string[]>(
    initialData?.images || []
  );
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const resetForm = () => {
    setFormData({
      id: "",
      slug: "",
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
      admixture: "",
      defection: "",
      measurement: "",
    });
    setImageFiles([]);
    setImagePreviews([]);
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
        const result = await response.json();
        // If the server modified the slug, update the form data
        if (result.slug && result.slug !== formData.slug) {
          setFormData((prev) => ({ ...prev, slug: result.slug }));
          toast.info(
            `Product slug was adjusted to ensure uniqueness: ${result.slug}`
          );
        }

        if (isDialog) {
          if (onSuccess) {
            onSuccess();
          }
        } else {
          router.refresh();
          router.push(`/admin/products/${result.slug}`);
        }

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

  const formContent = (
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
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            required
            disabled
            className="bg-gray-100"
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
          <Label htmlFor="admixture">Admixture</Label>
          <Input
            id="admixture"
            name="admixture"
            value={formData.admixture}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="defection">Defection</Label>
          <Input
            id="defection"
            name="defection"
            value={formData.defection}
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
              <SelectItem value="conventional">Conventional</SelectItem>
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

      <div className="flex justify-end space-x-2">
        {isDialog && onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          <Check className="h-4 w-4 mr-2" />
          {formData.id ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </form>
  );

  if (isDialog) {
    return formContent;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{formContent}</CardContent>
    </Card>
  );
}
