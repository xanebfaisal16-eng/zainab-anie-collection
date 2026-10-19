const puppeteer = require('puppeteer');
const mongoose = require('mongoose');

// MongoDB se connection (local connection with timeout handling)
mongoose.connect('mongodb://127.0.0.1:27017/za', {
  serverSelectionTimeoutMS: 5000 // 5 seconds timeout
})
  .then(() => console.log("MongoDB connected successfully!"))
  .catch(err => console.log("MongoDB connection error: Make sure MongoDB Compass/Service is running!"));

const productSchema = new mongoose.Schema({
  title: String,
  brand: String,
  price: Number,
  images: [String]
});

const Product = mongoose.model('Product', productSchema);

async function runScraper() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  console.log("Website khul rahi hai...");
  await page.goto('https://elan.pk/collections/tresor-1/products/l-astree-eb-39');

  // Data extract karna
  const productData = await page.evaluate(() => {
    const title = document.querySelector('h1')?.innerText || 'L’ASTRÉE (EB-39)';
    
    // Agar price page par nahi milti toh hum bridal product ke liye default high price set kar sakte hain
    let price = 125000; 

    // Saari main images uthana
    const images = Array.from(document.querySelectorAll('img'))
      .map(img => img.src)
      .filter(src => src.startsWith('http') && !src.includes('logo') && src.includes('shop/files'));

    return { title, price, images: images.slice(0, 3) };
  });

  console.log("Extracted Data:", productData);

  // Database mein save karne ki koshish
  try {
    const newProduct = new Product({
      title: productData.title,
      brand: 'Élan',
      price: productData.price,
      images: productData.images
    });

    await newProduct.save();
    console.log("Product successfully saved to MongoDB database!");
  } catch (dbError) {
    console.log("Database save karne mein masla aaya:", dbError.message);
  }

  await browser.close();
  await mongoose.connection.close();
}

runScraper();