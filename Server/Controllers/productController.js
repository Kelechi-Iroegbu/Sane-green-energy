const asyncHandler = require("express-async-handler");
const Product = require("../Models/Product");

// GET /api/products
const getProducts = asyncHandler(async (req, res) => {
  const { category, search, featured } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (featured) filter.featured = featured === "true";
  if (search) filter.name = { $regex: search, $options: "i" };
  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json(products);
});

// GET /api/products/:id
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(product);
});

// POST /api/products  (admin)
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

// PUT /api/products/:id  (admin)
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(product);
});

// DELETE /api/products/:id (admin)
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json({ message: "Product removed" });
});

// GET /api/products/categories
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $project: { _id: 0, name: "$_id", count: 1 } },
    { $sort: { name: 1 } },
  ]);
  res.json(categories);
});

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getCategories };
