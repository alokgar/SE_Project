import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOrders } from '../../actions/product';

const OrderList = ({ orderslist }) => {
    useEffect(() => {
       
    }, []);

    return (
        orderslist !== null && orderslist.map(order =>
            // <option key={product._id}
            //     val={product.name}>
            //     {product.name}
            // </option>
            <div>
            <div>{order.quantity}</div>

            <div>{order.size_id.packing_type}</div>
            <div>{order.size_id.unit}</div>
            <div>{order.size_id.__v}</div>
            </div>
          
            
        )
    )
}

OrderList.propTypes = {
    orderslist: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
   
});

export default connect(mapStateToProps, {  })(OrderList);
