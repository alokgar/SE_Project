import React, { Fragment, useEffect,useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProducts ,editProduct,deleteProduct} from '../../actions/product';
import {Button ,Row,Col} from "react-bootstrap";
import Table from 'react-bootstrap/Table';
const Edit_product = ({ 
    product,
  getProducts ,
  editProduct,
  deleteProduct,
  products

}) => {

  // useEffect(() => {

  //   getProducts();
    

  // }, [getProducts]);


  const [formData, setFormData] = useState({
    id:product._id,
    name:product.name,

    description:product.description,

    category_name:product.category_id.name
    
  });

  const [isEdit,setIsEdit]=useState(false);

  

  const { id, name,description,category_name } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });


const onSubmit = async e => {
      e.preventDefault();
      console.log(formData);
      editProduct({  id,name,description,category_name });

     setFormData({
        id:product._id,
        name:product.name,

    description:product.description,

    category_name:product.category_id.name
    
    });

    setIsEdit(!isEdit)
}

       


return(

    <Fragment>
        <Row style={{marginTop:"5px"}}>

        <Col> <b>{product.name}</b>
        </Col>
        <Col>
        <Button variant="success" onClick={()=>{setIsEdit(!isEdit)}}  >Edit</Button>
        </Col>
        <Col>
        <Button variant="danger" onClick={()=>{deleteProduct(id)} }  >Delete</Button>
        </Col>

        </Row>

   
   

    {isEdit===true?<div>



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
       
      <input type='submit' className='btn btn-primary' value='Edit Product' />
    </form>

    </div>:null}
    

</Fragment>
  );
};



Edit_product.propTypes = {
  getProducts: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  editProduct: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: state.product.products
});

export default connect(
  mapStateToProps,
  { getProducts ,editProduct,deleteProduct}
)(Edit_product);