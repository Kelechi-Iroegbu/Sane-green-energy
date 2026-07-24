const express = require("express");
const router = express.Router();
const { createOrder, getMyOrders, getOrderById, verifyPayment, getOrderReceipt } = require("../Controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);
router.route("/").post(createOrder);
router.get("/mine", getMyOrders);
router.get("/verify/:reference", verifyPayment);
router.get("/:id/receipt", getOrderReceipt);
router.get("/:id", getOrderById);

module.exports = router;
