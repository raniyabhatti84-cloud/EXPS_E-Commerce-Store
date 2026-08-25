const express = require("express");

const {
  createOrder,
  getUserOrders,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create Order
router.post("/", protect, createOrder);

// Get User Orders
router.get("/", protect, getUserOrders);

module.exports = router;