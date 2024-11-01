import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Artesana",
  description: "The #1 Global Export Company in Africa",
  icons: {
    icon: [
      { url: "/web-icon-2.svg" },
      { url: "/logo-1.png", sizes: "180x180" } // For iOS
    ],
    shortcut: [{ url: "/web-icon-2.svg" }],
    apple: [{ url: "logo-1.png" }], // For Safari iOS and iPadOS
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative scroll-smooth`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
