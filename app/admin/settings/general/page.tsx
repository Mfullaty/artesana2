'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface GeneralSettings {
  heroText: string;
  tagLineText: string;
  aboutUsText: string;
  missionStatement: string;
  productsHeroTitle: string;
}

export default function GeneralSettingsPage() {
  const [settings, setSettings] = useState<GeneralSettings>({
    heroText: '',
    tagLineText: '',
    aboutUsText: '',
    missionStatement: '',
    productsHeroTitle: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings/general')
        if (response.ok) {
          const data = await response.json()
          setSettings(data)
        } else {
          throw new Error('Failed to fetch settings')
        }
      } catch (error) {
        console.error('Error fetching settings:', error)
        toast({
          title: "Error",
          description: "Failed to load settings. Please try again.",
          variant: "destructive",
        })
      }
    }
    fetchSettings()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('/api/settings/general', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      if (response.ok) {
        toast({
          title: "Settings updated",
          description: "Your general settings have been successfully updated.",
        })
      } else {
        throw new Error('Failed to update settings')
      }
    } catch (error) {
      console.error('Error updating settings:', error)
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Manage your site's general content and information.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="heroText" className="block text-sm font-medium text-gray-700">Hero Text</label>
              <Input
                id="heroText"
                name="heroText"
                value={settings.heroText}
                onChange={handleInputChange}
                placeholder="Enter hero text"
              />
            </div>
            <div>
              <label htmlFor="tagLineText" className="block text-sm font-medium text-gray-700">Tag Line Text</label>
              <Input
                id="tagLineText"
                name="tagLineText"
                value={settings.tagLineText}
                onChange={handleInputChange}
                placeholder="Enter tag line text"
              />
            </div>
            <div>
              <label htmlFor="aboutUsText" className="block text-sm font-medium text-gray-700">About Us Text</label>
              <Textarea
                id="aboutUsText"
                name="aboutUsText"
                value={settings.aboutUsText}
                onChange={handleInputChange}
                placeholder="Enter about us text"
                rows={4}
              />
            </div>
            <div>
              <label htmlFor="missionStatement" className="block text-sm font-medium text-gray-700">Mission Statement</label>
              <Textarea
                id="missionStatement"
                name="missionStatement"
                value={settings.missionStatement}
                onChange={handleInputChange}
                placeholder="Enter mission statement"
                rows={3}
              />
            </div>
            <div>
              <label htmlFor="productsHeroTitle" className="block text-sm font-medium text-gray-700">Products Hero Title</label>
              <Input
                id="productsHeroTitle"
                name="productsHeroTitle"
                value={settings.productsHeroTitle}
                onChange={handleInputChange}
                placeholder="Enter products hero title"
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Settings'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}