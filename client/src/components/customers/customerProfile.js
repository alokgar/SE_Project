import React, { Fragment, useEffect,useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCustomerProfile} from '../../actions/customer';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card'
import {Button ,Row,Col} from "react-bootstrap";
import Badge from 'react-bootstrap/Badge'


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
const click = ()=>{
    <Redirect to='/customers'/>
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
                <Card.Header as="h5">{curr_customer.first_name}{" "}{curr_customer.last_name}
                <a href={'/customers'} ><Badge variant="danger" style={{padding:'5px',borderRadius:'50%',float:'right'}}>X</Badge></a>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{curr_customer.first_name}{" "}{curr_customer.last_name}</Card.Title>
                    <Card.Text>
                         Text
                    </Card.Text>
                    <Button variant="primary" onClick={()=>onOrderclick() }>Orders</Button>
                    <Button variant="primary"onClick={()=>onPayclick()}>Payment</Button>
                </Card.Body>
            </Card>
            {(showO || showP) && <div>
               <Table striped bordered hover>
                <thead>
                    {showO?<tr><th>Order Date</th><th>Status</th> <th>Dispatch Date</th></tr>:<tr><th>Date</th><th>Amount</th></tr>}
                </thead>
                <tbody>
                    {showO?
                    cust_orders.map(function(order){
                    return (
                        <tr>
                        <td>{order.order_date.slice(0,10)}</td>
                        <td>{order.status==="Pending"?
                                  <Badge variant="danger" style={{padding:'8px'}}>Pending</Badge>
                                  :
                                  order.status==="Confirmed"?
                                  <Badge variant="dark" style={{padding:'8px'}}>Confirmed</Badge>
                                        :
                                        <Badge variant="success" style={{padding:'8px'}}>Dispatched</Badge> 
                              }
                            </td>
                        <td>{order.dispatched_date ===undefined?"Not Dispatched":order.dispatched_date.slice(0,10)}</td>
                        </tr>
                    )})
                    :
                    cust_payments.map(function(pay){
                        return (
                            <tr>
                            <td>{pay.date.slice(0,10)}</td>
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