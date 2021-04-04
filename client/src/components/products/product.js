import React, { Fragment, useEffect,useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProducts ,addProduct,editProduct} from '../../actions/product';
import Table from 'react-bootstrap/Table';
import Edit_product from './Edit_product'
import Form from 'react-bootstrap/Form'
import {Button ,Row,Col} from "react-bootstrap";



const Product = ({ 
  getProducts ,
  addProduct,
  editProduct,
  products
}) => {
  const [ showTable, setTable] = useState(true);
  useEffect(() => {

    getProducts();
  }, [getProducts]);


  const [formData, setFormData] = useState({
  
    name:'',

    description:'',

    category_name:'DEFAULT'
    
  });

  

  const { name,description,category_name } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });


const onSubmit = async e => {
      e.preventDefault();
      console.log(category_name);
     addProduct({ name,description,category_name });

     setFormData({ name:'',

     description:'',
 
     category_name:'DEFAULT' });

     setTable(!showTable)

       }


return products.length===0?(

  <div></div>):( 
    showTable===true ?
    <Fragment>
     All products are shown here

     <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>First Name</th>
                    
                    </tr>
                </thead>
                <tbody>
                    
                 {products.map(function(product){
                   if(product===undefined){
                     return (<div></div>)
                    }
                    return (<Edit_product   product={product} />)
                 })} 
                </tbody>
                </Table><br/>
                <Button onClick={() => setTable(false)}>Add Product</Button> 
      </Fragment>
      :
      <Fragment>
      <br/><h2>Add Product</h2><br/>
      <Form onSubmit={e => onSubmit(e)} style={{width:'60%'}}>
    
        <Form.Group>
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='description'
            name='description'
            value={description}
            onChange={e => onChange(e)}
          />
        </Form.Group>
        
        
        <Form.Group >
          <Form.Label>Packing</Form.Label>
          <Form.Control as="select"name="category_name" onChange={e => onChange(e)}>
                  <option value="" disabled>Choose...</option>
                  <option value="A" >A</option>
                  <option value="B" >B</option>
          </Form.Control>
          </Form.Group>
      
       
          <Button type="submit">Add Product</Button>
          <Button variant="outline-primary" size="lg" href = "/products" style={{float:"right",marginRight:"20px"}}>
            Cancel
     </Button>
          </Form>
          </Fragment>
  );
};



Product.propTypes = {
  getProducts: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  editProduct: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: state.product.products
});

export default connect(
  mapStateToProps,
  { getProducts ,addProduct,editProduct}
)(Product);