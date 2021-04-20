// apply the middleware when auth works fine
// change the address when address is attached
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");
const Stock = require("../../models/Stock");
const Product = require("../../models/Product");
const Size = require("../../models/Size");
const Production_details = require("../../models/Production_details");

// @route     GET api/stock
// @desc      Get all stocks
// @access    Private
router.get("/", async (req, res) => {
  try {
    const stocks = await Stock.find({}).populate("product_id size_id");
    res.json(stocks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     POST api/stock
// @desc      Add new stock
// @access    Private
router.post("/", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { price, quantity, product_name, size_packing_type } = req.body;
  try {
    const product = await Product.findOne({ name: product_name });
    if (!product) return res.status(404).json({ msg: "product not found" });

    const size = await Size.findOne({ packing_type: size_packing_type });
    if (!size) return res.status(404).json({ msg: "size not found" });

    const newStock = new Stock({
      price,
      quantity,
      product_id: product._id,
      size_id: size._id,
    });
    const stock = await newStock.save();
    res.json(stock);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     PUT api/stock/:id
// @desc      Update stock
// @access    Private
router.put("/:id", async (req, res) => {
  const { price, quantity, product_name, size_packing_type } = req.body;

  try {
    let stock = await Stock.findById(req.params.id);
    if (!stock) return res.status(404).json({ msg: "stock not found" });
    // Build product object
    const stockFields = {};
    const newProduction_deatils = {};
    if (price) {
      stockFields.price = price;
      stockFields.last_update = Date.now();
    }
    if (quantity) {
      stockFields.quantity = quantity;
      stockFields.last_update = Date.now();
    }
    if (product_name) {
      const found_product = await Product.findOne({ name: product_name });
      if (!found_product)
        return res.status(404).json({ msg: "product not found" });
      stockFields.product_id = found_product._id;
      newProduction_deatils.product_id = found_product._id;
    }
    if (size_packing_type) {
      const found_size = await Size.findOne({
        packing_type: size_packing_type,
      });
      if (!found_size) return res.status(404).json({ msg: "size not found" });
      stockFields.size_id = found_size._id;
      newProduction_deatils.size_id = found_size._id;
    }

    newProduction_deatils.prev_quantity = stock.quantity;
    newProduction_deatils.new_quantity = quantity;

    const new_prod = new Production_details(newProduction_deatils);
    await new_prod.save();

    stock = await Stock.findByIdAndUpdate(
      req.params.id,
      { $set: stockFields },
      { new: true }
    );

    res.json(stock);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route     DELETE api/supplier/:id
// @desc      Delete contact
// @access    Private
router.delete("/:id", async (req, res) => {
  try {
    let stock = await Stock.findById(req.params.id);

    if (!stock) return res.status(404).json({ msg: "stock not found" });

    await Stock.findByIdAndRemove(req.params.id);

    res.json({ msg: "Stock removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
