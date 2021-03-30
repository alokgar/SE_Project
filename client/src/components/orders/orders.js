import React, { Fragment, useEffect,useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOrders,confirmOrder,dispatchOrder} from '../../actions/order';
import Table from 'react-bootstrap/Table';
import OrderList from './order_list'
import product from '../products/product';
import AddOrder from './add_order'; 

const Order = ({ 
    getOrders,
    confirmOrder,
    dispatchOrder,
  orders
}) => {

  useEffect(() => {

    getOrders();
    

  }, [getOrders]);


//   const [formData, setFormData] = useState({
  
//     name:'',

//     description:'',

//     category_name:'DEFAULT'
    
//   });

  

//   const { name,description,category_name } = formData;

//   const onChange = e =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });


// const onSubmit = async e => {
//       e.preventDefault();
//       console.log(category_name);
//      addOrder({ name,description,category_name });

//      setFormData({ name:'',

//      description:'',
 
//      category_name:'DEFAULT' });

//        }




return orders.length===0?(

  <div>no orders</div>):( 
    <Fragment>
     All Orders are shown here

     <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>First Name</th>
                    
                    </tr>
                </thead>
                <tbody>
                    
                 {orders.map(function(order){

                   if(order===undefined){
                     return (
                      <div></div>
                     )
                   }
                   var id = order._id;

              return (
                  <div>
                    <b>New Order</b>
                    <b>{order.status}</b>
                    <br></br>
                 <div>
                  {order.employee_id.first_name} 

                  <button onClick={()=>{confirmOrder(id)} }  > confirm</button>
                  <button onClick={()=>{dispatchOrder(id)} }  > confirm</button>
                  </div>
                  < OrderList orderslist={order.details} />
                  
                  </div>
                
              
              )

              })}
                    
                </tbody>
                </Table>
   
     

{/* <form className='form' onSubmit={e => onSubmit(e)}>
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
            placeholder='description'
            name='description'
            value={description}
            onChange={e => onChange(e)}
          />
        </div>
        
        <div className='form-group'>

        <select defaultValue={"DEFAULT"} name="category_name" onChange={e => onChange(e)}>
        <option value="DEFAULT" disabled>Choose a salutation ...</option>
        <option value="A" >A</option>
        <option value="B" >B</option>
       
      </select>
      </div>
       
      <input type='submit' className='btn btn-primary' value='Add Order' />
</form> */}

<AddOrder />

</Fragment>
  );
};



Order.propTypes = {
    getOrders: PropTypes.func.isRequired,
    confirmOrder:PropTypes.func.isRequired,
    dispatchOrder:PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    orders: state.order.orders
});

export default connect(
  mapStateToProps,
  { getOrders,confirmOrder,dispatchOrder}
)(Order);