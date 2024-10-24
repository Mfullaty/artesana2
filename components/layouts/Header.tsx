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
import Link from "next/link";

const navItems: NavItems[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Products", href: "/#products", icon: Box },
  { label: "About us", href: "/about-us", icon: Info },
  { label: "Services", href: "/our-services", icon: Truck },
  { label: "News", href: "/#agricNews", icon: SheetIcon },
  { label: "Contact us", href: "/contact-us", icon: Headphones },
];
const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <header className="bg-primary text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 cursor-pointer">
          <Globe className="h-8 w-8 text-accent-foreground hover:text-secondary" />
          <span className="text-2xl font-bold text-accent-foreground hover:text-secondary font-serif">
            ARTESANA
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-accent-foreground hover:text-accent transition duration-300"
            >
              {item.label}
            </a>
          ))}
          <Link
            href="/requestAQuote"
            className="inline-flex h-10 items-center justify-center rounded-full bg-white px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-1"
          >
            Get a Quote
          </Link>
        </nav>
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden bg-accent-foreground text-primary  hover:bg-accent hover:text-primary"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[300px] sm:w-[400px] bg-primary text-white"
          >
            <nav className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => (
                <SheetClose asChild key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center space-x-2 text-white hover:text-accent transition duration-300 py-2 px-4 rounded-lg hover:bg-[#2c3e50]"
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
                  className="text-gray-400 hover:text-accent transition duration-300"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-accent transition duration-300"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-accent transition duration-300"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="absolute bottom-28 left-4 right-4 bg-white rounded-md">
              <StockMarquee />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
