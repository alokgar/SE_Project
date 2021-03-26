import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteStock, getStocks, editStock } from '../../actions/stock';
import { Button, Row, Col } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import ProductOptions from '../products/productOptions';
import SizeOptions from '../sizes/sizeOptions';

const Edit_stock = ({
    stock,
    getStocks,
    deleteStock,
    editStock,
    stocks
}) => {
    useEffect(() => {
        getStocks();
    }, [getStocks]);


    const [formData, setFormData] = useState({
        id: stock._id,
        price: stock.price,
        quantity: stock.quantity,
        product_name: stock.product_id.name,
        size_packing_type: stock.size_id.packing_type
    });

    const [isEdit, setIsEdit] = useState(false);
    const { id, price, quantity, product_name, size_packing_type } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        console.log(formData);
        editStock({ id, price, quantity, product_name, size_packing_type });

        setFormData({
            id: stock._id,
            price: stock.price,
            quantity: stock.quantity,
            product_name: stock.product_id.name,
            size_packing_type: stock.size_id.packing_type
        });
        setIsEdit(!isEdit)
    }

    return (
        <Fragment>
            <Row style={{ marginTop: "5px" }}>

                <Col> <b>{stock.product_id.name}</b>
                </Col>
                <Col>
                    <Button variant="success" onClick={() => { setIsEdit(!isEdit) }}  >Edit</Button>
                </Col>
                <Col>
                    <Button variant="danger" onClick={() => { deleteStock(id) }}  >Delete</Button>
                </Col>

            </Row>
            {isEdit === true ? <div>
                <form className='form' onSubmit={e => onSubmit(e)}>
                    <div className='form-group'>
                        <input
                            type='text'
                            placeholder='price'
                            name='price'
                            value={price}
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
                        <select name="product_name" value={product_name} onChange={e => onChange(e)}>
                            <option value="" disabled>Choose a Product</option>
                            <ProductOptions />
                        </select>
                    </div>

                    <div className='form-group'>
                        <select name="size_packing_type" value={size_packing_type} onChange={e => onChange(e)}>
                            <option value="" disabled>Choose a Size</option>
                            <SizeOptions />
                        </select>
                    </div>

                    <input type='submit' className='btn btn-primary' value='Edit Stock' />
                </form>

            </div> : null}
        </Fragment>
    );
};



Edit_stock.propTypes = {
    getStocks: PropTypes.func.isRequired,
    deleteStock: PropTypes.func.isRequired,
    editStock: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    stocks: state.stock.stocks
});

export default connect(
    mapStateToProps,
    { getStocks, deleteStock, editStock }
)(Edit_stock);