// apply the middleware when auth works fine
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');

const User = require('../../models/User');
const Category = require('../../models/Category');

// @route     GET api/category
// @desc      Get all categories
// @access    Private
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route     POST api/category
// @desc      Add new category
// @access    Private
router.post('/', async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      }
      const {name, description} = req.body;
      try {
        const newCategory = new Category({
          name,
          description
        });
        const category = await newCategory.save();
        res.json(category);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    },
  );


// @route     PUT api/category/:id
// @desc      Update product
// @access    Private
router.put('/:id', async (req, res) => {
    const {name, description} = req.body;
  
    // Build product object
    const categoryFields = {};
    if (name) categoryFields.name = name;
    if (description) categoryFields.description = description;
  
    try {
      let category = await Category.findById(req.params.id);
  
      if (!category) return res.status(404).json({msg: 'category not found'});
  
      category = await Category.findByIdAndUpdate(
        req.params.id,
        {$set: categoryFields},
        {new: true},
      );
  
      res.json(category);
    } catch (err) {
      console.error(er.message);
      res.status(500).send('Server Error');
    }
  });


// @route     DELETE api/products/:id
// @desc      Delete contact
// @access    Private
router.delete('/:id', async (req, res) => {
    try {
      let category = await Category.findById(req.params.id);
  
      if (!category) return res.status(404).json({msg: 'Category not found'});
  
      await Category.findByIdAndRemove(req.params.id);
  
      res.json({msg: 'Category removed'});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });



module.exports = router;