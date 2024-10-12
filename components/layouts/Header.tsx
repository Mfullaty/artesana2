"use client";
import { NavItems } from "@/types/all";
import {
  Box,
  Facebook,
  Globe,
  Headphones,
  Home,
  Info,
  Instagram,
  Menu,
  SheetIcon,
  Truck,
  Twitter,
} from "lucide-react";
import React from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useState } from "react";
import StockMarquee from "../StockMarquee";

const navItems: NavItems[] = [
  { label: "Home", href: "#", icon: Home },
  { label: "Products", href: "#products", icon: Box },
  { label: "Services", href: "#services", icon: Truck },
  { label: "News", href: "#agricNews", icon: SheetIcon },
  { label: "About us", href: "#", icon: Info },
  { label: "Contact us", href: "#contactUs", icon: Headphones },
];
const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <header className="bg-[#1a2b4c] text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Globe className="h-8 w-8 text-[#c9a55c]" />
          <span className="text-xl font-bold">ARTESANA</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-white hover:text-[#c9a55c] transition duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden bg-[#c9a55c] text-[#1a2b4c]"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[300px] sm:w-[400px] bg-[#1a2b4c] text-white"
          >
            <nav className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => (
                <SheetClose asChild key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center space-x-2 text-white hover:text-[#c9a55c] transition duration-300 py-2 px-4 rounded-lg hover:bg-[#2c3e50]"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </a>
                </SheetClose>
              ))}
            </nav>
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-sm text-gray-400 mb-2">Connect with us:</p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#c9a55c] transition duration-300"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#c9a55c] transition duration-300"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#c9a55c] transition duration-300"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="absolute bottom-28 left-4 right-4">
              <StockMarquee />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
