import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/all";
import Carousel from "./Carousel";

const products: Product[] = [
  {
    id: "hcnjewkmce",
    name: "Sesame Seeds",
    image:
      "https://img1.wsimg.com/isteam/ip/1919f62b-8c9f-47b6-a247-7486da73ea0c/sesame-seeds-globexia-1.jpeg/:/cr=t:30%25,l:32.26%25,w:35.47%25,h:40%25/rs=w:388,h:292,cg:true,m/qt=q:31",
    description: "Fresh Sesame Seeds sourced from Nigeria",
  },
  {
    id: "cnjavskcd",
    name: "Dark Nigerian Charcoal",
    image:
      "https://img1.wsimg.com/isteam/ip/1919f62b-8c9f-47b6-a247-7486da73ea0c/71A3MufPxzL._AC_SL1500_.jpg/:/cr=t:14.57%25,l:26.78%25,w:44.14%25,h:44.25%25/rs=w:388,h:292,cg:true,m/qt=q:31",
    description: "Our dark high quality Nigerian Charcoal",
  },
  {
    id: "cmjcdkcdekmcd",
    name: "Hibiscus Flower",
    image:
      "https://img1.wsimg.com/isteam/ip/1919f62b-8c9f-47b6-a247-7486da73ea0c/H.jpeg/:/cr=t:27.27%25,l:29.84%25,w:40.31%25,h:45.45%25/rs=w:388,h:292,cg:true,m/qt=q:31",
    description: "Dried hibiscus flower for export.",
  },
  {
    id: "cokmoicei",
    name: "Dried Ginger",
    image:
      "https://img1.wsimg.com/isteam/ip/1919f62b-8c9f-47b6-a247-7486da73ea0c/ginger.webp/:/cr=t:19.35%25,l:19.56%25,w:80.44%25,h:80.65%25/rs=w:388,h:292,cg:true,m/qt=q:31",
    description: "Organic Dried Ginger",
  },
  {
    id: "mckmookmce",
    name: "Cashew Nuts",
    image:
      "https://img1.wsimg.com/isteam/ip/1919f62b-8c9f-47b6-a247-7486da73ea0c/cashhheww.jpeg/:/cr=t:0%25,l:35.45%25,w:46.47%25,h:100%25/rs=w:388,h:292,cg:true/qt=q:31",
    description: "Organic Cashew Nuts.",
  },
  {
    id: "ckmwkmckc",
    name: "Soya Beans supply & Export",
    image:
      "https://img1.wsimg.com/isteam/ip/1919f62b-8c9f-47b6-a247-7486da73ea0c/soybeans-globexia-4.jpeg/:/cr=t:27.88%25,l:30.38%25,w:39.24%25,h:44.25%25/rs=w:388,h:292,cg:true,m/qt=q:31",
    description: "Soya Beans ready for supply & Export",
  },
];
export default function ProductShowcase() {
  return (
    <Carousel>
      {products.map((product) => (
        <Card
          key={product.id}
          className="transform transition-all duration-300 ease-in-out hover:scale-105 my-2 sm:my-3 md:my-4 cursor-pointer"
        >
          <CardContent className="p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md select-none"
              draggable={false}
            />
            <h3 className="text-base sm:text-lg font-semibold mt-2 sm:mt-3 md:mt-4">
              {product.name}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
              {product.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </Carousel>
  );
}
