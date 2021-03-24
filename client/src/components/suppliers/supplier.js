import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSuppliers, addSupplier, editSupplier } from '../../actions/supplier';
import Table from 'react-bootstrap/Table';
import Edit_supplier from './Edit_supplier';

const Supplier = ({
  getSuppliers,
  addSupplier,
  editSupplier,
  suppliers

}) => {

  useEffect(() => {
    getSuppliers();
  }, [getSuppliers]);


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_no: '',
    line1: '',
    landmark: '',
    pincode: '',
    city_name: ''
  });

  const { name, email, mobile_no, line1, landmark, pincode, city_name } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log(name);
    addSupplier({ name, email, mobile_no, line1, landmark, pincode, city_name });
    setFormData({
      name: '',
      email: '',
      mobile_no: '',
      line1: '',
      landmark: '',
      pincode: '',
      city_name: ''
    });
  }

  return suppliers === null ? (
    <div></div>):( 
      <Fragment>
       All Suppliers are shown here
       <Table striped bordered hover>
                  <thead>
                      <tr>
                      <th>Name</th>
                      </tr>
                  </thead>
                  <tbody>
                   {suppliers.map(function(supplier){
                return (
                  <div >
                <Edit_supplier  supplier = {supplier} />
                </div>
                )

                })}
                      
                  </tbody>
                  </Table>
     
       
  
  <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='name'
              name='name'
              value={name}
              onChange={e => onChange(e)}
            />
          </div>
  
          <div className='form-group'>
            <input
              type='text'
              placeholder='email'
              name='email'
              value={email}
              onChange={e => onChange(e)}
            />
          </div>

          <div className='form-group'>
            <input
              type='text'
              placeholder='mobile_no'
              name='mobile_no'
              value={mobile_no}
              onChange={e => onChange(e)}
            />
          </div>

          <div className='form-group'>
            <input
              type='text'
              placeholder='line1'
              name='line1'
              value={line1}
              onChange={e => onChange(e)}
            />
          </div>

          <div className='form-group'>
            <input
              type='text'
              placeholder='landmark'
              name='landmark'
              value={landmark}
              onChange={e => onChange(e)}
            />
          </div>

          <div className='form-group'>
            <input
              type='text'
              placeholder='pincode'
              name='pincode'
              value={pincode}
              onChange={e => onChange(e)}
            />
          </div>

          <div className='form-group'>
            <input
              type='text'
              placeholder='city_name'
              name='city_name'
              value={city_name}
              onChange={e => onChange(e)}
            />
          </div>
        <input type='submit' className='btn btn-primary' value='Add Supplier' />
  </form>
  
  </Fragment>
    );
  };
  
  
  
  Supplier.propTypes = {
    getSuppliers: PropTypes.func.isRequired,
    addSupplier: PropTypes.func.isRequired,
    editSupplier: PropTypes.func.isRequired
  };
  
  const mapStateToProps = state => ({
    suppliers: state.supplier.suppliers
  });
  
  export default connect(
    mapStateToProps,
    { getSuppliers, addSupplier, editSupplier}
  )(Supplier);