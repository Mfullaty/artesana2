// import { Card, CardContent } from "@/components/ui/card"
// import { Product } from "@/types/all"
// import Carousel from "./Carousel"
// import Link from "next/link"

// const products: Product[] = [
//   {
//     id: "hcnjewkmce",
//     name: "Sesame Seeds",
//     image:
//       "https://img1.wsimg.com/isteam/ip/1919f62b-8c9f-47b6-a247-7486da73ea0c/sesame-seeds-globexia-1.jpeg/:/cr=t:30%25,l:32.26%25,w:35.47%25,h:40%25/rs=w:388,h:292,cg:true,m/qt=q:31",
//     description:
//       "Our Fresh Sesame Seeds are meticulously sourced from Nigeria, ensuring the highest quality and unparalleled freshness. These seeds are rich in flavor and packed with essential nutrients, making them a versatile addition to your culinary creations. Ideal for enhancing salads, bread, and various dishes, they bring both taste and health benefits to your table. Experience the authentic essence of Nigerian sesame seeds in every bite.",
//   },
//   {
//     id: "cnjavskcd",
//     name: "Dark Nigerian Charcoal",
//     image:
//       "https://img1.wsimg.com/isteam/ip/1919f62b-8c9f-47b6-a247-7486da73ea0c/71A3MufPxzL._AC_SL1500_.jpg/:/cr=t:14.57%25,l:26.78%25,w:44.14%25,h:44.25%25/rs=w:388,h:292,cg:true,m/qt=q:31",
//     description: "Our dark high quality Nigerian Charcoal",
//   },
//   {
//     id: "cmjcdkcdekmcd",
//     name: "Hibiscus Flower",
//     image:
//       "https://img1.wsimg.com/isteam/ip/1919f62b-8c9f-47b6-a247-7486da73ea0c/H.jpeg/:/cr=t:27.27%25,l:29.84%25,w:40.31%25,h:45.45%25/rs=w:388,h:292,cg:true,m/qt=q:31",
//     description: "Dried hibiscus flower for export.",
//   },
//   {
//     id: "cokmoicei",
//     name: "Dried Ginger",
//     image:
//       "https://img1.wsimg.com/isteam/ip/1919f62b-8c9f-47b6-a247-7486da73ea0c/ginger.webp/:/cr=t:19.35%25,l:19.56%25,w:80.44%25,h:80.65%25/rs=w:388,h:292,cg:true,m/qt=q:31",
//     description: "Organic Dried Ginger",
//   },
//   {
//     id: "mckmookmce",
//     name: "Cashew Nuts",
//     image:
//       "https://img1.wsimg.com/isteam/ip/1919f62b-8c9f-47b6-a247-7486da73ea0c/cashhheww.jpeg/:/cr=t:0%25,l:35.45%25,w:46.47%25,h:100%25/rs=w:388,h:292,cg:true/qt=q:31",
//     description: "Organic Cashew Nuts.",
//   },
//   {
//     id: "ckmwkmckc",
//     name: "Soya Beans supply & Export",
//     image:
//       "https://img1.wsimg.com/isteam/ip/1919f62b-8c9f-47b6-a247-7486da73ea0c/soybeans-globexia-4.jpeg/:/cr=t:27.88%25,l:30.38%25,w:39.24%25,h:44.25%25/rs=w:388,h:292,cg:true,m/qt=q:31",
//     description: "Soya Beans ready for supply & Export",
//   },
// ]

// export default function ProductShowcase() {
//   return (
//     <div className="bg-[#FDF7F2] py-16 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl sm:text-4xl font-bold text-[#2C5F2D] text-center mb-2">Explore Our Product Range</h2>
//         <p className="text-center text-gray-600 mb-12">From premium grains to diverse produce, our carefully curated selection of agro exports caters to your needs</p>
//         <Carousel autoPlayInterval={2000}>
//           {products.map((product) => (
//             <Link href="/product" key={product.id} className="px-2">
//               <Card className="bg-[#FDF7F2] border-none shadow-none overflow-hidden transition-transform duration-300 hover:scale-105">
//                 <CardContent className="p-4">
//                   <div className="relative mb-4 overflow-hidden" style={{ paddingBottom: '100%' }}>
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="absolute inset-0 w-full h-full object-cover"
//                       draggable={false}
//                     />
//                   </div>
//                   <h3 className="text-lg font-semibold text-[#2C5F2D] mb-1">{product.name}</h3>
//                   <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
//                 </CardContent>
//               </Card>
//             </Link>
//           ))}
//         </Carousel>
//       </div>
//     </div>
//   )
// }

import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/all";
import Carousel from "./Carousel";
import Link from "next/link";
import { ShoppingBasket } from "lucide-react";

const products: Product[] = [
  {
    id: "hcnjewkmce",
    name: "Sesame Seeds",
    image:
      "https://img1.wsimg.com/isteam/ip/1919f62b-8c9f-47b6-a247-7486da73ea0c/sesame-seeds-globexia-1.jpeg/:/cr=t:30%25,l:32.26%25,w:35.47%25,h:40%25/rs=w:388,h:292,cg:true,m/qt=q:31",
    description:
      "Our Fresh Sesame Seeds are meticulously sourced from Nigeria, ensuring the highest quality and unparalleled freshness. These seeds are rich in flavor and packed with essential nutrients, making them a versatile addition to your culinary creations. Ideal for enhancing salads, bread, and various dishes, they bring both taste and health benefits to your table. Experience the authentic essence of Nigerian sesame seeds in every bite.",
  },
  {
    id: 'avocado-abc123',
    name: 'Avocado',
    image: '/images/avocado.webp',
    description: 'Our fresh and creamy avocados are handpicked from the lush orchards of Nigeria, ensuring the highest quality and a rich, buttery texture. Ideal for salads, guacamole, and toast, they add a delightful flavor and are packed with essential nutrients and healthy fats.'
  },
  {
    id: "cnjavskcd",
    name: "Dark Nigerian Charcoal",
    image:
      "https://img1.wsimg.com/isteam/ip/1919f62b-8c9f-47b6-a247-7486da73ea0c/71A3MufPxzL._AC_SL1500_.jpg/:/cr=t:14.57%25,l:26.78%25,w:44.14%25,h:44.25%25/rs=w:388,h:292,cg:true,m/qt=q:31",
    description: "Our dark high quality Nigerian Charcoal",
  },
  {
    id: 'guava-def456',
    name: 'Guava',
    image: '/images/guava.webp',
    description: 'Sourced from the sun-kissed groves of Nigeria, our juicy guavas offer a sweet aroma and a burst of tropical flavor. Rich in vitamin C and antioxidants, these fruits are perfect for snacking, smoothies, and adding a refreshing twist to desserts.'
  },
  {
    id: "cmjcdkcdekmcd",
    name: "Hibiscus Flower",
    image:
      "https://img1.wsimg.com/isteam/ip/1919f62b-8c9f-47b6-a247-7486da73ea0c/H.jpeg/:/cr=t:27.27%25,l:29.84%25,w:40.31%25,h:45.45%25/rs=w:388,h:292,cg:true,m/qt=q:31",
    description: "Dried hibiscus flower for export.",
  },
  {
    id: 'mango-jkl012',
    name: 'Mango',
    image: '/images/mangoes.webp',
    description: 'Experience the delectable taste of our ripe mangoes, sourced from Nigeria’s finest orchards. These delicious fruits offer a sweet and tangy flavor that is perfect for enjoying fresh, adding to salads, or blending into smoothies. They are packed with vitamins, minerals, and a touch of sunshine in every bite.'
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
    id: 'pumpkin-ghi789',
    name: 'Pumpkin Seeds',
    image: '/images/pumpkin_seeds.webp',
    description: 'Our nutritious pumpkin seeds, harvested from fertile Nigerian fields, are ideal for pies, soups, and roasting. With their vibrant color and robust flavor, they are a versatile ingredient that brings warmth and richness to any dish, along with a host of vitamins and minerals.'
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
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Carousel desktopSlidesToShow={4} autoPlayInterval={2000}>
          {products.map((product) => (
            <Link href="/product" key={product.id} className="px-6 md:px-2">
              <Card className="bg-secondary border-0 relative rounded-none border-none shadow-none overflow-hidden transition-transform duration-300 hover:scale-105 h-[350px] flex flex-col items-center justify-center">
                <CardContent className="p-4 text-left w-full">
                  <div className="relative mb-2 overflow-hidden w-44 h-44 mx-auto">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                  <div className="absolute bottom-3">
                    <h3 className="text-xl line-clamp-1  font-semibold text-[#2C5F2D] mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-1">
                      {product.description}
                    </p>
                  </div>
                </CardContent>
                <div className="absolute top-4 left-4 bg-amber-800 p-1 rounded-full">
                  <ShoppingBasket width={22} className="text-white" />
                </div>
              </Card>
            </Link>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
