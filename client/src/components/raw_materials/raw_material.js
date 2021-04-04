import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRaw_materials, addRaw_material, editRaw_material } from '../../actions/raw_material';
import Table from 'react-bootstrap/Table';
import SupplierOptions from '../suppliers/supplierOptions';
import Edit_raw_material from './Edit_raw_material';
import { Button, Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import FilterRaw_materials from './filterRaw_materials';

const Raw_material = ({
  getRaw_materials,
  addRaw_material,
  editRaw_material,
  raw_materials

}) => {

  const [ showTable, setTable] = useState(true);
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
    setTable(!showTable)
  }

  return raw_materials === null ? (
    <div></div>):( 
      showTable===true ?
      <Fragment>
        <FilterRaw_materials />
       All raw-materials are shown here
  
       <Table striped bordered hover>
                  <thead>
                      <tr>
                      <th>Name</th>
                      
                      </tr>
                  </thead>
                  <tbody>
                      
                   {
                    raw_materials.map(function(raw_material){
                      return (<Edit_raw_material   raw_material = {raw_material} />)
                      })
                   } 
                  </tbody>
                  </Table>
                  <br></br>
                  <Button type="submit" onClick={()=> setTable(!showTable)}>Add RawMaterial</Button>
     
       </Fragment>
    :
    
    <Fragment>
      <br/><h2>Add Raw Material</h2><br/>
    <Form onSubmit={e => onSubmit(e)} style={{width:'60%'}}>
    <Form.Group>
    <Form.Label>Raw Material Name</Form.Label>
    <Form.Control
        required
        type='text'
        placeholder='name'
        name='name'
        value={name}
        onChange={e => onChange(e)}
    />
    </Form.Group>

    <Form.Group>
    <Form.Label>Quantity</Form.Label>
    <Form.Control
        required
        type='text'
        placeholder='quantity'
        name='quantity'
        value={quantity}
        onChange={e => onChange(e)}
    />
    </Form.Group>

    <Form.Group>
    <Form.Label>Unit</Form.Label>
    <Form.Control
        required
        type='text'
        placeholder='unit'
        name='unit'
        value={unit}
        onChange={e => onChange(e)}
    />
    </Form.Group>
    <Form.Group >
    <Form.Label>Supplier Name</Form.Label>
    <Form.Control as="select" name="supplier_name" value={supplier_name} onChange={e => onChange(e)}>
            <option value="" disabled>Choose...</option>
            <SupplierOptions />
    </Form.Control>
    </Form.Group>


    <Button type="submit">Add Raw Material</Button>
          <Button variant="outline-primary" size="lg" href = "/raw_materials" style={{float:"right",marginRight:"20px"}}>
            Cancel
     </Button>

</Form>
  
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
