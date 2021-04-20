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

// @route     GET api/sales
// @desc      Get order by customer_id
// @access    Private
router.get("/", async (req, res) => {
  try {
    const con_order = await Order.find({ status: "Confirmed" }).populate({
      path: "employee_id customer_id details.product_id details.size_id",
      populate: "category_id",
    });
    const pen_order = await Order.find({ status: "Pending" }).populate({
      path: "employee_id customer_id details.product_id details.size_id",
      populate: "category_id",
    });

    const dis_order = await Order.find({ status: "Dispatched" }).populate({
      path: "employee_id customer_id details.product_id details.size_id",
      populate: "category_id",
    });

    const prodWiseOrder = await Order.aggregate([
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
            status: "$status",
          },
          quantity: { $sum: "$details.quantity" },
          packing_type: { $last: "$details.size_type.packing_type" },
          product_name: { $last: "$details.product_name.name" },
          unit: { $last: "$details.size_type.unit" },
        },
      },
    ]);

    if (!con_order || !dis_order || !pen_order) {
      return res.status(400).json({ msg: "No Orders found !" });
    }

    res.json({
      con_order: con_order,
      dis_order: dis_order,
      pen_order: pen_order,
      prod_wise_order: prodWiseOrder,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
