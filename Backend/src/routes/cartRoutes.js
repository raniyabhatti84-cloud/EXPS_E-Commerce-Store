const express = require("express");

const {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

const router = express.Router();

// Add product to cart
router.post("/add", addToCart);

// Get user cart
router.get("/:userId", getCart);

// Update cart item quantity
router.put("/:userId/:productId", updateCartItem);

// Remove product from cart
router.delete("/:userId/:productId", removeFromCart);

// Clear cart
router.delete("/:userId", clearCart);

module.exports = router;