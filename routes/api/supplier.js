// apply the middleware when auth works fine
// change the address when address is attached
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Address = require('../../models/Address');
const Supplier = require('../../models/Supplier');
const { checkAndaddCity } = require('./city');
const { addAddress, getAddress, updateAddress } = require('./address');


// @route     GET api/supplier
// @desc      Get all suppliers
// @access    Private

router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.find().populate({
      path: 'city address',
      populate: {
        path: 'city'
      }
    });
    res.json(suppliers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route     POST api/supplier
// @desc      Add new supplier
// @access    Private
router.post('/', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, mobile_no, line1, landmark, pincode, city_name } = req.body;
  try {
    const supplier1 = await Supplier.findOne({ mobile_no });
    if (supplier1) {
      res.json({ msg: 'Supplier Already exist with the mobile number !' });
    }
    else {
      var curr_city = await checkAndaddCity(city_name);
      var add = await Address.findOne({ line1 });
      if (!add) {
        add = await addAddress(line1, landmark, pincode, curr_city._id);
      }
      const newSupplier = new Supplier({
        name,
        email,
        mobile_no,
        address: add._id
      });
      const supplier = await newSupplier.save();
      res.json(supplier);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
},
);


// @route     PUT api/supplier/:id
// @desc      Update product
// @access    Private
router.put('/:id', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, mobile_no, line1, landmark, pincode, city_name } = req.body;

  try {
    let supp = await Supplier.findById(req.params.id);
    if (!supp) return res.status(404).json({ msg: 'Supplier not found' });

    // Build supplier object
    const supplierFields = {};
    if (name) supplierFields.name = name;
    if (email) supplierFields.email = email;
    if (mobile_no) supplierFields.mobile_no = mobile_no;

    var up_add = await updateAddress(supp.address, line1, landmark, pincode, city_name);
    //console.log(up_add);

    supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      { $set: supplierFields },
      { new: true },
    );

    res.json(supplier);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});


// @route     DELETE api/supplier/:id
// @desc      Delete contact
// @access    Private
router.delete('/:id', async (req, res) => {
  try {
    let supplier = await Supplier.findById(req.params.id);

    if (!supplier) return res.status(404).json({ msg: 'Supplier not found' });

    await Supplier.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Supplier removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



module.exports = router;