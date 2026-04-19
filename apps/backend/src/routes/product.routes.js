const express = require("express");
const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  const products = [
    { id: 1, name: "Basic", price: 0, features: ["Free plan"] },
    { id: 2, name: "Starter", price: 120, features: ["Feature A", "Feature B"] },
    { id: 3, name: "Pro", price: 240, features: ["Feature A", "B", "C"] },
    { id: 4, name: "Premium", price: 300, features: ["All features"] },
  ];

  res.json(products);
});

module.exports = router;