// apply the middleware when auth works fine
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');

const User = require('../../models/User');
const Size = require('../../models/Size');

// @route     GET api/size
// @desc      Get all sizes
// @access    Private
router.get('/', async (req, res) => {
  try {
    const sizes = await Size.find({});
    res.json(sizes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route     POST api/size
// @desc      Add new size
// @access    Private
router.post('/', async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      }
      const {packing_type, unit} = req.body;
      try {
        const newSize = new Size({
          packing_type,
          unit
        });
        const size = await newSize.save();
        res.json(size);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    },
  );


// @route     PUT api/size/:id
// @desc      Update size
// @access    Private
router.put('/:id', async (req, res) => {
    const {packing_type, unit} = req.body;
  
    // Build product object
    const sizeFields = {};
    if (packing_type) sizeFields.packing_type = packing_type;
    if (unit) sizeFields.unit = unit;
    try {
      let size = await Size.findById(req.params.id);
      if (!size) return res.status(404).json({msg: 'size not found'});
  
      size = await Size.findByIdAndUpdate(
        req.params.id,
        {$set: sizeFields},
        {new: true},
      );
      res.json(size);
    } catch (err) {
      console.error(er.message);
      res.status(500).send('Server Error');
    }
  });


// @route     DELETE api/size/:id
// @desc      Delete size
// @access    Private
router.delete('/:id', async (req, res) => {
    try {
      let size = await Size.findById(req.params.id);
  
      if (!size) return res.status(404).json({msg: 'Size not found'});
  
      await Size.findByIdAndRemove(req.params.id);
  
      res.json({msg: 'Size removed'});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });



module.exports = router;