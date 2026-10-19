import express from "express";
import { createOrder, getAllOrders } from "../controllers/orders.controller.js";
import { verifyAdmin } from "../middleware/adminAuth.middleware.js"; // Admin check middleware

const router = express.Router();

// Customer order create kar sakta hai (Public route)
router.post("/orders", createOrder);

// Sirf Admin hi sare orders dekh sakta hai (Protected route)
router.get("/orders", verifyAdmin, getAllOrders);

export default router;