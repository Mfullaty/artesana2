import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import NewsMarquee from "@/components/NewsMarquee";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      {/* Stock Marquee Section */}
      <div className="mt-20 py-2 bg-white">
        {/* <StockMarquee /> */}
        <NewsMarquee />
      </div>
      <div>{children}</div>
      <Footer />
    </div>
  );
}
