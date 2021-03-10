// apply the middleware when auth works fine
// change the address when address is attached
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');

const User = require('../../models/User');
const Address = require('../../models/Address');
const Supplier = require('../../models/Supplier');

// @route     GET api/supplier
// @desc      Get all suppliers
// @access    Private
router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.find({});
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
        return res.status(400).json({errors: errors.array()});
      }
      const {name, email, mobile_no, address} = req.body;
      try {

        // const supplier_address = await Address.findOne({});
        // if (!supplier_address) return res.status(404).json({msg: 'address not found'});

        const newSupplier = new Supplier({
          name,
          email,
          mobile_no,
          address
        });
        const supplier = await newSupplier.save();
        res.json(supplier);
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
    const {name, email, mobile_no, address} = req.body;
  
    // Build product object
    const supplierFields = {};
    if (name) supplierFields.name = name;
    if (email) supplierFields.email = email;
    if (mobile_no) supplierFields.mobile_no = mobile_no;
    if (address) supplierFields.address = address;
  
    try {
      let supplier = await Supplier.findById(req.params.id);
  
      if (!supplier) return res.status(404).json({msg: 'supplier not found'});
  
      supplier = await Supplier.findByIdAndUpdate(
        req.params.id,
        {$set: supplierFields},
        {new: true},
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
  
      if (!supplier) return res.status(404).json({msg: 'Supplier not found'});
  
      await Supplier.findByIdAndRemove(req.params.id);
  
      res.json({msg: 'Supplier removed'});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });



module.exports = router;