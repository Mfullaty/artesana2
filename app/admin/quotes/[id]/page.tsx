"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { ArrowLeft, Pencil, Loader2, Reply, Phone } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { QuoteDetailFormData, quoteDetailSchema } from "@/schemas/quotes";
import { getQuoteDetail, updateQuote } from "@/actions/quote";
import { FilePreview } from "../_components/FilePreview";
import { Skeleton } from "@/components/ui/skeleton";

const defaultValues: QuoteDetailFormData = {
  fullName: "",
  email: "",
  phone: null,
  companyName: null,
  website: null,
  needFor: "export",
  product: "",
  productType: "natural",
  cultivationType: [],
  processing: null,
  unit: "metric-ton",
  volume: "",
  purchaseType: "one-time",
  deliveryAddress: "",
  incoterm: null,
  deliveryDate: new Date(),
  deliveryFrequency: "one-time",
  additionalInfo: null,
  files: [],
};

export default function QuoteDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<QuoteDetailFormData>({
    resolver: zodResolver(quoteDetailSchema),
    defaultValues: async () => {
      const result = await getQuoteDetail(params.id);
      if (!result.success || !result.data) {
        toast({
          title: "Error",
          description: "Failed to load quote details. Please try again.",
          variant: "destructive",
        });
        return defaultValues;
      }

      const data = result.data;
      return {
        ...defaultValues,
        ...data,
        // Ensure nullable fields are handled correctly
        phone: data.phone ?? null,
        companyName: data.companyName ?? null,
        website: data.website ?? null,
        processing: data.processing ?? null,
        incoterm: data.incoterm ?? null,
        additionalInfo: data.additionalInfo ?? null,
        // Convert date string to Date object
        deliveryDate: new Date(data.deliveryDate),
        // Ensure arrays are initialized
        cultivationType: data.cultivationType ?? [],
        files: data.files ?? [],
      };
    },
  });

  const { isLoading } = form.formState;

  const onSubmit = async (data: QuoteDetailFormData) => {
    setIsSaving(true);
    try {
      const result = await updateQuote(params.id, data);
      if (!result.success) {
        throw new Error(result.error || "Failed to update quote");
      }

      toast({
        title: "Success",
        description: "Quote updated successfully.",
      });
      setIsEditing(false);
      form.reset(data);
    } catch (error) {
      console.error("Error updating quote:", error);
      toast({
        title: "Error",
        description: "Failed to update quote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 h-screen">
        <Skeleton className="h-10 w-32" />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Quotes
      </Button>
      <Card>
        <CardHeader>
          <div className="flex justify-between gap-2 flex-wrap">
            <div>
              <CardTitle>Quote Details</CardTitle>
              <CardDescription>View and edit quote information</CardDescription>
            </div>
            <div className="flex gap-2 items-center">
              <a
                className="bg-primary text-primary-foreground p-2 rounded-md hover:opacity-90"
                href={"tel:" + form.getValues("phone")}
              >
                <Phone className="h-4 w-4" />
              </a>

              <a
                className="bg-primary text-primary-foreground p-2 rounded-md hover:opacity-90"
                href={`mailto:` + form.getValues("email")}
              >
                <Reply className="h-4 w-4" />
              </a>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold mb-4">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value || ""}
                              disabled={!isEditing}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value || ""}
                              disabled={!isEditing}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value || ""}
                              disabled={!isEditing}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="needFor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Need For</FormLabel>
                          <Select
                            disabled={!isEditing}
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select purpose" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="import">Import</SelectItem>
                              <SelectItem value="export">Export</SelectItem>
                              <SelectItem value="import-export">
                                Import/Export
                              </SelectItem>
                              <SelectItem value="food-retail">
                                Food Retail
                              </SelectItem>
                              <SelectItem value="food-services">
                                Food Services
                              </SelectItem>
                              <SelectItem value="wholesale">
                                Wholesale
                              </SelectItem>
                              <SelectItem value="retail">Retail</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Product Information */}
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold mb-4">
                    Product Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="product"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="productType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Type</FormLabel>
                          <Select
                            disabled={!isEditing}
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="hulled">Hulled</SelectItem>
                              <SelectItem value="natural">Natural</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cultivationType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cultivation Type</FormLabel>
                          <div className="flex gap-4">
                            <Checkbox
                              checked={field.value.includes("organic")}
                              onCheckedChange={(checked) => {
                                const current = new Set(field.value);
                                if (checked) {
                                  current.add("organic");
                                } else {
                                  current.delete("organic");
                                }
                                field.onChange(Array.from(current));
                              }}
                              disabled={!isEditing}
                            />{" "}
                            Organic
                            <Checkbox
                              checked={field.value.includes("conventional")}
                              onCheckedChange={(checked) => {
                                const current = new Set(field.value);
                                if (checked) {
                                  current.add("conventional");
                                } else {
                                  current.delete("conventional");
                                }
                                field.onChange(Array.from(current));
                              }}
                              disabled={!isEditing}
                            />{" "}
                            Conventional
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="processing"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Processing</FormLabel>
                          <Select
                            disabled={!isEditing}
                            onValueChange={field.onChange}
                            value={field.value || undefined}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select processing" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="sun-dried">
                                Sun Dried
                              </SelectItem>
                              <SelectItem value="sortex-cleaned">
                                Sortex Cleaned
                              </SelectItem>
                              <SelectItem value="double-sortex-cleaned">
                                Double Sortex Cleaned
                              </SelectItem>
                              <SelectItem value="roasted">Roasted</SelectItem>
                              <SelectItem value="steam-sterilised">
                                Steam Sterilised
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Quantity Information */}
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold mb-4">
                    Quantity Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="volume"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Volume</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="unit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unit</FormLabel>
                          <Select
                            disabled={!isEditing}
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select unit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="kilogram">Kilogram</SelectItem>
                              <SelectItem value="ton">Ton</SelectItem>
                              <SelectItem value="metric-ton">
                                Metric Ton
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="purchaseType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Purchase Type</FormLabel>
                          <Select
                            disabled={!isEditing}
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select purchase type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="annual">Annual</SelectItem>
                              <SelectItem value="one-time">One Time</SelectItem>
                              <SelectItem value="not-sure">Not Sure</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold mb-4">
                    Delivery Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="deliveryAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Delivery Address</FormLabel>
                          <FormControl>
                            <Textarea {...field} disabled={!isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="incoterm"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Incoterm</FormLabel>
                          <Select
                            disabled={!isEditing}
                            onValueChange={field.onChange}
                            value={field.value || undefined}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select incoterm" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="exw">EXW</SelectItem>
                              <SelectItem value="fob">FOB</SelectItem>
                              <SelectItem value="cif">CIF</SelectItem>
                              <SelectItem value="ddp">DDP</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="deliveryDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Delivery Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                  disabled={!isEditing}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={!isEditing}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="deliveryFrequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Delivery Frequency</FormLabel>
                          <Select
                            disabled={!isEditing}
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="quarterly">
                                Quarterly
                              </SelectItem>
                              <SelectItem value="annually">Annually</SelectItem>
                              <SelectItem value="one-time">One Time</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Additional Information */}
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold mb-4">
                    Additional Information
                  </h3>
                  <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            value={field.value || ""}
                            disabled={!isEditing}
                            className="min-h-[100px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* File Preview Component */}
                <FilePreview files={form.getValues("files") || []} />
              </div>

              {isEditing ? (
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      form.reset();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Save Changes
                  </Button>
                </div>
              ) : (
                <Button type="button" onClick={() => setIsEditing(true)}>
                  <Pencil className="mr-2 h-4 w-4" /> Edit Quote
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
