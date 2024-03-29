-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pricing" (
    "organization_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "zone" TEXT NOT NULL,
    "base_distance_in_km" INTEGER NOT NULL,
    "km_price" DOUBLE PRECISION NOT NULL,
    "fix_price" INTEGER NOT NULL,

    CONSTRAINT "Pricing_pkey" PRIMARY KEY ("organization_id","item_id","zone")
);

-- AddForeignKey
ALTER TABLE "Pricing" ADD CONSTRAINT "Pricing_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pricing" ADD CONSTRAINT "Pricing_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
