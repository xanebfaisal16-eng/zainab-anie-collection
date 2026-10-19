import mongoose from "mongoose";

const bankDetailsSchema = new mongoose.Schema({
  bankName: { type: String, required: true },
  accountTitle: { type: String, required: true },
  accountNumber: { type: String, required: true },
  iban: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("BankDetails", bankDetailsSchema);