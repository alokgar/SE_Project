import React, { Fragment, useEffect,useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCustomerProfile} from '../../actions/customer';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card'
import {Button ,Row,Col} from "react-bootstrap";


const CustomerProfile = ({ getCustomerProfile,cust_orders,cust_payments,curr_customer,match}) => {

const [ showP, setP] = useState(false);
const [ showO, setO] = useState(false);

useEffect(() => {
getCustomerProfile(match.params.id);
}, [getCustomerProfile,match.params.id]);

const onOrderclick = ()=>{
    setO(!showO);
    setP(false);
}

const onPayclick = ()=>{
    setP(!showP);
    setO(false);
}
return curr_customer===null
    ?
    (   
        <div>hi</div> 
    )
    :
    <Fragment>
        <div className="info">
            <Card>
                <Card.Header as="h5">{curr_customer.first_name}{" "}{curr_customer.last_name}</Card.Header>
                <Card.Body>
                    <Card.Title>{curr_customer.first_name}{" "}{curr_customer.last_name}</Card.Title>
                    <Card.Text>
                         With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button variant="primary" onClick={()=>onOrderclick() }>Orders</Button>
                    <Button variant="primary"onClick={()=>onPayclick()}>Payment</Button>
                </Card.Body>
            </Card>
            {(showO || showP) && <div>
               <Table striped bordered hover>
                <thead>
                    {showO?<tr><th>Order Date</th><th>Status</th><th>#</th></tr>:<tr><th>Date</th><th>Amount</th></tr>}
                </thead>
                <tbody>
                    {showO?
                    cust_orders.map(function(order){
                    return (
                        <tr>
                        <td>{order.order_date}</td>
                        <td>{order.status}</td>
                        </tr>
                    )})
                    :
                    cust_payments.map(function(pay){
                        return (
                            <tr>
                            <td>{pay.date}</td>
                            <td>{pay.amount}</td>
                            </tr>
                        )})
                    }
                </tbody>
                </Table>
            </div>
            }
        </div>
    </Fragment>

};


CustomerProfile.propTypes = {
  getCustomerProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  curr_customer: state.customer.curr_customer,
  cust_orders: state.customer.cust_orders,
  cust_payments: state.customer.cust_payments
});

export default connect(
  mapStateToProps,
  { getCustomerProfile}
)(CustomerProfile);