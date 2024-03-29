import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createOrganizationController = async (req, res) => {
  const { id, name } = req.body;

  try {
    // Check if the organization already exists in the database
    const existingOrganization = await prisma.organization.findUnique({
      where: { id },
    });

    if (existingOrganization) {
      return res.status(400).json({ error: "Organization already exists" });
    }

    // If the organization doesn't exist, create it
    const newOrganization = await prisma.organization.create({
      data: { id, name },
    });
    console.log("Organization created:", newOrganization);
    res
      .status(201)
      .json({ message: "Organization created successfully", newOrganization });
  } catch (error) {
    console.error("Error creating organization:", error);
    res.status(500).json({ error: "Error creating organization" });
  } finally {
    await prisma.$disconnect();
  }
};

export default createOrganizationController;
