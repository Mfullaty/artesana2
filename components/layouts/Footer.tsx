import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 font-serif text-accent">About Us</h3>
            <p className="text-gray-300 font-sans">
              ARTESANA is a leading provider of products, connecting skilled
              craftspeople worldwide with discerning customers who appreciate
              quality.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 font-serif text-accent">Quick Links</h3>
            <ul className="space-y-2 font-sans">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-accent transition duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-accent transition duration-300"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-accent transition duration-300"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-accent transition duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 font-serif text-accent">Address</h3>
            <p className="text-gray-300 font-sans">
              123 Artisan Street
              <br />
              Craft City, AC 12345
              <br />
              <a className="font-bold text-primary-foreground hover:text-accent" href="mailto:contact@artesana.com.ng">contact@artesana.com.ng</a>
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-accent flex flex-col items-center">
          <div className="flex space-x-4 mb-4">
            <a
              href="#"
              className="text-gray-300 hover:text-accent transition duration-300"
            >
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-accent transition duration-300"
            >
              <Facebook className="h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-accent transition duration-300"
            >
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
          <p className="text-accent-foreground">
            &copy; 2024 ARTESANA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
