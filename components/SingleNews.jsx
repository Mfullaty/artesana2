"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Clock, Share2, Twitter, Facebook, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SingleNews({ article = {
  date: "15th October 2024",
  title: "Global Wheat Prices Surge Amid Supply Concerns",
  image: "/images/samplenews1.jpg",
  content: "A groundbreaking vertical farming initiative has been launched in major urban centers, promising to revolutionize urban agriculture. This project aims to address food security concerns and reduce the carbon footprint associated with traditional farming methods.\n\nVertical farming, a practice of growing crops in vertically stacked layers, often incorporating controlled-environment agriculture technology, has gained significant traction in recent years. This new project takes the concept to unprecedented scales, utilizing abandoned urban buildings and transforming them into highly efficient, multi-story farms.\n\nThe initiative is a collaborative effort between agricultural tech startups, city planners, and environmental scientists. It's designed to produce fresh, pesticide-free vegetables and fruits year-round, regardless of outdoor weather conditions. By bringing food production closer to consumers, the project also aims to drastically reduce transportation costs and associated emissions.\n\nOne of the key innovations in this project is the integration of AI and IoT technologies to optimize growing conditions. Sensors continuously monitor factors such as light, temperature, humidity, and nutrient levels, while AI algorithms adjust these parameters in real-time for maximum yield and quality.\n\nMoreover, the vertical farms are designed to be energy-efficient, primarily powered by renewable sources such as solar panels installed on the buildings' roofs. The system also incorporates advanced water recycling techniques, using up to 95% less water compared to traditional farming methods.\n\nCity officials are optimistic about the project's potential to create new jobs, from high-tech farming roles to distribution and retail positions. Additionally, the farms are expected to serve as educational centers, offering workshops and tours to schools and the general public, fostering a greater understanding of sustainable agriculture.\n\nAs urban populations continue to grow and climate change poses increasing challenges to traditional agriculture, innovative solutions like this vertical farming project may well represent the future of food production. If successful, this model could be replicated in cities worldwide, marking a significant step towards more sustainable and resilient urban food systems.",
  author: {
    name: "CMO, Artesana",
    image: "/images/avatar.png"
  },
  readingTime: "5 min read",
  relatedArticles: [
    { title: "The Rise of Precision Agriculture in Developing Nations", image: "/images/samplenews2.png" },
    { title: "How Climate Change is Affecting Global Crop Yields", image: "/images/samplenews3.jpg" },
    { title: "Sustainable Farming Practices: A Guide for Small-Scale Farmers", image: "/images/samplenews4.jpg" }
  ]
} }) {

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: `url(${article.image})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90"></div>
        <div className="absolute top-4 left-4">
          <Button variant="ghost" className="text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary drop-shadow-md mb-4">{article.title}</h1>
          <div className="flex items-center text-primary drop-shadow-md">
            <Clock className="mr-2 h-4 w-4" />
            <span>{article.readingTime}</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">About the Author</h2>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={article.author.image} alt={article.author.name} />
                    <AvatarFallback>{article.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{article.author.name}</p>
                    <p className="text-sm text-muted-foreground">Agricultural Journalist</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Share this article</h2>
                <div className="flex space-x-4">
                  <Button size="icon" variant="outline">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {article.relatedArticles.map((relatedArticle, index) => (
              <Card key={index} className="overflow-hidden">
                <img src={relatedArticle.image} alt={relatedArticle.title} className="w-full h-48 object-cover" />
                <CardContent className="p-4">
                  <h3 className="font-semibold hover:text-primary transition-colors">{relatedArticle.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}