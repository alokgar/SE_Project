const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Production_details = require("../../models/Production_details");
const Product = require("../../models/Product");
const Size = require("../../models/Size");

// @route     GET api/production_details
// @desc      Get all production_details
// @access    Private
router.get("/", async (req, res) => {
  try {
    const production_details = await Production_details.find({})
      .sort({ date: -1 })
      .populate("product_id size_id");
    res.json(production_details);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     POST api/production_details
// @desc      Add new production_details
// @access    Private
router.post("/", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    product_name,
    size_packing_type,
    prev_quantity,
    new_quantity,
  } = req.body;
  try {
    const product = await Product.findOne({ name: product_name });
    if (!product) return res.status(404).json({ msg: "product not found" });

    const size = await Size.findOne({ packing_type: size_packing_type });
    if (!size) return res.status(404).json({ msg: "size not found" });

    const newProduction_details = new Production_details({
      product_id: product._id,
      size_id: size._id,
      prev_quantity,
      new_quantity,
    });
    const production_details = await newProduction_details.save();
    res.json(production_details);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
