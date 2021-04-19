import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOrders } from "../../../actions/product";
import Table from "react-bootstrap/Table";
import Alert from "../../layout/Alert";
const OrderList = ({ orderslist }) => {
  useEffect(() => {}, []);
  return (
    <tr>
      <td colSpan="5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>Packing</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orderslist !== null &&
              orderslist.map((order) => (
                <tr>
                  <td>{order.product_id.name}</td>
                  <td>
                    {order.size_id.packing_type} {order.size_id.unit}
                  </td>
                  <td>{order.quantity + "Ltr"}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </td>
    </tr>
  );
};

export default OrderList;
