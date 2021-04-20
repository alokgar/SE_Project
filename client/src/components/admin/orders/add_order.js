import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOrders, confirmOrder, dispatchOrder } from "../../../actions/order";
import Table from "react-bootstrap/Table";
import OrderList from "./order_list";
import product from "../products/product";
import Form from "react-bootstrap/Form";
import { Button, Row, Col } from "react-bootstrap";
import Alert from "../../layout/Alert";

import CustomerOptions from "../customers/customerOptions";
import ProductOptionsbyID from "../products/productOptionsbyID";
import SizeOptionsbyID from "../sizes/sizeOptionbyID";
import { addOrders } from "../../../actions/order";
import { setAlert } from "../../../actions/alert";
import Sidebar1 from "../sidebar/sidebar";

const AddOrder = ({ setAlert, auth: { user }, addOrders, orders, table }) => {
  useEffect(() => {}, []);

  const [product, setproduct] = useState({
    customer_id: "",
    employee_id: user._id,
    details: [],
  });

  const [detail, setdetail] = useState({
    product_id: "",
    quantity: 0,
    size_id: "",
  });

  const [showproducts, setproducts] = useState([]);

  var { customer_id, employee_id, details } = product;
  const { product_id, quantity, size_id } = detail;

  const onChange = (e) =>
    setdetail({ ...detail, [e.target.name]: e.target.value });

  const onChangeOrder = (e) =>
    setproduct({ ...product, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    let temp = {
      product_name: product_id.split("$")[1],
      quantity: quantity,
      size_name: size_id.split("$")[1],
    };
    setproducts((showproducts) => [...showproducts, temp]);

    let d = {
      product_id: product_id.split("$")[0],
      quantity: quantity,
      size_id: size_id.split("$")[0],
    };
    details.push(d);
    setproduct({
      ...product,
      details,
    });
    setdetail({
      product_id: "",
      quantity: 0,
      size_id: "",
    });
  };

  const onSubmitOrder = async (e) => {
    e.preventDefault();
    setproduct({
      ...product,
      details,
    });
    if (details.length > 0) addOrders(product);
    else {
      setAlert("Please select product to order!", "danger");
    }

    setproduct({
      customer_id: "",
      employee_id: user._id,
      details: [],
    });

    setdetail({
      product_id: "",
      quantity: 0,
      size_id: "",
    });

    if (details.length > 0) {
      table();
    }
  };

  return (
    <div className="row" style={{ height: "100%" }}>
      <Sidebar1 link="/orders" />
      <div className="col-md-10 mainContainer ScrollDiv">
        <Alert />
        <h2>Create Order</h2>
        <br />
        {showproducts.length !== 0 && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Packing</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {showproducts.map((detail) => (
                <tr>
                  <td>{detail.product_name}</td>
                  <td>{detail.size_name}</td>
                  <td>{detail.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <Form onSubmit={(e) => onSubmit(e)} style={{ width: "60%" }}>
          <Form.Group>
            <Form.Label>Product</Form.Label>
            <Form.Control
              as="select"
              name="product_id"
              value={product_id}
              onChange={(e) => onChange(e)}
            >
              <option value="" disabled>
                Choose...
              </option>
              <ProductOptionsbyID />
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Packing</Form.Label>
            <Form.Control
              as="select"
              name="size_id"
              value={size_id}
              onChange={(e) => onChange(e)}
            >
              <option value="" disabled>
                Choose...
              </option>
              <SizeOptionsbyID />
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="quantity"
              name="quantity"
              value={quantity}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Button type="submit">Add Item</Button>
        </Form>
        <br />

        <Form onSubmit={(e) => onSubmitOrder(e)} style={{ width: "90%" }}>
          <Form.Group>
            <Form.Label>Select Customer</Form.Label>
            <Form.Control
              as="select"
              name="customer_id"
              value={customer_id}
              onChange={(e) => onChangeOrder(e)}
            >
              <option value="" disabled>
                Choose...
              </option>
              <CustomerOptions />
            </Form.Control>
          </Form.Group>
          <br></br>
          <Button type="submit">Add order</Button>
          <Button
            variant="outline-primary"
            size="lg"
            href="/orders"
            style={{ float: "right", marginRight: "20px" }}
          >
            Cancel
          </Button>
        </Form>
      </div>
    </div>
  );
};

AddOrder.propTypes = {
  getOrders: PropTypes.func.isRequired,
  addOrders: PropTypes.func.isRequired,
  confirmOrder: PropTypes.func.isRequired,
  dispatchOrder: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  setAlert,
  getOrders,
  confirmOrder,
  dispatchOrder,
  addOrders,
})(AddOrder);
