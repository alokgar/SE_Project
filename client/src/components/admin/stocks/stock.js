import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getStocks, addStock, editStock } from "../../../actions/stock";
import Table from "react-bootstrap/Table";
import ProductOptions from "../products/productOptions";
import SizeOptions from "../sizes/sizeOptions";
import Edit_stock from "./Edit_stock";
import Form from "react-bootstrap/Form";
import { Button, Row, Col } from "react-bootstrap";
import Sidebar1 from "../sidebar/sidebar";
import Alert from "../../layout/Alert";

const Stock = ({ getStocks, addStock, editStock, stocks }) => {
  const [showTable, setTable] = useState(true);

  useEffect(() => {
    getStocks();
  }, [getStocks]);

  const [formData, setFormData] = useState({
    price: "",
    quantity: "",
    product_name: "",
    size_packing_type: "",
  });

  const { price, quantity, product_name, size_packing_type } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    addStock({ price, quantity, product_name, size_packing_type });
    setFormData({
      price: "",
      quantity: "",
      product_name: "",
      size_packing_type: "",
    });
    setTable(!showTable);
  };

  return stocks === null ? (
    <div></div>
  ) : showTable === true ? (
    <div className="row" style={{ height: "100%" }}>
      <Sidebar1 link="/stocks" />
      <div className="col-md-10 mainContainer">
        <p
          style={{
            borderBottom: "1px solid black ",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#17a2b8",
          }}
        >
          <Alert />
          Stocks
        </p>
        <div className="tableDiv">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Packing</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Last Update</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stocks.length !== 0 ? (
                stocks.map(function (stock) {
                  return <Edit_stock stock={stock} />;
                })
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No Entry Found !{" "}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <br />
        <Button onClick={() => setTable(false)}>Add Stock</Button>
      </div>
    </div>
  ) : (
    <div className="row" style={{ height: "100%" }}>
      <Sidebar1 link="/stocks" />
      <div className="col-md-10 mainContainer ScrollDiv">
        <h2>Add Stock</h2>
        <br />

        <Form onSubmit={(e) => onSubmit(e)} style={{ width: "60%" }}>
          <Form.Group>
            <Form.Label>Select Product</Form.Label>
            <Form.Control
              as="select"
              name="product_name"
              value={product_name}
              onChange={(e) => onChange(e)}
              required
            >
              <option value="" disabled>
                Choose...
              </option>
              <ProductOptions />
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Select Packing</Form.Label>
            <Form.Control
              as="select"
              name="size_packing_type"
              value={size_packing_type}
              onChange={(e) => onChange(e)}
              required
            >
              <option value="" disabled>
                Choose...
              </option>
              <SizeOptions />
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="text"
              pattern="^0*[1-9]\d*"
              title="Provide greater than 0"
              placeholder="quantity"
              name="quantity"
              value={quantity}
              onChange={(e) => onChange(e)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              required
              type="text"
              pattern="^0*[1-9]\d*"
              title="Provide greater than 0"
              placeholder="price"
              name="price"
              value={price}
              onChange={(e) => onChange(e)}
              required
            />
          </Form.Group>

          <Button type="submit">Add Stock</Button>
          <Button
            variant="outline-primary"
            size="lg"
            href="/stocks"
            style={{ float: "right", marginRight: "20px" }}
          >
            Cancel
          </Button>
        </Form>
      </div>
    </div>
  );
};

Stock.propTypes = {
  getStocks: PropTypes.func.isRequired,
  addStock: PropTypes.func.isRequired,
  editStock: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stocks: state.stock.stocks,
});

export default connect(mapStateToProps, { getStocks, addStock, editStock })(
  Stock
);
