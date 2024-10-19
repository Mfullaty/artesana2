'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Calendar as CalendarIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";


interface FormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  website: string;
  needFor: string;
  product: string;
  productType: string;
  cultivationType: string[];
  processing: string;
  unit: string;
  volume: string;
  purchaseType: string;
  deliveryAddress: string;
  incoterm: string;
  deliveryDate: Date | null;
  deliveryFrequency: string;
  additionalInfo: string;
}
export default function RequestAQuoteForm() {
  const [date, setDate] = useState<Date>();
  const [selectedProduct, setSelectedProduct] = useState("Product");
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    website: "",
    needFor: "",
    product: "",
    productType: "hulled",
    cultivationType: [],
    processing: "",
    unit: "",
    volume: "",
    purchaseType: "annual",
    deliveryAddress: "",
    incoterm: "exw",
    deliveryDate: null,
    deliveryFrequency: "",
    additionalInfo: "",
  });

  const path = usePathname();
  const router = useRouter();

  const updateProductName = (name: string) => {
    if (path === "/requestAQuote") {
      setSelectedProduct(name);
      setFormData(prev => ({ ...prev, product: name }));
    }
  };

  const replaceProductName = (text: string) => {
    if (path === "/requestAQuote") {
      return text.replace(/Product?/gi, selectedProduct);
    }
    return text;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string) => (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      cultivationType: checked
        ? [...prev.cultivationType, name]
        : prev.cultivationType.filter(type => type !== name),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          deliveryDate: date?.toISOString(),
        }),
      });

      if (response.ok) {
        // Handle successful submission (e.g., show success message, redirect)
        router.push('/quote-submitted');
      } else {
        // Handle error
        console.error('Failed to submit quote');
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
    }
  };

  return (
    <motion.div
      id="requestAQuote"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="my-8 bg-white/80 backdrop-blur-lg rounded-2xl max-w-7xl mx-auto p-8 shadow-xl"
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground">
        Request A Quote
      </h2>
      <p className="text-xl md:text-2xl text-gray-600 mb-2">
        {replaceProductName("From bulk quantities to pallet loads, we've got all your needs covered.")}
      </p>
      <p className="text-gray-500 mb-6">
        {replaceProductName("Complete the form to receive a personalized quote for our high-quality Product, customized to meet your business requirements. Indicate whether you need organic or conventional, and provide your preferred delivery timeline.")}
      </p>
      <form onSubmit={handleSubmit} className="space-y-12 md:space-y-16">
        {path === "/requestAQuote" && (
          <div className="space-y-3 md:space-y-4">
            <Label htmlFor="product" className="text-gray-700 text-base md:text-lg">
              Select a product *
            </Label>
            <Select required onValueChange={updateProductName}>
              <SelectTrigger className="bg-white border-gray-300 focus:border-[#1a2b4c] transition-colors duration-300 text-base md:text-lg">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sesame Seeds">Sesame Seeds</SelectItem>
                <SelectItem value="Cashew Nuts">Cashew Nuts</SelectItem>
                <SelectItem value="Hibiscus Flower">Hibiscus Flower</SelectItem>
                <SelectItem value="Soya Beans">Soya Beans</SelectItem>
                <SelectItem value="Nigerian Charcoal">Nigerian Charcoal</SelectItem>
                <SelectItem value="Dried Ginger">Dried Ginger</SelectItem>
                <SelectItem value="Red Beans">Red Beans</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 md:space-y-4">
            <Label htmlFor="fullName" className="text-gray-700 text-base md:text-lg">
              Full Name *
            </Label>
            <Input
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleInputChange}
              className="bg-white border-gray-300 focus:border-[#1a2b4c] transition-colors duration-300 text-base md:text-lg"
            />
          </div>
          <div className="space-y-3 md:space-y-4">
            <Label htmlFor="email" className="text-gray-700 text-base md:text-lg">
              Email *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="bg-white border-gray-300 focus:border-[#1a2b4c] transition-colors duration-300 text-base md:text-lg"
            />
          </div>
        </div>

        {/* ... (continue with the rest of the form fields, updating them to use formData and the appropriate change handlers) ... */}

        <Button
          type="submit"
          className="w-full opacity-100 bg-primary text-white text-lg md:text-xl py-6 rounded-lg transform transition-all ease-out duration-300"
        >
          Submit Quote Request
        </Button>
      </form>
    </motion.div>
  );
}