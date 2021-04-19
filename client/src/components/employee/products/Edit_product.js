import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getProducts,
  editProduct,
  deleteProduct,
} from "../../../actions/product";
import { Button, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import CategoryOptions from "../category/categoryOptions";

const Edit_product = ({
  product,
  getProducts,
  editProduct,
  deleteProduct,
  products,
  idx,
}) => {
  const [formData, setFormData] = useState({
    id: product._id,
    name: product.name,

    description: product.description,

    category_name: product.category_id.name,
  });

  const [isEdit, setIsEdit] = useState(false);

  const { id, name, description, category_name } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    editProduct({ id, name, description, category_name });

    setFormData({
      id: product._id,
      name: product.name,

      description: product.description,

      category_name: product.category_id.name,
    });

    setIsEdit(!isEdit);
  };

  return isEdit === true ? (
    <Fragment>
      <tr>
        <td>{idx + 1}</td>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{product.category_id.name}</td>
      </tr>
    </Fragment>
  ) : (
    <Fragment>
      <tr>
        <td>{idx + 1}</td>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{product.category_id.name}</td>
      </tr>
    </Fragment>
  );
};

Edit_product.propTypes = {
  getProducts: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  editProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.product.products,
});

export default connect(mapStateToProps, {
  getProducts,
  editProduct,
  deleteProduct,
})(Edit_product);
