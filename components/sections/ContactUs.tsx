import { Mail, MapPin, Phone, Send } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button'


const ContactUs = () => {
    const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMessage, setContactMessage] = useState('')

    
      const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle contact form submission here
        console.log('Contact form submitted:', { contactName, contactEmail, contactMessage })
        setContactName('')
        setContactEmail('')
        setContactMessage('')
      }
  return (
    <section id='contactUs' className="bg-[#1a2b4c] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="bg-[#2c3e50] rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Send us a message</h3>
                <form onSubmit={handleContactSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block font-medium mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#f8f8f8] text-[#333333] border border-[#c9a55c] rounded-md focus:outline-none focus:ring-2 focus:ring-[#c9a55c]"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block font-medium mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-[#f8f8f8] text-[#333333] border border-[#c9a55c] rounded-md focus:outline-none focus:ring-2 focus:ring-[#c9a55c]"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="message" className="block font-medium mb-2">Message</label>
                    <textarea
                      id="message"
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full px-3 py-2 bg-[#f8f8f8] text-[#333333] border border-[#c9a55c] rounded-md focus:outline-none focus:ring-2 focus:ring-[#c9a55c]"
                      rows={4}
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#c9a55c] text-[#1a2b4c] px-4 py-2 rounded-md font-semibold hover:bg-[#d4b572] transition duration-300 flex items-center justify-center"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </button>
                </form>
              </div>
              {/* Contact Information */}
              <div className="bg-[#2c3e50] rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Get in touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-[#c9a55c] mr-3 mt-1" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-300">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-[#c9a55c] mr-3 mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-300">info@artesana.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-[#c9a55c] mr-3 mt-1" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-gray-300">123 Artisan Street, Craft City, AC 12345</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Business Hours</h4>
                  <p className="text-gray-300">Monday - Friday: 9:00 AM - 5:00 PM</p>
                  <p className="text-gray-300">Saturday: 10:00 AM - 2:00 PM</p>
                  <p className="text-gray-300">Sunday: Closed</p>
                </div>
                <div className="mt-6">
                  <Button
                    className="w-full bg-white text-black hover:bg-slate-200 hover:scale-105"
                    onClick={() => window.open('https://wa.me/2348138497268', '_blank')}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Let's talk on WhatsApp!
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
  )
}

export default ContactUs
