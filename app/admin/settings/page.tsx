'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Cog, Palette, Users, Globe } from "lucide-react"
import Link from "next/link"

export default function Component() {
  const settingsCards = [
    { title: "General Settings", icon: Cog, href: "/admin/settings/general", bgImage: "/images/placeholder.webp" },
    { title: "Site Settings", icon: Globe, href: "/admin/settings/site", bgImage: "/images/placeholder.webp" },
    { title: "Theme Settings", icon: Palette, href: "/admin/settings/theme", bgImage: "/images/placeholder.webp" },
    { title: "Team Settings", icon: Users, href: "/admin/settings/users", bgImage: "/images/placeholder.webp" },
  ]

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {settingsCards.map((card, index) => (
          <Link key={index} href={card.href}>
            <Card className="h-48 overflow-hidden group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0 h-full">
                <div 
                  className="h-full bg-cover bg-center relative" 
                  style={{ backgroundImage: `url(${card.bgImage})` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-70 transition-all duration-300"></div>
                  <div className="relative h-full flex flex-col items-center justify-center text-white p-4">
                    <card.icon className="w-12 h-12 mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <h2 className="text-xl font-bold text-center group-hover:scale-105 transition-transform duration-300">{card.title}</h2>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}