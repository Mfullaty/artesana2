'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Image from 'next/image'

enum Template {
  DEFAULT = 'DEFAULT',
  TEMPLATEA = 'TEMPLATEA',
  TEMPLATEB = 'TEMPLATEB',
  TEMPLATEC = 'TEMPLATEC'
}

interface ThemeSettings {
  themeChoice: string | null;
  primaryColor: string | null;
  secondaryColor: string | null;
  accentColor: string | null;
  fontFamily: string | null;
  fontSize: string | null;
  isDarkMode: boolean | null;
  buttonStyle: string | null;
  headerStyle: string | null;
  templateChoice: Template;
}

const predefinedThemes = {
  'theme-1': {
    primaryColor: '#1a202c',
    secondaryColor: '#2d3748',
    accentColor: '#4299e1',
    fontFamily: 'Inter',
    fontSize: '16px',
    buttonStyle: 'rounded',
    headerStyle: 'fixed',
  },
  'theme-2': {
    primaryColor: '#2c3e50',
    secondaryColor: '#34495e',
    accentColor: '#e74c3c',
    fontFamily: 'Roboto',
    fontSize: '18px',
    buttonStyle: 'square',
    headerStyle: 'sticky',
  },
  'theme-3': {
    primaryColor: '#1b1b1b',
    secondaryColor: '#333333',
    accentColor: '#ffd700',
    fontFamily: 'Open Sans',
    fontSize: '14px',
    buttonStyle: 'pill',
    headerStyle: 'static',
  },
}

const templates = [
  { id: Template.DEFAULT, name: 'Default Template', image: '/placeholder.svg?height=200&width=300' },
  { id: Template.TEMPLATEA, name: 'Template A', image: '/placeholder.svg?height=200&width=300' },
  { id: Template.TEMPLATEB, name: 'Template B', image: '/placeholder.svg?height=200&width=300' },
  { id: Template.TEMPLATEC, name: 'Template C', image: '/placeholder.svg?height=200&width=300' },
]

export default function ThemeSettingsPage() {
  const [settings, setSettings] = useState<ThemeSettings>({
    themeChoice: null,
    primaryColor: null,
    secondaryColor: null,
    accentColor: null,
    fontFamily: null,
    fontSize: null,
    isDarkMode: null,
    buttonStyle: null,
    headerStyle: null,
    templateChoice: Template.DEFAULT,
  })

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings/theme')
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
          description: "Failed to load theme settings. Please try again.",
          variant: "destructive",
        })
      }
    }
    fetchSettings()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSettings(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    if (name === 'themeChoice' && value !== 'custom') {
      setSettings(prev => ({
        ...prev,
        themeChoice: value,
        ...predefinedThemes[value as keyof typeof predefinedThemes],
      }))
    } else {
      setSettings(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSettings(prev => ({ ...prev, [name]: checked }))
  }

  const handleTemplateChange = (templateId: Template) => {
    setSettings(prev => ({ ...prev, templateChoice: templateId }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('/api/settings/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      if (response.ok) {
        toast({
          title: "Settings updated",
          description: "Your theme settings have been successfully updated.",
        })
      } else {
        throw new Error('Failed to update settings')
      }
    } catch (error) {
      console.error('Error updating settings:', error)
      toast({
        title: "Error",
        description: "Failed to update theme settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Template Selection</CardTitle>
          <CardDescription>Choose a template for your website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {templates.map((template) => (
              <div key={template.id} className="flex flex-col items-center">
                <Image
                  src={template.image}
                  alt={template.name}
                  width={300}
                  height={200}
                  className="mb-2 rounded"
                />
                <Button
                  onClick={() => handleTemplateChange(template.id)}
                  variant={settings.templateChoice === template.id ? "default" : "outline"}
                >
                  {template.name}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Theme Settings</CardTitle>
          <CardDescription>Customize the look and feel of your site.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="themeChoice" className="block text-sm font-medium text-gray-700">Theme Choice</label>
              <Select
                onValueChange={(value) => handleSelectChange('themeChoice', value)}
                value={settings.themeChoice || ''}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="custom">Custom</SelectItem>
                  <SelectItem value="theme-1">Theme 1</SelectItem>
                  <SelectItem value="theme-2">Theme 2</SelectItem>
                  <SelectItem value="theme-3">Theme 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700">Primary Color</label>
              <Input
                id="primaryColor"
                name="primaryColor"
                type="color"
                value={settings.primaryColor || '#000000'}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700">Secondary Color</label>
              <Input
                id="secondaryColor"
                name="secondaryColor"
                type="color"
                value={settings.secondaryColor || '#ffffff'}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="accentColor" className="block text-sm font-medium text-gray-700">Accent Color</label>
              <Input
                id="accentColor"
                name="accentColor"
                type="color"
                value={settings.accentColor || '#3b82f6'}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="fontFamily" className="block text-sm font-medium text-gray-700">Font Family</label>
              <Select
                onValueChange={(value) => handleSelectChange('fontFamily', value)}
                value={settings.fontFamily || ''}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select font family" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter">Inter</SelectItem>
                  <SelectItem value="Roboto">Roboto</SelectItem>
                  <SelectItem value="Open Sans">Open Sans</SelectItem>
                  <SelectItem value="Lato">Lato</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700">Font Size</label>
              <Input
                id="fontSize"
                name="fontSize"
                type="text"
                value={settings.fontSize || ''}
                onChange={handleInputChange}
                placeholder="e.g., 16px"
              />
            </div>
            <div>
              <label htmlFor="buttonStyle" className="block text-sm font-medium text-gray-700">Button Style</label>
              <Select
                onValueChange={(value) => handleSelectChange('buttonStyle', value)}
                value={settings.buttonStyle || ''}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select button style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rounded">Rounded</SelectItem>
                  <SelectItem value="square">Square</SelectItem>
                  <SelectItem value="pill">Pill</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="headerStyle" className="block text-sm font-medium text-gray-700">Header Style</label>
              <Select
                onValueChange={(value) => handleSelectChange('headerStyle', value)}
                value={settings.headerStyle || ''}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select header style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixed</SelectItem>
                  <SelectItem value="static">Static</SelectItem>
                  <SelectItem value="sticky">Sticky</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isDarkMode"
                checked={settings.isDarkMode || false}
                onCheckedChange={(checked) => handleSwitchChange('isDarkMode', checked)}
              />
              <label htmlFor="isDarkMode" className="text-sm font-medium text-gray-700">Dark Mode</label>
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