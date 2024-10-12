import { Facebook, Instagram, Twitter } from 'lucide-react'

const Footer = () => {
  return (
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
  )
}

export default Footer
