// apply the middleware when auth works fine
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Supplier = require('../../models/Supplier');
const Raw_material = require('../../models/Raw_material');

// @route     GET api/raw_material
// @desc      Get all suppliers
// @access    Private
router.get('/', async (req, res) => {
  try {
    const raw_materials = await Raw_material.find({}).populate('supplier_id');
    res.json(raw_materials);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route     POST api/raw_material
// @desc      Add new raw_material
// @access    Private
router.post('/', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, quantity, unit, supplier_name } = req.body;
  try {

    const supplier = await Supplier.findOne({ name: supplier_name });
    if (!supplier) return res.status(404).json({ msg: 'supplier not found' });

    const newRaw_material = new Raw_material({
      name,
      quantity,
      unit,
      supplier_id: supplier._id
    });
    const raw_material = await newRaw_material.save();
    res.json(raw_material);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
},
);


// @route     PUT api/raw_material/:id
// @desc      Update raw_material
// @access    Private
router.put('/:id', async (req, res) => {
  const { name, quantity, unit, supplier_name } = req.body;

  // Build product object
  const raw_materialFields = {};
  if (name) raw_materialFields.name = name;
  if (quantity) raw_materialFields.quantity = quantity;
  if (unit) raw_materialFields.unit = unit;
  if (supplier_name) {
    const supplier = await Supplier.findOne({ name: supplier_name });
    if (!supplier) return res.status(404).json({ msg: 'supplier not found' });
    raw_materialFields.supplier_id = supplier._id;
  }

  try {
    let raw_material = await Raw_material.findById(req.params.id);

    if (!raw_material) return res.status(404).json({ msg: 'raw_material not found' });

    raw_material = await Raw_material.findByIdAndUpdate(
      req.params.id,
      { $set: raw_materialFields },
      { new: true },
    );

    res.json(raw_material);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});


// @route     DELETE api/raw_material/:id
// @desc      Delete raw_material
// @access    Private
router.delete('/:id', async (req, res) => {
  try {
    let raw_material = await Raw_material.findById(req.params.id);

    if (!raw_material) return res.status(404).json({ msg: 'raw_material not found' });

    await Raw_material.findByIdAndRemove(req.params.id);

    res.json({ msg: 'raw_material removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



module.exports = router;