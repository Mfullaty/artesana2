'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  facebookLink: string;
  twitterLink: string;
  instagramLink: string;
  linkedinLink: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
}

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: '',
    siteDescription: '',
    logo: '',
    favicon: '',
    facebookLink: '',
    twitterLink: '',
    instagramLink: '',
    linkedinLink: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings/site')
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
      const response = await fetch('/api/settings/site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      if (response.ok) {
        toast({
          title: "Settings updated",
          description: "Your site settings have been successfully updated.",
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
          <CardTitle>Site Settings</CardTitle>
          <CardDescription>Manage your site's basic information and social media links.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">Site Name</label>
              <Input
                id="siteName"
                name="siteName"
                value={settings.siteName}
                onChange={handleInputChange}
                placeholder="Enter site name"
              />
            </div>
            <div>
              <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700">Site Description</label>
              <Textarea
                id="siteDescription"
                name="siteDescription"
                value={settings.siteDescription}
                onChange={handleInputChange}
                placeholder="Enter site description"
                rows={3}
              />
            </div>
            <div>
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700">Logo URL</label>
              <Input
                id="logo"
                name="logo"
                value={settings.logo}
                onChange={handleInputChange}
                placeholder="Enter logo URL"
              />
            </div>
            <div>
              <label htmlFor="favicon" className="block text-sm font-medium text-gray-700">Favicon URL</label>
              <Input
                id="favicon"
                name="favicon"
                value={settings.favicon}
                onChange={handleInputChange}
                placeholder="Enter favicon URL"
              />
            </div>
            <div>
              <label htmlFor="facebookLink" className="block text-sm font-medium text-gray-700">Facebook Link</label>
              <Input
                id="facebookLink"
                name="facebookLink"
                value={settings.facebookLink}
                onChange={handleInputChange}
                placeholder="Enter Facebook link"
              />
            </div>
            <div>
              <label htmlFor="twitterLink" className="block text-sm font-medium text-gray-700">Twitter Link</label>
              <Input
                id="twitterLink"
                name="twitterLink"
                value={settings.twitterLink}
                onChange={handleInputChange}
                placeholder="Enter Twitter link"
              />
            </div>
            <div>
              <label htmlFor="instagramLink" className="block text-sm font-medium text-gray-700">Instagram Link</label>
              <Input
                id="instagramLink"
                name="instagramLink"
                value={settings.instagramLink}
                onChange={handleInputChange}
                placeholder="Enter Instagram link"
              />
            </div>
            <div>
              <label htmlFor="linkedinLink" className="block text-sm font-medium text-gray-700">LinkedIn Link</label>
              <Input
                id="linkedinLink"
                name="linkedinLink"
                value={settings.linkedinLink}
                onChange={handleInputChange}
                placeholder="Enter LinkedIn link"
              />
            </div>
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">Contact Email</label>
              <Input
                id="contactEmail"
                name="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={handleInputChange}
                placeholder="Enter contact email"
              />
            </div>
            <div>
              <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">Contact Phone</label>
              <Input
                id="contactPhone"
                name="contactPhone"
                value={settings.contactPhone}
                onChange={handleInputChange}
                placeholder="Enter contact phone"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <Textarea
                id="address"
                name="address"
                value={settings.address}
                onChange={handleInputChange}
                placeholder="Enter address"
                rows={3}
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