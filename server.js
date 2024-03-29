import express from "express";
import bodyParser from "body-parser";
import createItemController from "./controller/createItem.js";
import createOrganiztionController from "./controller/createOrganization.js";
import createPricingController from "./controller/createPricing.js";
import getPriceController from "./controller/getPriceController.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

// import { calculatePrice } from "./services/pricingService.js"; // Assuming pricingService.js contains the logic for dynamic pricing
// import { fetchUsers } from "./services/price.js";
// import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 3000;
const swaggerDocument = YAML.load("./swagger/swagger.yaml");

app.use(bodyParser.json());
// Middleware
app.use(express.json());

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes

app.post("/create-item", createItemController);
app.post("/create-organization", createOrganiztionController);
app.post("/create-pricing", createPricingController);
app.post("/get-price", getPriceController);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
