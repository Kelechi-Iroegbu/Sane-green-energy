// Run with: node seed.js   (after setting up .env)
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Product = require("./Models/Product");

const products = [
  {
    name: "EcoMax 450W Solar Panel",
    slug: "ecomax-450w-solar-panel",
    description: "High-efficiency monocrystalline panel with 22% efficiency.",
    category: "Solar Panels",
    brand: "EcoMax",
    image: "/images/product-panel.jpg",
    price: 185000,
    originalPrice: 219000,
    countInStock: 50,
    rating: 4.8,
    numReviews: 124,
    featured: true,
  },
  {
    name: "PowerVault 10kWh Battery",
    slug: "powervault-10kwh-battery",
    description: "Lithium-ion home battery for whole-home backup.",
    category: "Batteries",
    brand: "PowerVault",
    image: "/images/product-battery.jpg",
    price: 3800000,
    originalPrice: 4300000,
    countInStock: 12,
    rating: 4.9,
    numReviews: 87,
    featured: true,
  },
  {
    name: "InverGen 5kW Hybrid Inverter",
    slug: "invergen-5kw-hybrid-inverter",
    description: "Hybrid inverter with grid-tie and battery backup support.",
    category: "Inverters",
    brand: "InverGen",
    image: "/images/product-inverter.jpg",
    price: 950000,
    originalPrice: 1100000,
    countInStock: 20,
    rating: 4.7,
    numReviews: 56,
    featured: true,
  },
  {
    name: "SunCharge Portable 200W",
    slug: "suncharge-portable-200w",
    description: "Foldable solar charger for camping and emergencies.",
    category: "Chargers",
    brand: "SunCharge",
    image: "/images/product-charger.jpg",
    price: 145000,
    originalPrice: 179000,
    countInStock: 80,
    rating: 4.6,
    numReviews: 210,
    featured: true,
  },
];

(async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Seeded products");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
