const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/", async (req, res) => {
  const order = new Order(req.body);
  const saved = await order.save();
  res.json(saved);
});

module.exports = router;
