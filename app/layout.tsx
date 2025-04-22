import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Artesana | Premium Agricultural Products",
    template: "%s | Artesana",
  },
  description:
    "Premium quality agricultural products from Artesana. Explore our range of high-quality agricultural commodities.",
  keywords: [
    "agricultural products",
    "premium commodities",
    "Artesana",
    "agricultural trade",
  ],
  authors: [{ name: "Artesana" }],
  creator: "Artesana",
  publisher: "Artesana",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Artesana",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@artesana",
    site: "@artesana",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
