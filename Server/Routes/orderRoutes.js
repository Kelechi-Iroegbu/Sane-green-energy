const express = require("express");
const router = express.Router();
const { createOrder, getMyOrders, getOrderById } = require("../Controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);
router.route("/").post(createOrder);
router.get("/mine", getMyOrders);
router.get("/:id", getOrderById);

module.exports = router;
