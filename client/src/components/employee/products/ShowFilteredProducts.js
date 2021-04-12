import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getProducts,
  addProduct,
  editProduct,
  clearFilterProduct,
} from "../../../actions/product";
import Table from "react-bootstrap/Table";
import { Button, Row, Col } from "react-bootstrap";
import Edit_product from "./Edit_product";

const ShowFilteredProducts = ({
  addProduct,
  editProduct,
  clearFilterProduct,
  filtered_products,
}) => {
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
  };

  return filtered_products.length === 0 ? (
    <div></div>
  ) : (
    <Fragment>
      All filtered products are shown here
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
          </tr>
        </thead>
        <tbody>
          {filtered_products.map(function (product) {
            if (product === undefined) {
              return <div></div>;
            }
            return (
              <div>
                <Edit_product product={product} />
              </div>
            );
          })}
        </tbody>
      </Table>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="description"
            name="description"
            value={description}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="form-group">
          <select
            defaultValue={"DEFAULT"}
            name="category_name"
            onChange={(e) => onChange(e)}
          >
            <option value="DEFAULT" disabled>
              Choose a salutation ...
            </option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </div>

        <input type="submit" className="btn btn-primary" value="Add Product" />
        <Button
          variant="outline-primary"
          size="lg"
          href="/products"
          style={{ float: "right", marginRight: "20px" }}
          onClick={() => clearFilterProduct()}
        >
          Back
        </Button>
      </form>
    </Fragment>
  );
};

ShowFilteredProducts.propTypes = {
  addProduct: PropTypes.func.isRequired,
  editProduct: PropTypes.func.isRequired,
  clearFilterProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filtered_products: state.product.filtered_products,
});

export default connect(mapStateToProps, {
  addProduct,
  editProduct,
  clearFilterProduct,
})(ShowFilteredProducts);
