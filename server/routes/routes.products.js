/* Step 1: Express import */
import express from "express";
import * as prod from "../controllers/controller.products.js";

/* Step 2: Create router */
const prodRoute = express.Router();

// Routes for all products
prodRoute.route("/products")
    .get(prod.fetchAllProducts)
    .post(prod.addNewProducts);

// Routes for single product by ID
prodRoute.route("/products/:id")
    .get(prod.getProduct)
    .put(prod.updateProduct)
    .delete(prod.deleteProduct);

export default prodRoute;