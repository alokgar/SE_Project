import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getStocks, addStock, editStock } from '../../actions/stock';
import Table from 'react-bootstrap/Table';
import ProductOptions from '../products/productOptions';
import SizeOptions from '../sizes/sizeOptions';
import Edit_stock from './Edit_stock';

const Stock = ({
    getStocks,
    addStock,
    editStock,
    stocks
}) => {

  useEffect(() => {
    getStocks();
  }, [getStocks]);


  const [formData, setFormData] = useState({
    price: '',
    quantity: '',
    product_name: '',
    size_packing_type: ''
  });

  const { price, quantity, product_name, size_packing_type } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    addStock({ price, quantity, product_name, size_packing_type });
    setFormData({
        price: '',
        quantity: '',
        product_name: '',
        size_packing_type: ''
    });
  }

  return stocks === null ? (
    <div></div>):( 
      <Fragment>
       All stocks are shown here
  
       <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Product Name</th>  
                 </tr>
            </thead>
                  <tbody> 
                   {stocks.map(function(stock){
                        return (
                            <div >
                                <Edit_stock  stock = {stock} />
                            </div>
                        )
                    })
                    }     
                  </tbody>
        </Table>
     
       
  
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
            <select name="product_name" value = {product_name} onChange={e => onChange(e)}>
                <option value="" disabled>Choose a Product</option>
                <ProductOptions />
            </select>
          </div>

          <div className='form-group'>
            <select name="size_packing_type" value = {size_packing_type} onChange={e => onChange(e)}>
                <option value="" disabled>Choose Packing-type</option>
                <SizeOptions />
            </select>
          </div>
         
        <input type='submit' className='btn btn-primary' value='Add Stock' />
  </form>
  
  </Fragment>
    );
  };
  
  
  
  Stock.propTypes = {
    getStocks: PropTypes.func.isRequired,
    addStock: PropTypes.func.isRequired,
    editStock: PropTypes.func.isRequired
  };
  
  const mapStateToProps = state => ({
    stocks: state.stock.stocks
  });
  
  export default connect(
    mapStateToProps,
    { getStocks, addStock, editStock}
  )(Stock);