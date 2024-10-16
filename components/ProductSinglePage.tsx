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
import RequestAQuoteForm from "./RequestAQuoteForm";
import CommodityData from "./CommodityData";

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
                <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r  from-primary to-secondary-foreground">
                  Sesame Seeds
                </h1>
                <p className="text-xl text-gray-600">
                  Sesame seeds sourced from local farms
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">
                  Product Details
                </h2>
                <ul className="list-none space-y-2 text-gray-600">
                  {productDetails.map((detail, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col space-y-4">
                <a href="#requestAQuote">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <div className="flex justify-center items-center gap-2">
                      <FormInputIcon />
                      <p>Request a Quote</p>
                    </div>
                  </Button>
                </a>
                <Button
                  onClick={() =>
                    window.open("https://wa.me/2348138497268", "_blank")
                  }
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
          <RequestAQuoteForm />
        </div>
      </div>
      <FeaturedProducts />
      <AgriculturalNews />
      {/* <CommodityData country="USA" /> */}
    </>
  );
}
