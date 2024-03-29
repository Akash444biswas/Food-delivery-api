// services/pricingService.js

import { PrismaClient } from "@prisma/client";

// Initialize Prisma client outside of the function
const prisma = new PrismaClient();

const calculatePrice = async ({
  zone,
  organization_id,
  total_distance,
  item_type,
}) => {
  try {
    console.log("Parameters:", {
      zone,
      organization_id,
      total_distance,
      item_type,
    });

    // Query the database for pricing information
    const pricing = await prisma.pricing.findMany({
      where: {
        organization_id,
        zone,
        item: {
          type: item_type,
        },
      },
    });

    // fetch food

    const fetchUsers = async (req, res) => {
      console.log("fetchUsers:", req.body);
      const users = await prisma.user.findMany({
        select: {
          _count: {
            select: {
              post: true,
              comment: true,
            },
          },
        },
      });

      return res.json({ status: 200, data: users });
    };
   // console.log("fetchUsers:", fetchUsers);
    console.log("Pricing:", pricing);

    // Check if pricing information was found
    if (!pricing || pricing.length === 0) {
      // throw new Error("Pricing not found for the given parameters");
    }

    // Extract pricing details
    // const { base_distance_in_km, km_price, fix_price } = pricing[0]; // Assuming you expect only one pricing entry

    // Calculate total price based on pricing details and total distance
    let totalPrice = 10;
    // if (total_distance > base_distance_in_km) {
    //   const additionalDistance = total_distance - base_distance_in_km;
    //   totalPrice += additionalDistance * km_price;
    // }

    // Convert total price to cents
    return totalPrice * 100;
  } catch (error) {
    console.log("Error:", error);
    // throw new Error(`Error calculating price: ${error.message}`);
  }
};

export { calculatePrice };
