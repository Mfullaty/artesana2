import { useState, useEffect, useRef } from 'react'
import { Globe, Package, Truck, Plus, Minus, Send, Phone, Menu, Facebook, Instagram, Twitter, Mail, MapPin, Home, Box, Headphones, Info } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import ProductCarousel from "./ProductsCarousel";
import { cn } from '@/lib/utils';
import { Product } from '@/types/product';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion';

interface StockInfo {
  name: string;
  // price: number;
  change: number;
}

function StockMarquee({ stocks }: { stocks: StockInfo[] }) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const marqueeElement = marqueeRef.current;
    if (!marqueeElement) return;

    const marqueeContent = marqueeElement.firstElementChild as HTMLElement;
    if (!marqueeContent) return;

    const marqueeWidth = marqueeContent.offsetWidth;
    const cloneContent = () => {
      const clone = marqueeContent.cloneNode(true) as HTMLElement;
      marqueeElement.appendChild(clone);
    };

    // Clone the content multiple times to ensure smooth looping
    for (let i = 0; i < 3; i++) {
      cloneContent();
    }

    let animationId: number;
    let startTime: number;
    const animationDuration = 30000; // 30 seconds for one full loop

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % animationDuration) / animationDuration;

      if (!isHovered) {
        marqueeElement.scrollLeft = progress * marqueeWidth;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);

  return (
    <div 
      className="overflow-hidden whitespace-nowrap bg-white" 
      ref={marqueeRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="inline-block">
        {stocks.map((stock, index) => (
          <div key={index} className="inline-block px-6 py-2 text-center cursor-pointer">
            <div className="font-semibold text-[#1a2b4c]">{stock.name}</div>
            <div className={cn(
              "text-sm",
              stock.change >= 0 ? "text-green-600" : "text-red-600"
            )}>
              {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Submitted email:', email)
    setEmail('')
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle contact form submission here
    console.log('Contact form submitted:', { contactName, contactEmail, contactMessage })
    setContactName('')
    setContactEmail('')
    setContactMessage('')
  }

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs = [
    {
      question: "What countries do you export to?",
      answer: "We export to over 100 countries worldwide, covering major markets in North America, Europe, Asia, and Australia. Contact us for specific country information."
    },
    {
      question: "How do you ensure product quality?",
      answer: "We have strict quality control measures in place, including regular supplier audits, pre-shipment inspections, and adherence to international standards and certifications."
    },
    {
      question: "What are your shipping terms?",
      answer: "We offer various shipping terms including FOB, CIF, and DDP. The specific terms depend on the destination and order volume. We'll work with you to determine the best option for your needs."
    },
    {
      question: "How long does shipping usually take?",
      answer: "Shipping times vary depending on the destination and chosen method. Typically, it ranges from 7-30 days. We provide detailed timelines and tracking information for each shipment."
    }
  ]

  const navItems = [
    { label: "Home", href: "#", icon: Home },
    { label: "Products", href: "#", icon: Box },
    { label: "Services", href: "#", icon: Truck },
    { label: "Contact", href: "#", icon: Headphones },
    { label: "About", href: "#", icon: Info },
  ]

  const products: Product[] = [
    {
      id: "hcnjewkmce",
      name: "Sesame Seeds",
      image: "https://img1.wsimg.com/isteam/ip/1919f62b-8c9f-47b6-a247-7486da73ea0c/sesame-seeds-globexia-1.jpeg/:/cr=t:30%25,l:32.26%25,w:35.47%25,h:40%25/rs=w:388,h:292,cg:true,m/qt=q:31",
      description: "Fresh Sesame Seeds sourced from Nigeria",
    },
    {
      id: "cnjavskcd",
      name: "Dark Nigerian Charcoal",
      image: "https://img1.wsimg.com/isteam/ip/1919f62b-8c9f-47b6-a247-7486da73ea0c/71A3MufPxzL._AC_SL1500_.jpg/:/cr=t:14.57%25,l:26.78%25,w:44.14%25,h:44.25%25/rs=w:388,h:292,cg:true,m/qt=q:31",
      description: "Our dark high quality Nigerian Charcoal",
    },
    {
      id: "cmjcdkcdekmcd",
      name: "Hibiscus Flower",
      image: "https://img1.wsimg.com/isteam/ip/1919f62b-8c9f-47b6-a247-7486da73ea0c/H.jpeg/:/cr=t:27.27%25,l:29.84%25,w:40.31%25,h:45.45%25/rs=w:388,h:292,cg:true,m/qt=q:31",
      description: "Dried hibiscus flower for export.",
    },
    {
      id: "cokmoicei",
      name: "Dried Ginger",
      image: "https://img1.wsimg.com/isteam/ip/1919f62b-8c9f-47b6-a247-7486da73ea0c/ginger.webp/:/cr=t:19.35%25,l:19.56%25,w:80.44%25,h:80.65%25/rs=w:388,h:292,cg:true,m/qt=q:31",
      description: "Organic Dried Ginger",
    },
    {
      id: "mckmookmce",
      name: "Cashew Nuts",
      image: "https://img1.wsimg.com/isteam/ip/1919f62b-8c9f-47b6-a247-7486da73ea0c/cashhheww.jpeg/:/cr=t:0%25,l:35.45%25,w:46.47%25,h:100%25/rs=w:388,h:292,cg:true/qt=q:31",
      description: "Organic Cashew Nuts.",
    },
    {
      id: "ckmwkmckc",
      name: "Soya Beans supply & Export",
      image: "https://img1.wsimg.com/isteam/ip/1919f62b-8c9f-47b6-a247-7486da73ea0c/soybeans-globexia-4.jpeg/:/cr=t:27.88%25,l:30.38%25,w:39.24%25,h:44.25%25/rs=w:388,h:292,cg:true,m/qt=q:31",
      description: "Soya Beans ready for supply & Export",
    },
  ];

  const stocks: StockInfo[] = [
    { name: "Beans",  change: 18.00 },
    { name: "Corn", change: -2.50 },
    { name: "Wheat", change: 5.30 },
    { name: "Soybeans",  change: -1.20 },
    { name: "Rice",  change: 3.70 },
  ];

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Header */}
      <header className="bg-[#1a2b4c] text-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-[#c9a55c]" />
            <span className="text-xl font-bold">ARTESANA</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="text-white hover:text-[#c9a55c] transition duration-300">
                {item.label}
              </a>
            ))}
          </nav>
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden bg-[#c9a55c] text-[#1a2b4c]">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-[#1a2b4c] text-white">
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.label}>
                    <a
                      href={item.href}
                      className="flex items-center space-x-2 text-white hover:text-[#c9a55c] transition duration-300 py-2 px-4 rounded-lg hover:bg-[#2c3e50]"
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
                  <a href="#" className="text-gray-400 hover:text-[#c9a55c] transition duration-300">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#c9a55c] transition duration-300">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#c9a55c] transition duration-300">
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Stock Marquee Section */}
      <div className="mt-16">
        <StockMarquee stocks={stocks} />
      </div>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#1a2b4c] to-[#2c3e50] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Products Excellence Worldwide</h1>
            <p className="text-xl mb-8 max-w-2xl">Helping product artisans and lovers across borders with premium products.</p>
            <a href="#" className="bg-[#c9a55c] text-[#1a2b4c] px-6 py-3 rounded-full font-semibold hover:bg-[#d4b572] transition duration-300">
              Get a Quote
            </a>
          </div>
        </section>

        {/* Featured Products */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-[#333333] mb-8 text-center">Featured  Products</h2>
          <ProductCarousel products={products} />
        </section>

        {/* Services */}
        <section className="bg-[#1a2b4c] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Globe, title: 'Global Reach', description: 'Our network is global. We deliver worldwide' },
                { icon: Truck,   title: 'Careful Shipping', description: 'Safe and secure delivery of delicate  items.' },
                { icon: Package, title: 'Custom Orders', description: 'Tailored  products for your specific needs.' },
              ].map((service) => (
                <div key={service.title} className="bg-[#2c3e50] rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                  <service.icon className="h-12 w-12 text-[#c9a55c] mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-300">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-[#1a2b4c] mb-8 text-center">Frequently Asked Questions</h2>
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-semibold text-[#1a2b4c] hover:text-[#c9a55c] transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#333333] mt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="bg-[#1a2b4c] text-white py-16">
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

        {/* Newsletter Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-[#2c3e50] text-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Stay Updated</h2>
            <p className="text-gray-300 text-center mb-6">Subscribe to our newsletter for the latest  products and craft news.</p>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  id="newsletter-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-3 py-2 bg-[#f8f8f8] text-[#333333] border border-[#c9a55c] rounded-md focus:outline-none focus:ring-2 focus:ring-[#c9a55c]"
                  placeholder="Enter your email"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#c9a55c] text-[#1a2b4c] px-6 py-2 rounded-md font-semibold hover:bg-[#d4b572] transition duration-300"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a2b4c] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-300">ARTESANA is a leading provider of  products, connecting skilled craftspeople worldwide with discerning customers who appreciate quality.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-[#c9a55c] transition duration-300">Home</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#c9a55c] transition duration-300">Products</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#c9a55c] transition duration-300">Services</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#c9a55c] transition duration-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-300">123 Artisan Street<br />Craft City, AC 12345<br />contact@artesana.com</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col items-center">
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-300 hover:text-[#c9a55c] transition duration-300">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-[#c9a55c] transition duration-300">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-[#c9a55c] transition duration-300">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
            <p className="text-gray-300">&copy; 2024 ARTESANA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}