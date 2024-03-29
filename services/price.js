const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function getItemData() {
  try {
    const items = await prisma.item.findMany();
    console.log(items);
  } catch (error) {
    console.error("Error fetching item data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

getItemData();
