'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Calendar as CalendarIcon } from "lucide-react";
import { usePathname } from "next/navigation";
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

export default function RequestAQuoteForm() {
  const [date, setDate] = useState<Date>();
  const [selectedProduct, setSelectedProduct] = useState("Product");
  const path = usePathname();

  const updateProductName = (name: string) => {
    if (path === "/requestAQuote") {
      setSelectedProduct(name);
    }
  };

  const replaceProductName = (text: string) => {
    if (path === "/requestAQuote") {
      return text.replace(/Product?/gi, selectedProduct);
    }
    return text;
  };

  return (
    <motion.div
      id="requestAQuote"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mt-16 bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground">
        Request A Quote
      </h2>
      <p className="text-xl md:text-2xl text-gray-600 mb-2">
        {replaceProductName("From bulk quantities to pallet loads, we've got all your needs covered.")}
      </p>
      <p className="text-gray-500 mb-6">
        {replaceProductName("Complete the form to receive a personalized quote for our high-quality  Product, customized to meet your business requirements. Indicate whether you need organic or conventional, and provide your preferred delivery timeline.")}
      </p>
      <form className="space-y-12 md:space-y-16">
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
            <Label htmlFor="full-name" className="text-gray-700 text-base md:text-lg">
              Full Name *
            </Label>
            <Input
              id="full-name"
              required
              className="bg-white border-gray-300 focus:border-[#1a2b4c] transition-colors duration-300 text-base md:text-lg"
            />
          </div>
          <div className="space-y-3 md:space-y-4">
            <Label htmlFor="email" className="text-gray-700 text-base md:text-lg">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              required
              className="bg-white border-gray-300 focus:border-[#1a2b4c] transition-colors duration-300 text-base md:text-lg"
            />
          </div>
        </div>
        <div className="space-y-3 md:space-y-4">
          <Label htmlFor="phone" className="text-gray-700 text-base md:text-lg">
            Phone/Contact Number
          </Label>
          <Input
            id="phone"
            type="tel"
            className="bg-white border-gray-300 focus:border-[#1a2b4c] transition-colors duration-300 text-base md:text-lg"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 md:space-y-4">
            <Label htmlFor="company-name" className="text-gray-700 text-base md:text-lg">
              Company Name
            </Label>
            <Input
              id="company-name"
              className="bg-white border-gray-300 focus:border-[#1a2b4c] transition-colors duration-300 text-base md:text-lg"
            />
          </div>
          <div className="space-y-3 md:space-y-4">
            <Label htmlFor="website" className="text-gray-700 text-base md:text-lg">
              Website
            </Label>
            <Input
              id="website"
              className="bg-white border-gray-300 focus:border-[#1a2b4c] transition-colors duration-300 text-base md:text-lg"
            />
          </div>
        </div>
        <div className="space-y-3 md:space-y-4">
          <Label htmlFor="need-for" className="text-gray-700 text-base md:text-lg">
            Need this for *
          </Label>
          <Select required>
            <SelectTrigger className="bg-white border-gray-300 focus:border-[#1a2b4c] transition-colors duration-300 text-base md:text-lg">
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
        </div>

        {/* Product Requirements Section */}
        <div className="space-y-9">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground">
            Product Requirements
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-2">
            {replaceProductName(`What variety of Product are you looking for?`)}
          </p>
          <div className="space-y-1 md:space-y-2">
            <Label className="text-gray-700 text-base md:text-lg">
              Product Type *
            </Label>
            <p className="text-sm md:text-base text-gray-500">
              {replaceProductName(`What variety of Product are you looking for?`)}
            </p>
            <RadioGroup defaultValue="hulled" className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hulled" id="hulled" />
                <Label htmlFor="hulled">{replaceProductName("Hulled Product")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="natural" id="natural" />
                <Label htmlFor="natural">{replaceProductName("Natural Product")}</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3 md:space-y-4">
            <Label className="text-gray-700 text-base md:text-lg">
              Cultivation Type *
            </Label>
            <p className="text-sm md:text-base text-gray-500">
              Organic or not? Select your option
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="organic" />
                <label
                  htmlFor="organic"
                  className="text-sm md:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Organic
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="conventional" />
                <label
                  htmlFor="conventional"
                  className="text-sm md:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Conventional
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
            <Label htmlFor="processing" className="text-gray-700 text-base md:text-lg">
              {replaceProductName(`How should the Product be processed?`)}
            </Label>
            <p className="text-sm md:text-base text-gray-500">
              Leave this blank if you have other requirements not listed here
            </p>
            <Select>
              <SelectTrigger className="bg-white border-gray-300 focus:border-[#1a2b4c] transition-colors duration-300 text-base md:text-lg">
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
          </div>
        </div>

        {/* Quantity Section */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground">
            Quantity
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-2">
            Specify the quantity you require.
          </p>
          <div className="space-y-3 md:space-y-4">
            <Label htmlFor="unit" className="text-gray-700 text-base md:text-lg">
              Unit *
            </Label>
            <Select required>
              <SelectTrigger
                id="unit"
                className="bg-white border-gray-300 focus:border-[#1a2b4c] transition-colors duration-300 text-base md:text-lg"
              >
                <SelectValue placeholder="Select a unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kilogram">KILOGRAM</SelectItem>
                <SelectItem value="ton">TON</SelectItem>
                <SelectItem value="metric-ton">METRIC TON</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3 md:space-y-4">
            <Label htmlFor="volume" className="text-gray-700 text-base md:text-lg">
              Volume *
            </Label>
            <Input
              id="volume"
              type="text"
              required
              className="bg-white border-gray-300 focus:border-[#1a2b4c] transition-colors duration-300 text-base md:text-lg"
            />
          </div>

          <div className="space-y-3 md:space-y-4">
            <Label className="text-gray-700 text-base md:text-lg">
              Annual or one-time purchase? *
            </Label>
            <p className="text-sm md:text-base text-gray-500">
              Are you seeking a quote for a long-term annual supply or just a one-time delivery?
            </p>
            <RadioGroup defaultValue="annual" className="flex space-x-4">
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
          </div>
        </div>

        {/* Delivery Section */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground">
            Delivery
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-2">
            Provide your delivery details.
          </p>
          <div className="space-y-3 md:space-y-4">
            <Label htmlFor="delivery-address" className="text-gray-700 text-base md:text-lg">
              Delivery Address *
            </Label>
            <p className="text-sm md:text-base  text-gray-500">
              Enter your preferred delivery location
            </p>
            <Textarea
              id="delivery-address"
              required
              className="bg-white border-gray-300 focus:border-[#1a2b4c] transition-colors duration-300 text-base md:text-lg"
              rows={4}
            />
          </div>

          <div className="space-y-3 md:space-y-4">
            <Label className="text-gray-700 text-base md:text-lg">
              Incoterm® 2020
            </Label>
            <RadioGroup defaultValue="exw" className="flex flex-wrap gap-4">
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
          </div>

          <div className="space-y-3 md:space-y-4">
            <Label htmlFor="delivery-date" className="text-gray-700 text-base md:text-lg">
              Delivery Date *
            </Label>
            <p className="text-sm md:text-base text-gray-500">
              Enter your preferred delivery date
            </p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal bg-white border-gray-300 focus:border-[#1a2b4c] transition-colors duration-300 text-base md:text-lg",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-3 md:space-y-4">
            <Label htmlFor="delivery-frequency" className="text-gray-700 text-base md:text-lg">
              Delivery Frequency *
            </Label>
            <p className="text-sm md:text-base text-gray-500">
              How frequently do you want to receive delivery?
            </p>
            <Select required>
              <SelectTrigger
                id="delivery-frequency"
                className="bg-white border-gray-300 focus:border-[#1a2b4c] transition-colors duration-300 text-base md:text-lg"
              >
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
          </div>

          <div className="space-y-3 md:space-y-4">
            <Label htmlFor="file-upload" className="text-gray-700 text-base md:text-lg">
              Upload Files
            </Label>
            <p className="text-sm md:text-base text-gray-500">
              You can upload references or specification sheet in image and pdf formats.
            </p>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm md:text-base text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG or PDF (MAX. 10MB)
                  </p>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".png,.jpg,.jpeg,.pdf"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-3 md:space-y-4">
          <Label htmlFor="message" className="text-gray-700 text-base md:text-lg">
            Additional Information
          </Label>
          <Textarea
            id="message"
            className="bg-white border-gray-300 focus:border-[#1a2b4c] transition-colors duration-300 text-base md:text-lg"
            rows={4}
          />
        </div>
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