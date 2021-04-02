import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRaw_materials, deleteRaw_material, editRaw_material } from '../../actions/raw_material';
import { Button, Row, Col } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import SupplierOptions from '../suppliers/supplierOptions';

const Edit_raw_material = ({
    raw_material,
    getRaw_materials,
    editRaw_material,
    deleteRaw_material,
    raw_materials
}) => {

    // useEffect(() => {

    //     getRaw_materials();


    // }, [getRaw_materials]);


    const [formData, setFormData] = useState({
        id: raw_material._id,
        name: raw_material.name,
        quantity: raw_material.quantity,
        unit: raw_material.unit,
        supplier_name: raw_material.supplier_id.name
    });

    const [isEdit, setIsEdit] = useState(false);
    const { id, name, quantity, unit, supplier_name } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        console.log(formData);
        editRaw_material({ id, name, quantity, unit, supplier_name });

        setFormData({
            id: raw_material._id,
            name: raw_material.name,
            quantity: raw_material.quantity,
            unit: raw_material.unit,
            supplier_name: raw_material.supplier_id.name
        });
        setIsEdit(!isEdit)
    }

    return (

        <Fragment>
            <Row style={{ marginTop: "5px" }}>

                <Col> <b>{raw_material.name}</b>
                </Col>
                <Col>
                    <Button variant="success" onClick={() => { setIsEdit(!isEdit) }}  >Edit</Button>
                </Col>
                <Col>
                    <Button variant="danger" onClick={() => { deleteRaw_material(id) }}  >Delete</Button>
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
                        <select name="supplier_name" value={supplier_name} onChange={e => onChange(e)}>
                            <option value="" disabled>Choose a supplier</option>
                            <SupplierOptions />
                        </select>
                    </div>

                    <input type='submit' className='btn btn-primary' value='Edit Raw_material' />
                </form>

            </div> : null}


        </Fragment>
    );
};



Edit_raw_material.propTypes = {
    getRaw_materials: PropTypes.func.isRequired,
    deleteRaw_material: PropTypes.func.isRequired,
    editRaw_material: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    raw_materials: state.raw_material.raw_materials
});

export default connect(
    mapStateToProps,
    { getRaw_materials, deleteRaw_material, editRaw_material }
)(Edit_raw_material);