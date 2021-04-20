import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Alert from "../../layout/Alert";
import {
  getOrders,
  confirmOrder,
  dispatchOrder,
  deleteOrder,
} from "../../../actions/order";
import Table from "react-bootstrap/Table";
import OrderList from "./order_list";
import product from "../products/product";
import AddOrder from "./add_order";
import { Button, Row, Col } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Sidebar1 from "../sidebar/sidebar";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "../../layout/Spinner";
import Form from "react-bootstrap/Form";

const Order = ({
  getOrders,
  confirmOrder,
  deleteOrder,
  dispatchOrder,
  orders,
}) => {
  const [showTable, setTable] = useState(true);
  const [viewId, setviewId] = useState(null);
  const [view, setview] = useState("all");

  const [num, setNum] = useState("");

  const setonChange = () => {
    setTable(!showTable);
  };

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return orders == null ? (
    <div>
      <Spinner />
    </div>
  ) : showTable === true ? (
    <div className="row" style={{ height: "100%" }}>
      <Sidebar1 link="/orders" />

      <div className="col-md-10 mainContainer">
        <Alert />
        <p
          style={{
            borderBottom: "1px solid black ",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#17a2b8",
          }}
        >
          Orders
        </p>
        <ListGroup horizontal style={{ marginBottom: "20px" }}>
          <Button onClick={() => setview("all")}>All</Button>
          <Button onClick={() => setview("Pending")}>Pending</Button>
          <Button onClick={() => setview("Confirmed")}>Confirmed</Button>
          <Button onClick={() => setview("Dispatched")}>Dispatched</Button>
        </ListGroup>
        <div className="tableDiv">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Order Date</th>
                <th>Dispatch Date</th>
                <th>Status</th>
                <th>Action</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {view === "all" ? (
                orders.length !== 0 ? (
                  orders.map(function (order) {
                    if (order === undefined) {
                      return <div></div>;
                    }
                    var id = order._id;
                    return (
                      <Fragment>
                        <tr>
                          <td>
                            {order.customer_id.first_name +
                              " " +
                              order.customer_id.last_name}
                          </td>
                          <td>{order.order_date.slice(0, 10)}</td>
                          <td>
                            {order.dispatched_date === undefined
                              ? "Not Dispatched"
                              : order.dispatched_date.slice(0, 10)}
                          </td>

                          <td>
                            {order.status === "Pending" ? (
                              <Badge
                                variant="danger"
                                style={{ padding: "8px" }}
                              >
                                Pending
                              </Badge>
                            ) : order.status === "Confirmed" ? (
                              <Badge variant="dark" style={{ padding: "8px" }}>
                                Confirmed
                              </Badge>
                            ) : (
                              <Badge
                                variant="success"
                                style={{ padding: "8px" }}
                              >
                                Dispatched
                              </Badge>
                            )}
                          </td>
                          <td>
                            {order.status === "Pending" ? (
                              <Button
                                variant="success"
                                onClick={() => {
                                  confirmOrder(id);
                                }}
                              >
                                {" "}
                                Confirm
                              </Button>
                            ) : order.status === "Confirmed" ? (
                              <Form.Row>
                                <Form.Control
                                  size="sm"
                                  type="text"
                                  name="num"
                                  placeholder="Dispactch No."
                                  style={{ width: "100px" }}
                                  onChange={(e) => setNum(e.target.value)}
                                />

                                <Button
                                  variant="danger"
                                  onClick={() => {
                                    dispatchOrder(id, num, order.details);
                                  }}
                                  type="submit"
                                  style={{
                                    padding: "5px",
                                    marginLeft: "10px",
                                  }}
                                >
                                  {" "}
                                  Go
                                </Button>
                              </Form.Row>
                            ) : (
                              order.dispatch_num
                            )}
                          </td>
                          <td>
                            <Button
                              variant="success"
                              onClick={() => {
                                viewId === null
                                  ? setviewId(id)
                                  : viewId === id
                                  ? setviewId(null)
                                  : setviewId(id);
                              }}
                            >
                              {" "}
                              View
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => {
                                deleteOrder(id);
                              }}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                        {viewId === order._id ? (
                          <OrderList orderslist={order.details} />
                        ) : null}
                      </Fragment>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      No Entry Found !{" "}
                    </td>
                  </tr>
                )
              ) : orders.length !== 0 ? (
                orders.map(function (order) {
                  if (order === undefined) {
                    return <div></div>;
                  }
                  var id = order._id;
                  if (order.status === view) {
                    return (
                      <Fragment>
                        <tr>
                          <td>
                            {order.customer_id.first_name +
                              " " +
                              order.customer_id.last_name}
                          </td>
                          <td>{order.order_date.slice(0, 10)}</td>
                          <td>
                            {order.dispatched_date === undefined
                              ? "Not Dispatched"
                              : order.dispatched_date.slice(0, 10)}
                          </td>

                          <td>
                            {order.status === "Pending" ? (
                              <Badge
                                variant="danger"
                                style={{ padding: "8px" }}
                              >
                                Pending
                              </Badge>
                            ) : order.status === "Confirmed" ? (
                              <Badge variant="dark" style={{ padding: "8px" }}>
                                Confirmed
                              </Badge>
                            ) : (
                              <Badge
                                variant="success"
                                style={{ padding: "8px" }}
                              >
                                Dispatched
                              </Badge>
                            )}
                          </td>
                          <td>
                            {order.status === "Pending" ? (
                              <Button
                                variant="success"
                                onClick={() => {
                                  confirmOrder(id);
                                }}
                              >
                                {" "}
                                Confirm
                              </Button>
                            ) : order.status === "Confirmed" ? (
                              <Button
                                variant="danger"
                                onClick={() => {
                                  dispatchOrder(id, order.details);
                                }}
                              >
                                {" "}
                                Disptach
                              </Button>
                            ) : (
                              order.dispatch_num
                            )}
                          </td>
                          <td>
                            <Button
                              variant="success"
                              onClick={() => {
                                viewId === null
                                  ? setviewId(id)
                                  : viewId === id
                                  ? setviewId(null)
                                  : setviewId(id);
                              }}
                            >
                              {" "}
                              View
                            </Button>
                          </td>
                        </tr>
                        {viewId === order._id ? (
                          <OrderList orderslist={order.details} />
                        ) : null}
                      </Fragment>
                    );
                  }
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
        <Button onClick={() => setTable(false)}>Create Order</Button>
      </div>
    </div>
  ) : (
    <AddOrder table={setonChange} />
  );
};

Order.propTypes = {
  getOrders: PropTypes.func.isRequired,
  confirmOrder: PropTypes.func.isRequired,
  dispatchOrder: PropTypes.func.isRequired,
  deleteOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.order.orders,
});

export default connect(mapStateToProps, {
  deleteOrder,
  getOrders,
  confirmOrder,
  dispatchOrder,
})(Order);
