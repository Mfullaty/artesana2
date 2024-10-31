import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <section className="my-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/50 to-yellow-500/50 z-0 rounded-md" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl mx-auto text-center px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Take the next step towards growing your business with our premium products and services.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/contact-us" passHref>
              <Button
                size="lg"
                className="w-full sm:w-auto text-lg font-semibold px-8 py-4 bg-primary hover:bg-primary/90 text-white"
              >
                Contact Us
              </Button>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/requestAQuote" passHref>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-lg font-semibold px-8 py-4 bg-white text-primary border-primary"
              >
                Get A Quote
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}