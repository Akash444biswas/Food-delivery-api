import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const createItemController = async (req, res) => {
  const { id, type, description } = req.body;

  try {
    // Check if the item already exists in the database
    const existingItem = await prisma.item.findUnique({
      where: { id },
    });

    if (existingItem) {
      return res.status(400).json({ error: "Item already exists" });
    }

    // If the item doesn't exist, create it
    const newItem = await prisma.item.create({
      data: {
        id,
        type,
        description,
      },
    });
    console.log("Item created:", newItem);
    res.status(201).json({ message: "Item created successfully", newItem });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ error: "Error creating item" });
  } finally {
    await prisma.$disconnect();
  }
};

export default createItemController;
