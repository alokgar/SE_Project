const express = require("express");
const mongoose = require("mongoose");
var ObjectID = require("mongodb").ObjectID;
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Payment = require("../../models/Payment");
const auth = require("../../middleware/auth");

async function getPaymentByid(id) {
  const payment = await Payment.findById(id).populate({
    path: "employee_id customer_id",
  });
  return payment;
}

// @route     GET api/payments
// @desc      Get all payments
// @access    Private
router.get("/", async (req, res) => {
  try {
    const payment = await Payment.find()
      .sort({ date: -1 })
      .populate({ path: "employee_id customer_id " });

    if (!payment) {
      return res.status(400).json({ msg: "No Payments found !" });
    }
    res.json(payment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET api/payments/emp
// @desc      Get payment by employee
// @access    Private
router.get("/emp", auth, async (req, res) => {
  try {
    console.log(req.user.id);
    const payment = await Payment.find({ employee_id: req.user.id })
      .sort({ date: -1 })
      .populate({ path: "employee_id customer_id" });
    if (!payment) {
      return res.status(400).json({ msg: "No Payment found !" });
    }
    res.json(payment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @route     GET api/payments/:id
// @desc      Get payment by id
// @access    Private
router.get("/:id", async (req, res) => {
  try {
    const payment = await getPaymentByid(req.params.id);
    if (!payment) {
      return res.status(400).json({ msg: "No Payment found !" });
    }
    res.json(payment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET api/payments/:id/customer
// @desc      Get payment by customer_id
// @access    Private
router.get("/:id/customer", async (req, res) => {
  try {
    const payment = await Payment.find({ customer_id: req.params.id })
      .sort({ date: -1 })
      .populate({ path: "employee_id customer_id" });
    if (!payment) {
      return res.status(400).json({ msg: "No Payment found !" });
    }
    res.json(payment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     POST api/payments
// @desc      Place an payment
// @access    Private

router.post("/", auth, async (req, res) => {
  try {
    const { customer_id, amount, date } = req.body;
    let employee_id = req.user.id;

    let placed_payment = new Payment({
      customer_id,
      employee_id,
      amount,
      date,
    });
    await placed_payment.save();

    res.json(placed_payment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     PUT api/payment/:id
// @desc      Update an payment
// @access    Private
router.put("/:id", async (req, res) => {
  try {
    const { customer_id, amount, date } = req.body;

    const payment = await getPaymentByid(req.params.id);
    if (!payment) {
      return res.status(400).json({ msg: "No Payment found !" });
    }

    const newPayment = {};
    if (customer_id) newPayment.customer_id = customer_id;
    if (payment) newPayment.amount = amount;
    if (date) newPayment.date = date;
    let up_payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { $set: newPayment },
      { new: true }
    );

    res.json(up_payment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     DELETE api/payment/:id
// @desc      Delete payment
// @access    Private
router.delete("/:id", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ msg: "Payment not found" });

    await Payment.findByIdAndRemove(req.params.id);

    res.json({ msg: "Payment removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
