const express = require("express");

const {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Add product to cart
router.post("/add", protect, addToCart);

// Get user cart
router.get("/", protect, getCart);

// Update cart item
router.put("/:productId", protect, updateCartItem);

// Remove product from cart
router.delete("/:productId", protect, removeFromCart);

// Clear cart
router.delete("/", protect, clearCart);

module.exports = router;