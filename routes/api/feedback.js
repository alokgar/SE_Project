const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Feedback = require("../../models/Feedback");
const auth = require("../../middleware/auth");

async function getfeedbackByid(id) {
  const feed = await Feedback.findById(id).populate("employee_id");
  return feed;
}

// @route     GET api/feedback
// @desc      Get all feedback
// @access    Private
router.get("/", async (req, res) => {
  try {
    const feeds = await Feedback.find().populate("employee_id");

    if (!feeds) {
      return res.status(400).json({ msg: "No Feedbacks found !" });
    }
    res.json(feeds);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET api/feedback/emp
// @desc      Get all feedback of an employee
// @access    Private
router.get("/emp", auth, async (req, res) => {
  try {
    const e_id = req.user.id;
    const feeds = await Feedback.find({ employee_id: e_id }).populate(
      "employee_id"
    );
    if (!feeds) {
      return res.status(400).json({ msg: "No Feedbacks found !" });
    }
    res.json(feeds);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET api/feedback/:id
// @desc      Get feedback by id
// @access    Private
router.get("/:id", async (req, res) => {
  try {
    const feed = await getfeedbackByid(req.params.id);
    if (!feed || feed.length === 0) {
      return res.status(400).json({ msg: "No Feedback found !" });
    }
    res.json(feed);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     POST api/feedback
// @desc      Give an Feedback
// @access    Private

router.post("/", auth, async (req, res) => {
  try {
    const { subject, content } = req.body;
    let employee_id = req.user.id;

    let feed = new Feedback({ subject, content, employee_id });
    await feed.save();

    res.json(feed);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     PUT api/feedback/:id
// @desc      Update an feedback
// @access    Private
// req : { customer_id : ------, detail: [ { items }]}
router.put("/:id", async (req, res) => {
  try {
    const { subject, content } = req.body;

    const feed = await getfeedbackByid(req.params.id);
    if (!feed) {
      return res.status(400).json({ msg: "No Feedback found !" });
    }

    const newFeed = {};
    if (subject) newFeed.subject = subject;
    if (content) newFeed.content = content;

    let up_feed = await Feedback.findByIdAndUpdate(
      req.params.id,
      { $set: newFeed },
      { new: true }
    );

    res.json(up_feed);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     DELETE api/feedback/:id
// @desc      Delete feedback
// @access    Private
router.delete("/:id", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let order = await Feedback.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: "Feedback not found" });

    await Feedback.findByIdAndRemove(req.params.id);

    res.json({ msg: "Feedback removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
