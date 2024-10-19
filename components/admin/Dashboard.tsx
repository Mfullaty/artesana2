"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductsTab from "./ProductsTab"
import QuotesTab from "./QuotesTab"
import MessagesTab from "./MessagesTab"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("products")

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Dashboard</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="quotes">Quotes Enquiries</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <ProductsTab />
        </TabsContent>
        <TabsContent value="quotes">
          <QuotesTab />
        </TabsContent>
        <TabsContent value="messages">
          <MessagesTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}