const express = require("express");
const mongoose = require("mongoose");
var ObjectID = require("mongodb").ObjectID;
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Order = require("../../models/Order");
const Product = require("../../models/Product");
const Size = require("../../models/Size");
const auth = require("../../middleware/auth");
const Stock = require("../../models/Stock");

async function getOrderByid(id) {
  const order = await Order.findById(id).populate({
    path: "employee_id customer_id details.product_id details.size_id",
    populate: "category_id",
  });
  return order;
}

// @route     GET api/orders
// @desc      Get all orders
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    console.log(req.user);
    const order = await Order.find().sort({ order_date: -1 }).populate({
      path: "employee_id customer_id details.product_id details.size_id",
      populate: "category_id",
    });

    if (!order) {
      return res.status(400).json({ msg: "No Orders found !" });
    }
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET api/orders
// @desc      Get all orders made by employee
// @access    Private
router.get("/emp", auth, async (req, res) => {
  try {
    console.log(req.user);
    const order = await Order.find({ employee_id: req.user.id })
      .sort({ order_date: -1 })
      .populate({
        path: "employee_id customer_id details.product_id details.size_id",
        populate: "category_id",
      });

    if (!order) {
      return res.status(400).json({ msg: "No Orders found !" });
    }
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET api/orders/:id
// @desc      Get order by id
// @access    Private
router.get("/:id", async (req, res) => {
  try {
    const order = await getOrderByid(req.params.id);
    if (!order) {
      return res.status(400).json({ msg: "No Order found !" });
    }
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET api/orders/:id/customer
// @desc      Get order by customer_id
// @access    Private
router.get("/:id/customer", async (req, res) => {
  try {
    const order = await Order.find({ customer_id: req.params.id }).populate({
      path: "employee_id customer_id details.product_id details.size_id",
      populate: "category_id",
    });

    var c_id = new ObjectID(req.params.id);

    const prod_wise_order = await Order.aggregate([
      { $match: { customer_id: c_id } },
      { $unwind: "$details" },
      {
        $lookup: {
          from: "sizes",
          localField: "details.size_id",
          foreignField: "_id",
          as: "details.size_type",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "details.product_id",
          foreignField: "_id",
          as: "details.product_name",
        },
      },
      { $unwind: "$details.size_type" },
      { $unwind: "$details.product_name" },
      {
        $group: {
          _id: {
            product_id: "$details.product_id",
            size_id: "$details.size_id",
          },
          quantity: { $sum: "$details.quantity" },
          packing_type: { $last: "$details.size_type.packing_type" },
          product_name: { $last: "$details.product_name.name" },
        },
      },
    ]);
    if (!order) {
      return res.status(400).json({ msg: "No Orders found !" });
    }
    res.json({ order: order, prod_wise_order: prod_wise_order });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//--------------------------------------------------------------------------------------------------------------------------------------------------------
// @route     POST api/orders
// @desc      Place an order
// @access    Private
// req : { customer_id : ------, detail: [ { items }]}
router.post("/", async (req, res) => {
  try {
    const { customer_id, details, employee_id } = req.body;

    let placed_order = new Order({ details, customer_id, employee_id });
    let order = await placed_order.save();

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     PUT api/order/:id
// @desc      Update an order
// @access    Private
// req : { customer_id : ------, detail: [ { items }]}
router.put("/:id", async (req, res) => {
  try {
    const { customer_id, details } = req.body;

    const order = await getOrderByid(req.params.id);
    if (!order) {
      return res.status(400).json({ msg: "No Order found !" });
    }

    const newOrder = {};
    if (customer_id) newOrder.customer_id = customer_id;
    if (details) newOrder.details = details;

    let up_order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: newOrder },
      { new: true }
    );

    res.json(up_order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     DELETE api/order/:id
// @desc      Delete order
// @access    Private
router.delete("/:id", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: "Order not found" });

    await Order.findByIdAndRemove(req.params.id);

    res.json({ msg: "Order removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     POST api/order/:id/confirm-----------------
// @desc      confirm an order
// @access    Private
router.post("/:id/confirm", async (req, res) => {
  try {
    const order = await getOrderByid(req.params.id);
    if (!order || order.length === 0) {
      return res.status(400).json({ msg: "No Order found !" });
    }

    let up_order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "Confirmed" },
      { new: true }
    );

    res.json({ msg: "Order Confirmed", up_order });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/:id/dispatch", async (req, res) => {
  try {
    const order = await getOrderByid(req.params.id);
    if (!order || order.length === 0) {
      return res.status(400).json({ msg: "No Order found !" });
    }
    let d = Date.now();
    let up_order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: "Dispatched",
        dispatch_num: req.body.dispatch_num,
        dispatched_date: d,
      },
      { new: true }
    );

    req.body.details.forEach(async (element) => {
      let stock = await Stock.findOne({
        product_id: element.product_id._id,
        size_id: element.size_id._id,
      });
      // console.log(stock);
      if (stock) {
        let newQ = stock.quantity - element.quantity;
        let s = await Stock.findByIdAndUpdate(
          stock._id,
          { $set: { quantity: newQ } },
          { new: true }
        );
      }
    });

    res.json({ msg: "Order Dispatched" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
