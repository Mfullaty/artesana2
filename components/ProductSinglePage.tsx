"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  Calendar as CalendarIcon,
  FormInputIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Link from "next/link";
import StockMarquee from "./StockMarquee";
import FeaturedProducts from "./sections/FeaturedProducts";
import AgriculturalNews from "./sections/AgriCulturalNews";

export default function LuxuryProductPage() {
  const [currentImage, setCurrentImage] = useState(0);
  const [date, setDate] = useState<Date>();
  const images = [
    "/images/sesame1.jpeg",
    "/images/sesame4.jpeg",
    "/images/sesame5.jpeg",
    "/images/sesame7.jpeg",
  ];

  const productDetails = [
    "High Quality Sesame Seeds",
    "Sourced from local farms",
    "ideal for seeding",
    "Good for food supply and use",
    "Good price quotes",
  ];

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
    <StockMarquee />
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 text-gray-800 p-2 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src={images[currentImage]}
              alt="Sesame Seeds"
              layout="fill"
              objectFit="cover"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/70 text-gray-800"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/70 text-gray-800"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r  from-[#1a2b4c] to-[#0055ff]">
                Sesame Seeds
              </h1>
              <p className="text-xl text-gray-600">Sesame seeds sourced from local farms</p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-700">
                Product Details
              </h2>
              <ul className="list-none space-y-2 text-gray-600">
                {productDetails.map((detail, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-[#1a2b4c] rounded-full mr-2"></span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col space-y-4">
              <Link href="#requestAQuote">
                <Button className="w-full bg-[#1a2b4c] hover:bg-primary/90">
                  <div className="flex justify-center items-center gap-2">
                    <FormInputIcon />
                    <p>Request a Quote</p>
                  </div>
                </Button>
              </Link>
              <Button
              onClick={() => window.open('https://wa.me/2348138497268', '_blank')}
                variant="outline"
                className="w-full text-green-600 border-green-600 hover:bg-green-600 hover:text-white transition-all duration-300"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat On Whats'App
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-4 gap-4"
          >
            {images.map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`Thumbnail ${index + 1}`}
                width={150}
                height={150}
                className={`rounded-lg cursor-pointer transition-all ${
                  currentImage === index
                    ? "ring-2 ring-amber-600"
                    : "opacity-50 hover:opacity-100"
                }`}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </motion.div>
        </div>
        {/* Request A Quote Section */}
        <motion.div
          id="requestAQuote"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#1a2b4c] to-[#0055ff] ">
            Request A Quote
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-2">
            From bulk quantities to pallet loads, we've got all your needs
            covered.
          </p>
          <p className="text-gray-500 mb-6">
            Complete the form to receive a personalized quote for our
            high-quality natural sesame seeds, customized to meet your business
            requirements. Indicate whether you need organic or conventional
            seeds, and provide your preferred delivery timeline.
          </p>
          <form className="space-y-12 md:space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 md:space-y-4">
                <Label
                  htmlFor="full-name"
                  className="text-gray-700 text-base md:text-lg"
                >
                  Full Name *
                </Label>
                <Input
                  id="full-name"
                  required
                  className="bg-white border-gray-300 focus:border-[#1a2b4c] transition-colors duration-300 text-base md:text-lg"
                />
              </div>
              <div className="space-y-3 md:space-y-4">
                <Label
                  htmlFor="email"
                  className="text-gray-700 text-base md:text-lg"
                >
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
              <Label
                htmlFor="phone"
                className="text-gray-700 text-base md:text-lg"
              >
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
                <Label
                  htmlFor="company-name"
                  className="text-gray-700 text-base md:text-lg"
                >
                  Company Name 
                </Label>
                <Input
                  id="company-name"
                  className="bg-white border-gray-300 focus:border-[#1a2b4c] transition-colors duration-300 text-base md:text-lg"
                />
              </div>
              <div className="space-y-3 md:space-y-4">
                <Label
                  htmlFor="website"
                  className="text-gray-700 text-base md:text-lg"
                >
                  Website
                </Label>
                <Input
                  id="website"
                  className="bg-white border-gray-300 focus:border-[#1a2b4c] transition-colors duration-300 text-base md:text-lg"
                />
              </div>
            </div>
            <div className="space-y-3 md:space-y-4">
              <Label
                htmlFor="need-for"
                className="text-gray-700 text-base md:text-lg"
              >
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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r to-[#1a2b4c] from-[#0055ff] ">
                Product Requirements
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 mb-2">
                What variety of sesame seeds are you looking for?
              </p>
              <div className="space-y-1 md:space-y-2">
                <Label className="text-gray-700 text-base md:text-lg">
                  Product Type *
                </Label>
                <p className="text-sm md:text-base text-gray-500">
                  What variety of sesame seeds are you looking for?
                </p>
                <RadioGroup defaultValue="hulled" className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hulled" id="hulled" />
                    <Label htmlFor="hulled">Hulled Sesame Seeds</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="natural" id="natural" />
                    <Label htmlFor="natural">Natural Sesame Seeds</Label>
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
                <Label
                  htmlFor="processing"
                  className="text-gray-700 text-base md:text-lg"
                >
                  How should the sesame seeds be processed?
                </Label>
                <p className="text-sm md:text-base text-gray-500">
                  Leave this blank if you have other requirements not listed
                  here
                </p>
                <Select>
                  <SelectTrigger className="bg-white border-gray-300 focus:border-[#1a2b4c] transition-colors duration-300 text-base md:text-lg">
                    <SelectValue placeholder="Select processing options" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sun-dried">Sun Dried</SelectItem>
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
              </div>
            </div>

            {/* Quantity Section */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#1a2b4c] to-[#0055ff] ">
                Quantity
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 mb-2">
                Specify the quantity you require.
              </p>
              <div className="space-y-3 md:space-y-4">
                <Label
                  htmlFor="unit"
                  className="text-gray-700 text-base md:text-lg"
                >
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
                <Label
                  htmlFor="volume"
                  className="text-gray-700 text-base md:text-lg"
                >
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
                  Are you seeking a quote for a long-term annual supply or just
                  a one-time delivery?
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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#1a2b4c] to-[#0055ff] ">
                Delivery
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 mb-2">
                Provide your delivery details.
              </p>
              <div className="space-y-3 md:space-y-4">
                <Label
                  htmlFor="delivery-address"
                  className="text-gray-700 text-base md:text-lg"
                >
                  Delivery Address *
                </Label>
                <p className="text-sm md:text-base text-gray-500">
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
                <Label
                  htmlFor="delivery-date"
                  className="text-gray-700 text-base md:text-lg"
                >
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
                <Label
                  htmlFor="delivery-frequency"
                  className="text-gray-700 text-base md:text-lg"
                >
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
                <Label
                  htmlFor="file-upload"
                  className="text-gray-700 text-base md:text-lg"
                >
                  Upload Files
                </Label>
                <p className="text-sm md:text-base text-gray-500">
                  You can upload references or specification sheet in image and
                  pdf formats.
                </p>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm md:text-base text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
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
              <Label
                htmlFor="message"
                className="text-gray-700 text-base md:text-lg"
              >
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
              className="w-full bg-gradient-to-r from-[#1a2b4c] to-[#0055ff] hover:to-[#1a2b4c] hover:from-[#0055ff] text-white font-semibold text-lg md:text-xl py-4 rounded-lg transform transition-all ease-out duration-300 "
            >
              Submit Quote Request
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
    <FeaturedProducts />
    <AgriculturalNews />
    </>
  );
}
