"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { messageSchema } from "@/schemas/messages"
import { toast, Toaster } from 'sonner'

type MessageFormData = z.infer<typeof messageSchema>

export default function ContactUs() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
  })

  const onSubmit = async (data: MessageFormData) => {
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success("Message sent", {
          description: "We'll get back to you soon!",
        })
        reset()
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast.error("Error", {
        description: "Failed to send message. Please try again.",
      })
    }
  }

  return (
    <section id="contactUs" className="py-16 font-mono bg-gradient-to-br from-primary-foreground to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-white text-center">
          Contact Us
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-2xl p-6 border border-white border-opacity-20">
            <h3 className="text-xl font-semibold mb-4 text-white">Send us a message</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium mb-2 text-white">
                  Name
                </label>
                <Input
                  id="name"
                  {...register("name")}
                  className="w-full px-3 py-2 bg-white bg-opacity-10 text-white border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent placeholder-white placeholder-opacity-50"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="text-red-300 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-2 text-white">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full px-3 py-2 bg-white bg-opacity-10 text-white border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent placeholder-white placeholder-opacity-50"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block font-medium mb-2 text-white">
                  Message
                </label>
                <Textarea
                  id="message"
                  {...register("message")}
                  className="w-full px-3 py-2 bg-white bg-opacity-10 text-white border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent placeholder-white placeholder-opacity-50"
                  rows={4}
                  placeholder="Your message"
                />
                {errors.message && (
                  <p className="text-red-300 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-opacity-90 transition duration-300 flex items-center justify-center"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
          {/* Contact Information */}
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-2xl p-6 border border-white border-opacity-20">
            <h3 className="text-xl font-semibold mb-4 text-white">Get in touch</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-white mr-3 mt-1" />
                <div>
                  <p className="font-medium text-white">Phone</p>
                  <p className="text-white text-opacity-80">+234 123-456-789</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-white mr-3 mt-1" />
                <div>
                  <p className="font-medium text-white">Email</p>
                  <a className="text-white text-opacity-80 hover:text-opacity-100 transition-colors" href="mailto:info@artesana.com.ng">
                    contact@artesana.com.ng
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-white mr-3 mt-1" />
                <div>
                  <p className="font-medium text-white">Address</p>
                  <p className="text-white text-opacity-80">
                    123 Artisan Street, Craft City, AC 12345
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-2 text-white">Business Hours</h4>
              <p className="text-white text-opacity-80">
                Monday - Friday: 9:00 AM - 5:00 PM
              </p>
              <p className="text-white text-opacity-80">Saturday: 10:00 AM - 2:00 PM</p>
              <p className="text-white text-opacity-80">Sunday: Closed</p>
            </div>
            <div className="mt-6">
              <Button
                onClick={() => window.open("https://wa.me/2348138497268", "_blank")}
                variant="outline"
                className="w-full bg-white bg-opacity-20 text-white border-white border-opacity-50 hover:bg-opacity-30 transition-all duration-300 font-semibold backdrop-filter backdrop-blur-sm"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Let's talk on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  )
}