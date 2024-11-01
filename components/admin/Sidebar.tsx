"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Package,
  MessageSquare,
  FileText,
  X,
  Menu,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Boxes,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { GearIcon } from "@radix-ui/react-icons";

export function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navigate = (route: string) => {
    router.push(route);
  };

  const sidebarItems = [
    { icon: Boxes, label: "Dashboard", href: "/admin" },
    { icon: Package, label: "Products", href: "/admin/products" },
    { icon: FileText, label: "Quotes", href: "/admin/quotes" },
    { icon: MessageSquare, label: "Messages", href: "/admin/messages" },
  ];

  return (
    <>
      <aside
        className={`
        ${isMobile ? "fixed inset-y-0 left-0 z-50" : "relative"}
        ${isSidebarOpen ? (isMobile ? "w-64" : "w-64") : "w-16"}
        bg-white shadow-md transition-all duration-300
        ${isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"}
        flex flex-col
      `}
      >
        <div className="p-4 flex justify-between items-center">
          <h2
            className={`font-bold text-xl ${
              isSidebarOpen ? "block" : "hidden"
            }`}
          >
            Artesana Admin
          </h2>
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="ml-auto"
            >
              {isSidebarOpen ? (
                <ChevronLeft className="h-6 w-6" />
              ) : (
                <ChevronRight className="h-6 w-6" />
              )}
            </Button>
          )}
          {isMobile && isSidebarOpen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(false)}
              className="ml-auto"
            >
              <X className="h-6 w-6" />
            </Button>
          )}
        </div>
        <nav className="mt-4 mx-2 flex-grow">
          {sidebarItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                className={`w-full justify-start hover:text-primary-foreground  mb-3 ${
                  isSidebarOpen ? "px-4" : "px-0 justify-center"
                } ${
                  pathname === item.href
                    ? "bg-primary"
                    : "bg-transparent text-primary"
                }`}
                title={item.label}
              >
                <item.icon className={`h-5 w-5 ${isSidebarOpen && "mr-2"}`} />
                {isSidebarOpen && <span>{item.label}</span>}
              </Button>
            </Link>
          ))}
        </nav>
        <div className="p-4 flex flex-col gap-2">
          <Button
            variant="ghost"
            className={`w-full justify-start  ${
              isSidebarOpen ? "px-4" : "px-0 justify-center"
            }`}
            onClick={() => navigate('/admin/settings')}
            title="Site Settings"
          >
            <GearIcon className="h-5 w-5 mr-2" />
            {isSidebarOpen && <span>Settings</span>}
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start  ${
              isSidebarOpen ? "px-4" : "px-0 justify-center"
            }`}
            onClick={() => signOut()}
            title="Logout"
          >
            <LogOut className="h-5 w-5 mr-2" />
            {isSidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </aside>
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className={`
            fixed top-4 right-4 z-50 transition-all duration-300
            ${isSidebarOpen ? "translate-x-64" : "translate-x-0"}
          `}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      )}
    </>
  );
}
