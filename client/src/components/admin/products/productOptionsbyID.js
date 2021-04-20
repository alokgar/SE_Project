import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProducts } from "../../../actions/product";

const ProductOptionsbyID = ({ getProducts, products }) => {
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    products !== null &&
    products.map((product) => (
      <option key={product._id} value={product._id + "$" + product.name}>
        {product.name}
      </option>
    ))
  );
};

ProductOptionsbyID.propTypes = {
  products: PropTypes.object.isRequired,
  getProducts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.product.products,
});

export default connect(mapStateToProps, { getProducts })(ProductOptionsbyID);
