import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import StockMarquee from "@/components/StockMarquee";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased relative scroll-smooth`}
      >
        <Header />
      {/* Stock Marquee Section */}
      <div className="mt-16 bg-white">
        <StockMarquee />
      </div>
        <div>{children}</div>
      <Footer />
      </body>
    </html>
  );
}
