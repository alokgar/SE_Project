import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProducts, addProduct, editProduct } from "../../../actions/product";
import Table from "react-bootstrap/Table";
import Edit_product from "./Edit_product";
import Form from "react-bootstrap/Form";
import { Button, Row, Col, Spinner } from "react-bootstrap";
import Sidebar1 from "../sidebar/sidebar";
import FilterProducts from "./filterProducts";
import CategoryOptions from "../category/categoryOptions";

const Product = ({ getProducts, addProduct, editProduct, products }) => {
  const [showTable, setTable] = useState(true);
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const [formData, setFormData] = useState({
    name: "",

    description: "",

    category_name: "DEFAULT",
  });

  const { name, description, category_name } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(category_name);
    addProduct({ name, description, category_name });

    setFormData({
      name: "",

      description: "",

      category_name: "DEFAULT",
    });

    setTable(!showTable);
  };

  return products.length == null ? (
    <div>
      <Spinner />
    </div>
  ) : showTable === true ? (
    <div className="row" style={{ height: "100%" }}>
      <Sidebar1 link="/emp/products" />
      <div className="col-md-8 mainContainer">
        <p
          style={{
            borderBottom: "1px solid black ",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#17a2b8",
          }}
        >
          Products
        </p>
        <div className="tableDiv">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length != 0 ? (
                products.map(function (product, idx) {
                  return <Edit_product product={product} idx={idx} />;
                })
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No products{" "}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <br />
        </div>
        <br></br>
      </div>
      <FilterProducts />
    </div>
  ) : (
    <div className="row" style={{ height: "100%" }}>
      <Sidebar1 link="/emp/products" />
      <div className="col-md-10 mainContainer ScrollDiv">
        <h2>Add Product</h2>
        <br />
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
              name="category_name"
              onChange={(e) => onChange(e)}
            >
              <option value="" disabled>
                Choose...
              </option>
              <CategoryOptions />
            </Form.Control>
          </Form.Group>

          <Button type="submit">Add Product</Button>
          <Button
            variant="outline-primary"
            size="lg"
            href="/products"
            style={{ float: "right", marginRight: "20px" }}
          >
            Cancel
          </Button>
        </Form>
      </div>
    </div>
  );
};

Product.propTypes = {
  getProducts: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  editProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.product.products,
});

export default connect(mapStateToProps, {
  getProducts,
  addProduct,
  editProduct,
})(Product);
