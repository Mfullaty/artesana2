import Image from "next/image";
import Link from "next/link";

interface AboutUsProps {
  title?: string;
  description?: string;
  action?: boolean;
  imgSource?: string;
}
export default function AboutUs({
  title = "Welcome to Artesana",
  description = "Unlock endless possibilities with our export company. By focusing on top-tier agro products, we empower businesses like yours to excel in the global market.",
  action = true,
  imgSource = "/images/decorativeTree.webp",
}: AboutUsProps) {
  return (
    <section className="overflow-hidden bg-secondary-foreground py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4 mt-12 md:mt-0">
            <h1 className="text-3xl font-bold tracking-tighter text-[#2C5E3F]  md:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="text-base text-gray-600 md:text-lg">{description}</p>
            {action && (
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="/contact-us"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-[#2C5E3F] px-6 md:px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#2C5E3F]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2C5E3F]"
                >
                  Contact Us
                </Link>
              </div>
            )}
          </div>
          <div className="relative h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] md:h-[400px] md:w-[400px] mx-auto">
            <Image
              src={imgSource}
              alt={title}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
