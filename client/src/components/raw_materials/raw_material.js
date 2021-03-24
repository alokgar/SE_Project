import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRaw_materials, addRaw_material, editRaw_material } from '../../actions/raw_material';
import Table from 'react-bootstrap/Table';
import SupplierOptions from '../suppliers/supplierOptions';
import Edit_raw_material from './Edit_raw_material';

const Raw_material = ({
  getRaw_materials,
  addRaw_material,
  editRaw_material,
  raw_materials

}) => {

  useEffect(() => {
    getRaw_materials();
  }, [getRaw_materials]);


  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: '',
    supplier_name: ''
  });

  const { name, quantity, unit, supplier_name } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log(name);
    addRaw_material({ name, quantity, unit, supplier_name });
    setFormData({
      name: '',
      quantity: '',
      unit: '',
      supplier_name: ''
    });
  }

  return raw_materials === null ? (
    <div></div>):( 
      <Fragment>
       All raw-materials are shown here
  
       <Table striped bordered hover>
                  <thead>
                      <tr>
                      <th>Name</th>
                      
                      </tr>
                  </thead>
                  <tbody>
                      
                   {raw_materials.map(function(raw_material){
  
                return (
                  <div >
                <Edit_raw_material   raw_material = {raw_material} />
                  
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
              placeholder='quantity'
              name='quantity'
              value={quantity}
              onChange={e => onChange(e)}
            />
          </div>

          <div className='form-group'>
            <input
              type='text'
              placeholder='unit'
              name='unit'
              value={unit}
              onChange={e => onChange(e)}
            />
          </div>
 
          <div className='form-group'>
  
          <select name="supplier_name" value = {supplier_name} onChange={e => onChange(e)}>
          <option value="" disabled>Choose a supplier</option>
          <SupplierOptions />
        </select>
        </div>
         
        <input type='submit' className='btn btn-primary' value='Add Raw_material' />
  </form>
  
  </Fragment>
    );
  };
  
  
  
  Raw_material.propTypes = {
    getRaw_materials: PropTypes.func.isRequired,
    addRaw_material: PropTypes.func.isRequired,
    editRaw_material: PropTypes.func.isRequired
  };
  
  const mapStateToProps = state => ({
    raw_materials: state.raw_material.raw_materials
  });
  
  export default connect(
    mapStateToProps,
    { getRaw_materials, addRaw_material, editRaw_material}
  )(Raw_material);