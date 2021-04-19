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
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{product.category_id.name}</td>
        <td>
          <Button
            variant="success"
            onClick={() => {
              setIsEdit(!isEdit);
            }}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteProduct(id);
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
      <tr>
        <td colSpan="5">
          <Form onSubmit={(e) => onSubmit(e)} style={{ width: "60%" }}>
            <Form.Group>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="name"
                name="name"
                value={name}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="description"
                name="description"
                value={description}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                disabled
                name="category_name"
                value={category_name}
                onChange={(e) => onChange(e)}
              >
                <option value="" disabled>
                  Choose...
                </option>
                <CategoryOptions />
              </Form.Control>
            </Form.Group>

            <Button type="submit">Edit Product</Button>
          </Form>
        </td>
      </tr>
    </Fragment>
  ) : (
    <Fragment>
      <tr>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{product.category_id.name}</td>
        <td>
          <Button
            variant="success"
            onClick={() => {
              setIsEdit(!isEdit);
            }}
          >
            Edit
          </Button>

          <Button
            variant="danger"
            onClick={() => {
              deleteProduct(id);
            }}
          >
            Delete
          </Button>
        </td>
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
