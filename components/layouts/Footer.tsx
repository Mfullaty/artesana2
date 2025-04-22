import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 font-serif text-accent">
              About Us
            </h3>
            <p className="text-gray-300 font-sans">
              Unlock endless possibilities with our export company. By focusing
              on top-tier agro products, we empower businesses like yours to
              excel in the global market.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 font-serif text-accent">
              Quick Links
            </h3>
            <ul className="space-y-2 font-sans">
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-accent transition duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="text-gray-300 hover:text-accent transition duration-300"
                >
                  Products
                </a>
              </li>

              <li>
                <a
                  href="/about-us"
                  className="text-gray-300 hover:text-accent transition duration-300"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="/our-services"
                  className="text-gray-300 hover:text-accent transition duration-300"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/news"
                  className="text-gray-300 hover:text-accent transition duration-300"
                >
                  News
                </a>
              </li>
              <li>
                <a
                  href="/contact-us"
                  className="text-gray-300 hover:text-accent transition duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 font-serif text-accent">
              Address
            </h3>
            <p className="text-gray-300 font-sans">
              Tunde adeniran street,
              <br />
              Guzape, Abuja.
              <br />
              <a
                className="font-bold text-primary-foreground hover:text-accent"
                href="mailto:info@artesana.com.ng"
              >
                info@artesana.com.ng
              </a>
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-accent flex flex-col items-center">
          <div className="flex space-x-4 mb-4">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-accent transition duration-300"
            >
              <Facebook className="h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/artesana.ng/"
              className="text-gray-300 hover:text-accent transition duration-300"
            >
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-accent transition duration-300"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">Linkedin</span>
            </a>
          </div>
          <p className="text-accent-foreground">
            All rights reserved, Artesana &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
