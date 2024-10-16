import { Card, CardContent } from "@/components/ui/card"
import { Product } from "@/types/all"
import Carousel from "./Carousel"
import Link from "next/link"

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
    id: "cnjavskcd",
    name: "Dark Nigerian Charcoal",
    image:
      "https://img1.wsimg.com/isteam/ip/1919f62b-8c9f-47b6-a247-7486da73ea0c/71A3MufPxzL._AC_SL1500_.jpg/:/cr=t:14.57%25,l:26.78%25,w:44.14%25,h:44.25%25/rs=w:388,h:292,cg:true,m/qt=q:31",
    description: "Our dark, high-quality Nigerian charcoal is produced using traditional methods that ensure a rich, dense, and long-lasting burn. Sourced from the heart of Nigeria, this charcoal is made from select hardwoods that provide a superior grilling experience. With minimal smoke and a consistent heat output, our charcoal is perfect for both commercial and home use. It enhances the flavor of your barbecued dishes, giving them a distinctive, smoky aroma. Ideal for grilling, smoking, and outdoor cooking, our charcoal is environmentally friendly and sustainably sourced, making it a premium choice for those who care about both quality and the planet. Experience the best of Nigerian charcoal and take your culinary creations to the next level.",
  },
  {
    id: "cmjcdkcdekmcd",
    name: "Hibiscus Flower",
    image:
      "https://img1.wsimg.com/isteam/ip/1919f62b-8c9f-47b6-a247-7486da73ea0c/H.jpeg/:/cr=t:27.27%25,l:29.84%25,w:40.31%25,h:45.45%25/rs=w:388,h:292,cg:true,m/qt=q:31",
    description: "Dried hibiscus flowers for export are carefully harvested and processed to maintain their vibrant color and rich flavor. Sourced from the fertile regions of Nigeria, these flowers are known for their high quality and potency. Hibiscus flowers are a popular ingredient in teas, beverages, and culinary dishes around the world due to their tangy taste and numerous health benefits, including being rich in antioxidants and vitamin C. Our dried hibiscus flowers are meticulously dried and packaged to ensure they retain their natural properties, making them an excellent choice for businesses looking to provide their customers with premium products. Whether used in refreshing summer drinks, wellness teas, or as a natural food colorant, our hibiscus flowers are sure to add a touch of exotic flavor and health benefits to any product line.",
  },
  {
    id: "cokmoicei",
    name: "Dried Ginger",
    image:
      "https://img1.wsimg.com/isteam/ip/1919f62b-8c9f-47b6-a247-7486da73ea0c/ginger.webp/:/cr=t:19.35%25,l:19.56%25,w:80.44%25,h:80.65%25/rs=w:388,h:292,cg:true,m/qt=q:31",
    description: "Our organic dried ginger is cultivated using sustainable farming practices, ensuring a high-quality product with a robust, spicy flavor. Free from harmful chemicals and pesticides, it’s an excellent choice for health-conscious consumers. Carefully dried to preserve its natural oils and pungency, our ginger is perfect for adding a zesty kick to culinary dishes, teas, and health remedies. Renowned for its numerous health benefits, including aiding digestion, reducing inflammation, and boosting the immune system, our organic dried ginger is a versatile ingredient that enhances both flavor and wellness. Packaged with care to maintain freshness, this ginger is ideal for export and meets the highest standards for organic products. Choose our organic dried ginger to bring a touch of spice and health benefits to your offerings.",
  },
  {
    id: "mckmookmce",
    name: "Cashew Nuts",
    image:
      "https://img1.wsimg.com/isteam/ip/1919f62b-8c9f-47b6-a247-7486da73ea0c/cashhheww.jpeg/:/cr=t:0%25,l:35.45%25,w:46.47%25,h:100%25/rs=w:388,h:292,cg:true/qt=q:31",
    description: "We have fresh cashew nuts that are a delightful snack, rich in flavor and nutrients. Handpicked and carefully processed, these nuts retain their natural sweetness and crunch, making them perfect for snacking or culinary use. They are packed with essential vitamins, minerals, and healthy fats that support heart health, boost energy levels, and promote overall wellness. Ideal for baking, cooking, or enjoying straight out of the bag, our cashew nuts are a versatile and delicious addition to your pantry. Enjoy the wholesome goodness of fresh cashew nuts in every bite.",
  },
  {
    id: "ckmwkmckc",
    name: "Soya Beans supply & Export",
    image:
      "https://img1.wsimg.com/isteam/ip/1919f62b-8c9f-47b6-a247-7486da73ea0c/soybeans-globexia-4.jpeg/:/cr=t:27.88%25,l:30.38%25,w:39.24%25,h:44.25%25/rs=w:388,h:292,cg:true,m/qt=q:31",
    description: "Soya beans are ready for supply and export, meticulously cultivated to meet high-quality standards. These beans are rich in protein, fiber, and essential nutrients, making them a versatile ingredient for a wide range of products. Ideal for use in food production, animal feed, and various industrial applications, our soya beans are carefully harvested and processed to ensure freshness and nutritional value. By choosing our soya beans, you're opting for a product that supports health and sustainability, perfect for both domestic and international markets. Whether you need bulk quantities or specific packaging options, we are equipped to meet your supply and export needs efficiently.",
  },
]

export default function ProductShowcase() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Carousel autoPlay={true} autoPlayInterval={2000}>
          {products.map((product) => (
            <Link href="/product" key={product.id} className="px-2">
              <Card className="bg-[#eee0cd] relative border-none shadow-none overflow-hidden transition-transform duration-300 hover:scale-105">
                <CardContent className="p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-[300px] md:h-[250px] object-cover"
                      draggable={false}
                    />
                  <h3 className="text-lg font-semibold text-[#2C5F2D] mb-1 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Carousel>
      </div>
    </div>
  )
}


// import { Card, CardContent } from "@/components/ui/card";
// import { Product } from "@/types/all";
// import Carousel from "./Carousel";
// import Link from "next/link";
// import { ShoppingBasket } from "lucide-react";

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
//     id: 'avocado-abc123',
//     name: 'Avocado',
//     image: '/images/avocado.webp',
//     description: 'Our fresh and creamy avocados are handpicked from the lush orchards of Nigeria, ensuring the highest quality and a rich, buttery texture. Ideal for salads, guacamole, and toast, they add a delightful flavor and are packed with essential nutrients and healthy fats.'
//   },
//   {
//     id: "cnjavskcd",
//     name: "Dark Nigerian Charcoal",
//     image:
//       "https://img1.wsimg.com/isteam/ip/1919f62b-8c9f-47b6-a247-7486da73ea0c/71A3MufPxzL._AC_SL1500_.jpg/:/cr=t:14.57%25,l:26.78%25,w:44.14%25,h:44.25%25/rs=w:388,h:292,cg:true,m/qt=q:31",
//     description: "Our dark high quality Nigerian Charcoal",
//   },
//   {
//     id: 'guava-def456',
//     name: 'Guava',
//     image: '/images/guava.webp',
//     description: 'Sourced from the sun-kissed groves of Nigeria, our juicy guavas offer a sweet aroma and a burst of tropical flavor. Rich in vitamin C and antioxidants, these fruits are perfect for snacking, smoothies, and adding a refreshing twist to desserts.'
//   },
//   {
//     id: "cmjcdkcdekmcd",
//     name: "Hibiscus Flower",
//     image:
//       "https://img1.wsimg.com/isteam/ip/1919f62b-8c9f-47b6-a247-7486da73ea0c/H.jpeg/:/cr=t:27.27%25,l:29.84%25,w:40.31%25,h:45.45%25/rs=w:388,h:292,cg:true,m/qt=q:31",
//     description: "Dried hibiscus flower for export.",
//   },
//   {
//     id: 'mango-jkl012',
//     name: 'Mango',
//     image: '/images/mangoes.webp',
//     description: 'Experience the delectable taste of our ripe mangoes, sourced from Nigeria’s finest orchards. These delicious fruits offer a sweet and tangy flavor that is perfect for enjoying fresh, adding to salads, or blending into smoothies. They are packed with vitamins, minerals, and a touch of sunshine in every bite.'
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
//     id: 'pumpkin-ghi789',
//     name: 'Pumpkin Seeds',
//     image: '/images/pumpkin_seeds.webp',
//     description: 'Our nutritious pumpkin seeds, harvested from fertile Nigerian fields, are ideal for pies, soups, and roasting. With their vibrant color and robust flavor, they are a versatile ingredient that brings warmth and richness to any dish, along with a host of vitamins and minerals.'
//   },
  
//   {
//     id: "ckmwkmckc",
//     name: "Soya Beans supply & Export",
//     image:
//       "https://img1.wsimg.com/isteam/ip/1919f62b-8c9f-47b6-a247-7486da73ea0c/soybeans-globexia-4.jpeg/:/cr=t:27.88%25,l:30.38%25,w:39.24%25,h:44.25%25/rs=w:388,h:292,cg:true,m/qt=q:31",
//     description: "Soya Beans ready for supply & Export",
//   },
// ];

// export default function ProductShowcase() {
//   return (
//     <div className="px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <Carousel desktopSlidesToShow={4} autoPlayInterval={2000}>
//           {products.map((product) => (
//             <Link href="/product" key={product.id} className="px-2">
//               <Card className="bg-[#eee0cd] border-0 relative rounded-none border-none shadow-none overflow-hidden transition-transform duration-300 hover:scale-105 h-[350px] flex flex-col items-center justify-center">
//                 <CardContent className="p-4 text-left w-full">
//                   <div className="relative mb-2 overflow-hidden w-44 h-44 mx-auto">
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="absolute inset-0 w-full h-full object-cover"
//                       draggable={false}
//                     />
//                   </div>
//                   <div className="absolute bottom-3">
//                     <h3 className="text-xl line-clamp-1  font-semibold text-[#2C5F2D] mb-1">
//                       {product.name}
//                     </h3>
//                     <p className="text-xs text-gray-600 line-clamp-1">
//                       {product.description}
//                     </p>
//                   </div>
//                 </CardContent>
//                 <div className="absolute top-4 left-4 bg-amber-800 p-1 rounded-full">
//                   <ShoppingBasket width={22} className="text-white" />
//                 </div>
//               </Card>
//             </Link>
//           ))}
//         </Carousel>
//       </div>
//     </div>
//   );
// }
