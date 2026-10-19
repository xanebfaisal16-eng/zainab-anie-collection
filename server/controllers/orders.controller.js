import Order from "../models/orders.model.js";

// 1. Save new order (Checkout se call hoga)
const createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json({
            ok: true,
            message: "Order placed successfully!",
            order: newOrder
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: err.message });
    }
};

// 2. Fetch all orders (Admin Panel ke liye)
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 }); // Newest orders first
        res.status(200).json({
            ok: true,
            orders
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: err.message });
    }
};

export { createOrder, getAllOrders };