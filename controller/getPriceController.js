import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getPriceController = async (req, res) => {
  const { zone, organization_id, total_distance, item_type } = req.body;

  try {
    // Fetch the pricing information based on organization_id, item_id, and zone
    const pricing = await prisma.pricing.findFirst({
      where: {
        organization_id,
        zone,
      },
    });

    if (!pricing) {
      return res.status(404).json({ error: "Pricing not found" });
    }

    // Calculate total price based on pricing information and total_distance
    const { base_distance_in_km, km_price, fix_price } = pricing;
    let total_price = fix_price;

    if (total_distance > base_distance_in_km) {
      const additionalDistance = total_distance - base_distance_in_km;
      total_price += additionalDistance * km_price;
    }

    console.log("Total price calculated:", total_price);
    res.status(200).json({ total_price });
  } catch (error) {
    console.error("Error retrieving pricing:", error);
    res.status(500).json({ error: "Error retrieving pricing" });
  } finally {
    await prisma.$disconnect();
  }
};

export default getPriceController;
