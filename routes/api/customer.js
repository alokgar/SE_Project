const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const Address = require('../../models/Address');
const User = require('../../models/User');
const Customer = require('../../models/Customer');
const City = require('../../models/City');
const auth = require('../../middleware/auth');
const { checkAndaddCity } = require('./city');
const { addAddress, getAddress, updateAddress } = require('./address');


async function AddCustomer(first_name,last_name,mobile_no,add_id,employee_id){
    let newcustomer = new Customer({
        first_name,last_name,mobile_no,address : add_id,employee_id
    });
    await newcustomer.save();
}

// @route     GET api/customer
// @desc      Get all custmoers
// @access    Private
router.get('/', async (req, res) => {
    try {
      const cust = await Customer.find().populate('address employee_id');
    
      if (!cust) {
        return res.status(400).json({ msg: 'There are no Customers !' });
      }
      res.json(cust);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route     POST api/customer
// @desc      Add a new customer
// @access    Private
router.post('/',async (req, res) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
      }
      
      const {first_name , last_name , mobile_no , line1 , landmark , pincode , name ,employee_id}  = req.body; // name is City name
      try {   
        const cust1 = await Customer.findOne({mobile_no});
        console.log(cust1);
        if(cust1){
            res.json({ msg: 'Customer Already exist with the mobile number !' });
        }
        else{
            var curr_city = await checkAndaddCity(name);   
            console.log(curr_city._id)

            var add = await Address.findOne({line1});
            console.log(add)
            if(!add){
                add = await addAddress(line1,landmark,pincode,curr_city._id);
            }         
            var cust = await AddCustomer(first_name,last_name,mobile_no,add._id,employee_id)

            res.json({ msg: 'Customer Added !' });
            }
      } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
      }   
  });

// @route     PUT api/customer/:id
// @desc      Update customer details
// @access    Private
router.put('/:id', async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
    }
    const {first_name , last_name , mobile_no , line1 , landmark , pincode , name }  = req.body;  // name is City name
    // Build customer object
    try {
        let cust = await Customer.findById(req.params.id);
  
        if (!cust) return res.status(404).json({msg: 'Customer not found'});

        const customer_up = {};
        if (first_name) customer_up.first_name = first_name;
        if (last_name) customer_up.last_name = last_name;
        if (mobile_no) customer_up.mobile_no = mobile_no;
        
        var up_add = updateAddress(cust.address,line1 , landmark , pincode , name) ;
        console.log(up_add);
        up_customer = await Customer.findByIdAndUpdate(
            req.params.id,
            {$set: customer_up},
            {new: true},
        );
    
        res.json(up_customer);
        } 
    catch (err) {
        console.error(er.message);
        res.status(500).send('Server Error');
        }
  });


// @route     DELETE api/customer/:id
// @desc      Delete customer
// @access    Private
router.delete('/:id', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
    }
    try {
        let cust = await Customer.findById(req.params.id);
  
        if (!cust) return res.status(404).json({msg: 'Customer not found'});
  
        await Customer.findByIdAndRemove(req.params.id);
  
        res.json({msg: 'Customer removed'});
        } 
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
        }
  });

module.exports = router;