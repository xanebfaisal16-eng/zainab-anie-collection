import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  orderId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  items: { type: Array, required: true },
  subtotal: { type: Number, required: true },
  deliveryFee: { type: Number, required: true },
  grandTotal: { type: Number, required: true },
  status: { type: String, default: "Pending" },
  date: { type: String, required: true }
}, { timestamps: true });

const Order = model("Order", orderSchema);
export default Order;