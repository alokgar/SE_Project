import React, { Fragment, useEffect,useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProducts ,addProduct,editProduct} from '../../actions/product';
import Table from 'react-bootstrap/Table';
import Edit_product from './Edit_product'

const Product = ({ 
  getProducts ,
  addProduct,
  editProduct,
  products
}) => {

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

       }


return products===null?(

  <div></div>):( 
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

              return (
                <div >
              <Edit_product   product={product} />
                
              </div>
              )

              })}
                    
                </tbody>
                </Table>
   
     

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
       
      <input type='submit' className='btn btn-primary' value='Add Product' />
</form>

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