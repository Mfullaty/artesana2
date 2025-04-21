import { productsData } from "../data/products-data";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Starting database seeding...");

    // First, delete all products
    // const deleteResult = await prisma.product.deleteMany({});

    // console.log(
    //   `Successfully deleted ${deleteResult.count} products from the database`
    // );

    // Then, create new products (commented out as requested)
      await prisma.product.createMany({
        data: productsData,
      });

      
        // await prisma.product.create({
        //   data: productsData[0],
        // })

    // console.log(`Successfully created ${productsData.length} products in the database`);

    console.log("Database seeding completed successfully");
  } catch (error) {
    console.error("Error during database operation:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
