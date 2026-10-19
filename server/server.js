/* Step 1: Import necessary packages and modules */
import express from "express";
import mongoose from "mongoose";
import prodRoute from "./routes/routes.products.js";
import orderRoute from "./routes/routes.orders.js";
import morgan from "morgan";
import cors from "cors";
import { PORT, DB_CLOUD_URL } from "./config/config.js";
import Order from "./models/orders.model.js";
import Newsletter from "./models/Newsletter.js";
import bankRoute from "./routes/bankRoutes.js";

/* Step 2: Create an instance of Express */
const app = express();

const port = PORT || 9000;

/* Step 3: Important middleware configuration */
app.use(express.json()); // Allows incoming JSON data from client
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(morgan("dev")); // Logs incoming HTTP requests to console

/* Step 4: Database Connection with Proper Error Handling */
mongoose.connect(DB_CLOUD_URL)
  .then(() => {
    console.log("Database connected successfully! 🎉");
  })
  .catch((err) => {
    console.error("DB is fail to connect:", err.message);
  });

/* Admin Verification Middleware for Protected Routes */
const verifyAdmin = (req, res, next) => {
  const adminEmail = req.headers.email || req.query.email;
  
  if (adminEmail === "xanebfaisal16@gmail.com") {
    next(); // Proceed if the user is verified admin
  } else {
    res.status(403).json({ ok: false, message: "Access Denied: Authorized Admin Only!" });
  }
};

/* Step 5: API Routes Configuration */
// Product routes (Public and Admin)
app.use("/api/v1", prodRoute);

// Order routes (Mounted publicly so customers can checkout without 403 error)
app.use("/api/v1", orderRoute);
app.use("/api/v1", bankRoute);

// ==========================================
// NEWSLETTER SUBSCRIPTION API ROUTE
// ==========================================
app.post('/api/v1/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "This email is already subscribed!" });
    }

    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();

    res.status(201).json({ success: true, message: "Successfully subscribed to newsletter!" });
  } catch (error) {
    console.error("Newsletter error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ==========================================
// ORDER STATUS UPDATE API ROUTE (Protected for Admin)
// ==========================================
app.put("/api/v1/orders/:id/status", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findOneAndUpdate(
      { $or: [{ id: id }, { _id: id }] },
      { status: status },
      { new: true }
    );

    if (updatedOrder) {
      res.json({ ok: true, message: "Order status updated successfully", order: updatedOrder });
    } else {
      res.status(404).json({ ok: false, error: "Order not found" });
    }
  } catch (err) {
    console.error("Error updating order status in DB:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

/* Simple test endpoint for products */
app.get("/api/products", (req, res) => {
  res.send("I am going to fetch all products from database");
});

/* Step 6: Start the Express Server */
app.listen(port, () => {
  console.log(`Your server is running on port ${port}`);
});