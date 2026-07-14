require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");
const corsOptions = require("./config/cors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const userRoutes = require("./Routes/userRoutes");
const productRoutes = require("./Routes/productRoutes");
const cartRoutes = require("./Routes/cartRoutes");
const orderRoutes = require("./Routes/orderRoutes");
const webhookRoutes = require("./Routes/webhookRoutes");

// SaneGreenEnergy API
connectDB();

const app = express();

app.use(cors(corsOptions));
app.use(morgan("dev"));

// Mounted before express.json() — Paystack webhook signature verification needs the raw request body.
app.use("/api/webhooks", webhookRoutes);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "SaneGreenEnergy API is running 🌿" });
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
