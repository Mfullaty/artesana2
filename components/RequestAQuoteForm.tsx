"use client"

import { useCallback, useState, useTransition, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Upload, Calendar as CalendarIcon, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { requestAQuoteSchema } from "@/schemas"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import FormError from "./FormError"
import FormSuccess from "./FormSuccess"
import { submitQuoteRequest } from "@/actions/quote"

type FormData = z.infer<typeof requestAQuoteSchema>

interface Product {
  id: string
  name: string
}

const SkeletonInput = () => (
  <div className="h-10 bg-gray-200 rounded animate-pulse" />
)

const SkeletonTextarea = () => (
  <div className="h-24 bg-gray-200 rounded animate-pulse" />
)

const SkeletonRadioGroup = () => (
  <div className="flex space-x-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="w-20 h-6 bg-gray-200 rounded animate-pulse" />
    ))}
  </div>
)

const SkeletonCheckbox = () => (
  <div className="flex space-x-4">
    {[1, 2].map((i) => (
      <div key={i} className="w-24 h-6 bg-gray-200 rounded animate-pulse" />
    ))}
  </div>
)

export default function RequestAQuoteForm({ productName = "" }: { productName?: string }) {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()
  const [selectedProduct, setSelectedProduct] = useState(productName || "Product")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const path = usePathname()

  const form = useForm<z.infer<typeof requestAQuoteSchema>>({
    resolver: zodResolver(requestAQuoteSchema),
    defaultValues: {
      additionalInfo: "",
      companyName: "",
      cultivationType: [],
      deliveryAddress: "",
      deliveryDate: undefined,
      deliveryFrequency: "one-time",
      email: "",
      files: [],
      fullName: "",
      incoterm: "ddp",
      needFor: "export",
      phone: "",
      processing: "double-sortex-cleaned",
      product: productName,
      productType: "natural",
      purchaseType: "not-sure",
      unit: "metric-ton",
      volume: "",
      website: "",
    },
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        setProducts(data.products)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const onSubmit = async (values: FormData) => {
    setError("")
    setSuccess("")
    startTransition(() => {
      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => formData.append(key, item))
        } else if (value instanceof Date) {
          formData.append(key, value.toISOString())
        } else if (value !== undefined && value !== null) {
          formData.append(key, value.toString())
        }
      })
      uploadedFiles.forEach((file) => {
        formData.append("files", file)
      })
      submitQuoteRequest(formData).then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })

    setUploadedFiles([]);
  }

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || [])
      if (selectedFiles.length + uploadedFiles.length > 5) {
        setError("You can only upload up to 5 files.")
        return
      }
      setUploadedFiles((prevFiles) => [...prevFiles, ...selectedFiles])
    },
    [uploadedFiles]
  )

  const handleFileDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      const droppedFiles = Array.from(e.dataTransfer.files)
      if (droppedFiles.length + uploadedFiles.length > 5) {
        setError("You can only upload up to 5 files.")
        return
      }
      setUploadedFiles((prevFiles) => [...prevFiles, ...droppedFiles])
    },
    [uploadedFiles]
  )

  const removeFile = useCallback((index: number) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }, [])

  const updateProductName = (name: string) => {
    setSelectedProduct(name)
  }

  const replaceProductName = (text: string) => {
    return text.replace(/Product/gi, selectedProduct)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mt-6 bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground">
        Request A Quote
      </h2>
      <p className="text-xl md:text-2xl text-gray-600 mb-6">
        {replaceProductName(
          "From bulk quantities to pallet loads, we've got all your needs covered."
        )}
        Complete the form to receive a personalized quote for our high-quality Product, customized to meet your business requirements. Indicate whether you need organic or conventional, and provide your preferred delivery timeline.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {path === "/requestAQuote" && (
              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>Product *</FormLabel>
                    <FormControl>
                      {isLoading ? (
                        <SkeletonInput />
                      ) : (
                        <Select
                          {...field}
                          onValueChange={(value) => {
                            field.onChange(value)
                            updateProductName(value)
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a product" />
                          </SelectTrigger>
                          <SelectContent>
                            {products.map((product) => (
                              <SelectItem key={product.id} value={product.name}>
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    {isLoading ? <SkeletonInput /> : <Input {...field} disabled={isPending} />}
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
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    {isLoading ? <SkeletonInput /> : <Input {...field} disabled={isPending} type="email" />}
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
                    {isLoading ? <SkeletonInput /> : <Input {...field} disabled={isPending} type="tel" />}
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
                    {isLoading ? <SkeletonInput /> : <Input {...field} disabled={isPending} />}
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
                    {isLoading ? <SkeletonInput /> : <Input {...field} disabled={isPending} />}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="needFor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Need This For? *</FormLabel>
                  <FormControl>
                    {isLoading ? (
                      <SkeletonInput />
                    ) : (
                      <Select disabled={isPending} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="import">Import</SelectItem>
                          <SelectItem value="export">Export</SelectItem>
                          <SelectItem value="import-export">Import & Export</SelectItem>
                          <SelectItem value="food-retail">Food Retail</SelectItem>
                          <SelectItem value="food-services">Food Services</SelectItem>
                          <SelectItem value="wholesale">Wholesale</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-8 py-8">
            <h3 className="text-2xl md:text-3xl font-semibold">Product Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                name="productType"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Type *</FormLabel>
                    <FormControl>
                      {isLoading ? (
                        <SkeletonRadioGroup />
                      ) : (
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="hulled" id="hulled" />
                            <Label htmlFor="hulled">{replaceProductName("Hulled Product")}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="natural" id="natural" />
                            <Label htmlFor="natural">{replaceProductName("Natural Product")}</Label>
                          </div>
                        </RadioGroup>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="cultivationType"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cultivation Type *</FormLabel>
                    <FormControl>
                      {isLoading ? (
                        <SkeletonCheckbox />
                      ) : (
                        <div className="flex space-x-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="organic"
                              checked={field.value.includes("organic")}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...field.value, "organic"]);
                                } else {
                                  field.onChange(
                                    field.value.filter(
                                      (value: string) => value !== "organic"
                                    )
                                  );
                                }
                              }}
                            />
                            <label htmlFor="organic">Organic</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="conventional"
                              checked={field.value.includes("conventional")}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...field.value, "conventional"]);
                                } else {
                                  field.onChange(
                                    field.value.filter(
                                      (value: string) => value !== "conventional"
                                    
                                    )
                                  );
                                }
                              }}
                            />
                            <label htmlFor="conventional">Conventional</label>
                          </div>
                        </div>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="processing"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{replaceProductName(`How should the Product be processed?`)}</FormLabel>
                    <FormControl>
                      {isLoading ? (
                        <SkeletonInput />
                      ) : (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select processing options" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sun-dried">Sun Dried</SelectItem>
                            <SelectItem value="sortex-cleaned">Sortex Cleaned</SelectItem>
                            <SelectItem value="double-sortex-cleaned">Double Sortex Cleaned</SelectItem>
                            <SelectItem value="roasted">Roasted</SelectItem>
                            <SelectItem value="steam-sterilised">Steam Sterilised</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-8 py-8">
            <h3 className="text-2xl md:text-3xl font-semibold">Quantity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                name="unit"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit *</FormLabel>
                    <FormControl>
                      {isLoading ? (
                        <SkeletonInput />
                      ) : (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger id="unit">
                            <SelectValue placeholder="Select a unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kilogram">KILOGRAM</SelectItem>
                            <SelectItem value="ton">TON</SelectItem>
                            <SelectItem value="metric-ton">METRIC TON</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="volume"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Volume *</FormLabel>
                    <FormControl>
                      {isLoading ? (
                        <SkeletonInput />
                      ) : (
                        <Input
                          id="volume"
                          type="text"
                          {...field}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="purchaseType"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>Recursive or One-time Purchase? *</FormLabel>
                    <FormControl>
                      {isLoading ? (
                        <SkeletonRadioGroup />
                      ) : (
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="annual" id="annual" />
                            <Label htmlFor="annual">Annual supply</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="one-time" id="one-time" />
                            <Label htmlFor="one-time">One time</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="not-sure" id="not-sure" />
                            <Label htmlFor="not-sure">Not sure</Label>
                          </div>
                        </RadioGroup>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-8 py-8">
            <h3 className="text-2xl md:text-3xl font-semibold">Delivery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                name="deliveryAddress"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>Delivery Address *</FormLabel>
                    <FormControl>
                      {isLoading ? (
                        <SkeletonTextarea />
                      ) : (
                        <Textarea
                          id="deliveryAddress"
                          {...field}
                          rows={4}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="incoterm"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Incoterm® 2020</FormLabel>
                    <FormControl>
                      {isLoading ? (
                        <SkeletonRadioGroup />
                      ) : (
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-wrap gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="exw" id="exw" />
                            <Label htmlFor="exw">EXW</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="fob" id="fob" />
                            <Label htmlFor="fob">FOB</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="cif" id="cif" />
                            <Label htmlFor="cif">CIF</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="ddp" id="ddp" />
                            <Label htmlFor="ddp">DDP</Label>
                          </div>
                        </RadioGroup>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="deliveryDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Date *</FormLabel>
                    <FormControl>
                      {isLoading ? (
                        <SkeletonInput />
                      ) : (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      )}
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="deliveryFrequency"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Frequency *</FormLabel>
                    <FormControl>
                      {isLoading ? (
                        <SkeletonInput />
                      ) : (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger id="deliveryFrequency">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                            <SelectItem value="annually">Annually</SelectItem>
                            <SelectItem value="one-time">One time</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            name="additionalInfo"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-2xl md:text-3xl ">Additional Information</FormLabel>
                <FormControl>
                  {isLoading ? (
                    <SkeletonTextarea />
                  ) : (
                    <Textarea
                      id="additionalInfo"
                      {...field}
                      rows={4}
                      placeholder="Any additional details or requirements?"
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer transition-colors hover:border-primary"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
              multiple
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">
                Drag and drop files here or click to upload
              </p>
              <p className="text-xs text-gray-400 mt-1">
                (Max 5 files, 10MB each)
              </p>
            </label>
          </div>
          {uploadedFiles.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Uploaded Files:</h4>
              <ul className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-100 rounded p-2"
                  >
                    <span className="text-sm truncate">{file.name}</span>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )} */}

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending || isLoading}
            type="submit"
            className="w-full opacity-100 bg-primary text-white text-lg md:text-xl py-6 rounded-lg transform transition-all ease-out duration-300 hover:bg-primary/90"
          >
            {isLoading ? "Loading..." : "Submit Quote Request"}
          </Button>
        </form>
      </Form>
    </motion.div>
  )
}