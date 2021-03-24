import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSuppliers, deleteSupplier, editSupplier } from '../../actions/supplier';
import { Button, Row, Col } from "react-bootstrap";
import Table from 'react-bootstrap/Table';

const Edit_supplier = ({
    supplier,
    getSuppliers,
    editSupplier,
    deleteSupplier,
    suppliers
}) => {
    useEffect(() => {
        getSuppliers();
    }, [getSuppliers]);


    const [formData, setFormData] = useState({
        id: supplier._id,
        name: supplier.name,
        email: supplier.email,
        mobile_no: supplier.mobile_no,
        line1: supplier.address.line1,
        landmark: supplier.address.landmark,
        pincode: supplier.address.pincode,
        city_name: supplier.address.city.name
    });

    const [isEdit, setIsEdit] = useState(false);
    const {id, name, email, mobile_no, line1, landmark, pincode, city_name } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        console.log(formData);
        editSupplier({id, name, email, mobile_no, line1, landmark, pincode, city_name });

        setFormData({
            id: supplier._id,
            name: supplier.name,
            email: supplier.email,
            mobile_no: supplier.mobile_no,
            line1: supplier.address.line1,
            landmark: supplier.address.landmark,
            pincode: supplier.address.pincode,
            city_name: supplier.address.city.name
        });
        setIsEdit(!isEdit)
    }

    return (

        <Fragment>
            <Row style={{ marginTop: "5px" }}>
                <Col> <b>{supplier.name}</b> </Col>
                <Col>
                    <Button variant="success" onClick={() => { setIsEdit(!isEdit) }} > Edit </Button>
                </Col>
                <Col>
                    <Button variant="danger" onClick={() => { deleteSupplier(id) }} > Delete </Button>
                </Col>
            </Row>
            {isEdit === true ? <div>
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

                    <input type='submit' className='btn btn-primary' value='Edit Supplier' />
                </form>

            </div> : null}


        </Fragment>
    );
};



Edit_supplier.propTypes = {
    getSuppliers: PropTypes.func.isRequired,
    addSupplier: PropTypes.func.isRequired,
    editSupplier: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    suppliers: state.supplier.suppliers
});

export default connect(
    mapStateToProps,
    { getSuppliers, deleteSupplier, editSupplier }
)(Edit_supplier);