// apply the middleware when auth works fine
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");
const Product = require("../../models/Product");
const Category = require("../../models/Category");

// @route     GET api/products
// @desc      Get all users products
// @access    Private
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({}).populate("category_id");
    res.json(products);
  } catch (err) {
    console.error(err.message);

    // return res
    // .status(400)
    // .json({ errors: [{ msg: 'You have not been verified by administrator' }] });

    res.status(500).send("Server Error");
  }
});

// @route     POST api/contacts
// @desc      Add new contact
// @access    Private
router.post("/", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, description, category_name } = req.body;
  try {
    const category = await Category.findOne({ name: category_name });
    if (!category) return res.status(404).json({ msg: "category not found" });

    const newProduct = new Product({
      name: name,
      description: description,
      category_id: category._id,
    });
    const product = await newProduct.save();

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     PUT api/products/:id
// @desc      Update product
// @access    Private
router.put("/:id", async (req, res) => {
  const { name, description, category_id } = req.body;

  // Build product object
  const productFields = {};
  if (name) productFields.name = name;
  if (description) productFields.description = description;
  if (category_id) productFields.category_id = category_id;

  try {
    let product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ msg: "product not found" });

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: productFields },
      { new: true }
    );

    res.json(product);
  } catch (err) {
    console.error(er.message);
    res.status(500).send("Server Error");
  }
});

// @route     DELETE api/products/:id
// @desc      Delete contact
// @access    Private
router.delete("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ msg: "Product not found" });

    await Product.findByIdAndRemove(req.params.id);

    res.json({ msg: "product removed" });

    // res.json({msg: 'Product removed'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
