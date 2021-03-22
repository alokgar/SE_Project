import React, { Fragment, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProducts } from '../../actions/product';

const Product = ({ 
  getProducts ,

products

}) => {

  useEffect(() => {
    getProducts();

  }, [getProducts]);

  


return products===null?(

  <div></div>):( 
    <Fragment>
     All products are shown here
   
     {products.map(function(product){

      return (
        <div >
      
        {product.name}
      </div>
      )

})}
</Fragment>
  );
};



Product.propTypes = {
  getProducts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: state.product.products
});

export default connect(
  mapStateToProps,
  { getProducts }
)(Product);