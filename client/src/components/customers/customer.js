import React, { Fragment, useEffect,useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCustomers ,addCustomer,editCustomer,deleteCustomer} from '../../actions/customer';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import {Button ,Row,Col} from "react-bootstrap";


const Customer = ({ getCustomers ,addCustomer,editCustomer,deleteCustomer,customers}) => {

const [ showTable, setTable] = useState(true);
const [ showEdit, setEdit] = useState(false);

const [formData, setFormData] = useState({
  
    id: '',
    first_name:'',

    last_name:'',

    mobile_no:'',

    line1 : '',

    landmark:'',
    name:'',
    pincode:''
    
  });


const { id,first_name,last_name,mobile_no,line1,landmark,name,pincode } = formData;

const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

useEffect(() => {
getCustomers();
}, [getCustomers]);

const onSubmit = async e => {
    e.preventDefault();
    console.log(formData);

    if(showEdit === false)
      addCustomer({ first_name,last_name,mobile_no,line1,landmark,name,pincode });
    else
     {
     editCustomer({ id,first_name,last_name,mobile_no,line1,landmark,name,pincode });
     setEdit(!showEdit)
    }
  
    setFormData({
    id:'',
    first_name:'',

    last_name:'',

    mobile_no:'',

    line1 : '',

    landmark:'',
    name:'',
    pincode:''
    
  });
  setTable(!showTable)
}


const onEditclick = cust =>{
    setTable(false);
    setEdit(true);
    setFormData({
  
        id: cust._id,
        first_name: cust.first_name,
    
        last_name:cust.last_name,
    
        mobile_no:cust.mobile_no,
    
        line1 : cust.address.line1,
    
        landmark: cust.address.landmark,
        name: cust.address.city ,
        pincode: cust.address.pincode
        
      });
}

const onSubmitEdit = async e => {
    e.preventDefault();
    console.log(formData);

   editCustomer({ first_name,last_name,mobile_no,line1,landmark,name,pincode });
   setFormData({
  
    first_name:'',

    last_name:'',

    mobile_no:'',

    line1 : '',

    landmark:'',
    name:'',
    pincode:''
    
  });
  setTable(!showTable)
  setEdit(!showEdit)
}
return customers===null
    ?
    (   
        <div></div> 
    )
    :
    (   
        showTable===true ?<div>
             <Fragment>
            
            <div>

                All Cusomers are shown here
                
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {customers.map(function(customer){

                    return (
                        <tr>
                        <td>{customer.first_name}</td>
                        <td>{customer.last_name}</td>
                        <td><Button variant="success" onClick={() => onEditclick(customer)} >Edit</Button></td>
                        <td><Button variant="danger" onClick={() => deleteCustomer(customer._id)} >Delete</Button></td> 
                        </tr>
                    )})}
                    
                </tbody>
                </Table>
                <button onClick={() => setTable(false)}>Click me!</button>
                
            </div>
        </Fragment>
        </div>
        :
            <div>
            <Form onSubmit={e => onSubmit(e)}>
            <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control name="first_name" type="text" placeholder="First Name" value={first_name} onChange={e => onChange(e)} />
            </Form.Group>
        
            <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Last Name</Form.Label>
                <Form.Control name="last_name" type="text" placeholder="Last Name" value={last_name} onChange={e => onChange(e)} />
            </Form.Group>
            </Form.Row>
            
            <Form.Group controlId="formGridAddress1">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control name="mobile_no" type="text" placeholder="10 digits Mobile No." value={mobile_no} onChange={e => onChange(e)}/>
            </Form.Group>

            <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control name="line1" placeholder="Address" value={line1} onChange={e => onChange(e)} />
            </Form.Group>
        
            <Form.Group controlId="formGridAddress2">
            <Form.Label>Landmark</Form.Label>
            <Form.Control name="landmark" placeholder="Landmark" value={landmark} onChange={e => onChange(e)}/>
            </Form.Group>
        
            <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control name="name" value={name} onChange={e => onChange(e)}/>
            </Form.Group>
        
        
            <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Pincode</Form.Label>
                <Form.Control name="pincode"value={pincode} onChange={e => onChange(e)}/>
            </Form.Group>
            </Form.Row>
        
        
            <Button variant="primary" size="lg" type="submit" >
            Submit
            </Button>
            <Button variant="outline-primary" size="lg" href = "/customers" style={{float:"right",marginRight:"20px"}}>
            Cancel
            </Button>
        </Form>

        </div>
        
          
    );


};



Customer.propTypes = {
  getCustomers: PropTypes.func.isRequired,
  addCustomer: PropTypes.func.isRequired,
  editCustomer: PropTypes.func.isRequired,
  deleteCustomer:PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  customers: state.customer.customers
});

export default connect(
  mapStateToProps,
  { getCustomers, addCustomer,editCustomer,deleteCustomer}
)(Customer);