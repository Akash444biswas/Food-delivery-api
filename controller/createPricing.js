import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createPricingController = async (req, res) => {
  const {
    organization_id,
    item_id,
    zone,
    base_distance_in_km,
    km_price,
    fix_price,
  } = req.body;

  try {
    // Check if the pricing already exists in the database
    const existingPricing = await prisma.pricing.findFirst({
      where: {
        organization_id,
        item_id,
        zone,
        base_distance_in_km,
        km_price,
        fix_price,
      },
    });

    if (existingPricing) {
      return res.status(400).json({ error: "Pricing already exists" });
    }

    // If the pricing doesn't exist, create it
    const newPricing = await prisma.pricing.create({
      data: {
        organization_id,
        item_id,
        zone,
        base_distance_in_km,
        km_price,
        fix_price,
      },
    });
    console.log("Pricing created:", newPricing);
    res
      .status(201)
      .json({ message: "Pricing created successfully", newPricing });
  } catch (error) {
    console.error("Error creating pricing:", error);
    res.status(500).json({ error: "Error creating pricing" });
  } finally {
    await prisma.$disconnect();
  }
};

export default createPricingController;
