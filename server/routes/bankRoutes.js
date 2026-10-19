import express from "express";
import BankDetails from "../models/BankDetails.js";

const router = express.Router();

// Get Bank Details (Public - checkout ke liye)
router.get("/bank-details", async (req, res) => {
  try {
    let details = await BankDetails.findOne();
    if (!details) {
      // Agar pehle se koi details na ho toh default return karein
      details = {
        bankName: "Meezan Bank Limited",
        accountTitle: "Zainab & Ani Haute Couture",
        accountNumber: "0123-9876543210",
        iban: "PK03MEZN0001239876543210"
      };
    }
    res.status(200).json({ ok: true, details });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Update/Save Bank Details (Admin ke liye)
router.post("/bank-details", async (req, res) => {
  try {
    const { bankName, accountTitle, accountNumber, iban } = req.body;
    
    // Purani details delete kar ke nayi save kar dein taake hamesha aik hi record rahay
    await BankDetails.deleteMany({});
    
    const newDetails = new BankDetails({ bankName, accountTitle, accountNumber, iban });
    await newDetails.save();

    res.status(200).json({ ok: true, message: "Bank details updated successfully!", details: newDetails });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

export default router;