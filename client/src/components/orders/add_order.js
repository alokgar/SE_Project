import React, { Fragment, useEffect,useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOrders,confirmOrder,dispatchOrder} from '../../actions/order';
import Table from 'react-bootstrap/Table';
import OrderList from './order_list'
import product from '../products/product';

import CustomerOptions from '../customers/customerOptions'
import ProductOptionsbyID from '../products/productOptionsbyID'
import SizeOptionsbyID from '../sizes/sizeOptionbyID'
import {addOrders} from '../../actions/order'

const AddOrder= ({ 
  auth: { user },
  addOrders,
  orders
}) => {

  useEffect(() => {

  }, []);


//   const [formData, setFormData] = useState({
  
//     name:'',

//     description:'',

//     category_name:'DEFAULT'
    
//   });

  const [product, setproduct] = useState({
    
    customer_id:'',
    
    employee_id : user._id,
    
    details : []

    
    
  });
  
  const [detail,setdetail] = useState({
    product_id:'',
        quantity:0,
        size_id:''

  });



  

  const { customer_id,employee_id,details } = product;
  const { product_id,quantity,size_id } = detail;

  const onChange = e =>
    setdetail({ ...detail, [e.target.name]: e.target.value });

    const onChangeOrder = e =>
    setproduct({ ...product, [e.target.name]: e.target.value });

const onSubmit = async e => {
      e.preventDefault();

      details.push(detail)
      setproduct({
        ...product,
        details
      });
     

      setdetail(
        {
          product_id:'',
              quantity:0,
              size_id:''
      
        }
     
     );

       }

 const onSubmitOrder = async e => {
        e.preventDefault();
  
       
        setproduct({
          ...product,
          details
        });
        console.log(product)
      
        addOrders(product);

        setproduct(
          {
    
            customer_id:'',
            
            employee_id : user._id,
            
            details : []
        
            
            
          }
        );

  
        setdetail(
          {
            product_id:'',
                quantity:0,
                size_id:''
        
          }
       
       );
  
         }




return ( 
<Fragment>

    {details !== null && details.map(detail=> 
              <div>
                {detail.quantity}
                </div>
            
            )
    }

<form className='form' onSubmit={e => onSubmit(e)}>
          
  
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
            <select name="product_id" value = {product_id} onChange={e => onChange(e)}>
                <option value="" disabled>Choose a Product</option>
                <ProductOptionsbyID />
            </select>
          </div>

          <div className='form-group'>
            <select name="size_id" value = {size_id} onChange={e => onChange(e)}>
                <option value="" disabled>Choose Packing-type</option>
                <SizeOptionsbyID />
            </select>
          </div>
         
        <input type='submit' className='btn btn-primary' value='Add Stock' />
  </form>



     <form className='form' onSubmit={e => onSubmitOrder(e)}>
           <div className='form-group'>
            <select name="customer_id" value = {customer_id} onChange={e => onChangeOrder(e)}>
                <option value="" disabled>Choose Packing-type</option>
                <CustomerOptions/>
            </select>
          </div>
         
        <input type='submit' className='btn btn-primary' value='Confirm Order' />
  </form>








</Fragment>
  );
};



AddOrder.propTypes = {
    getOrders: PropTypes.func.isRequired,
    addOrders:PropTypes.func.isRequired,
    confirmOrder:PropTypes.func.isRequired,
    dispatchOrder:PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    orders: state.order.orders,
    auth: state.auth
});

export default connect(
  mapStateToProps,
  { getOrders,confirmOrder,dispatchOrder,addOrders}
)(AddOrder);