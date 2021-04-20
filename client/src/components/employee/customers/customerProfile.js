import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCustomerProfile } from "../../../actions/customer";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import { Button, Row, Col } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Sidebar1 from "../sidebar/sidebar";
import Spinner from "../../layout/Spinner";
import OrderList from "../orders/order_list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faUser,
  faMobileAlt,
} from "@fortawesome/free-solid-svg-icons";

const CustomerProfile = ({
  getCustomerProfile,
  cust_orders,
  cust_payments,
  curr_customer,
  match,
}) => {
  const [showP, setP] = useState(false);
  const [showO, setO] = useState(false);
  const [viewId, setviewId] = useState(null);

  useEffect(() => {
    getCustomerProfile(match.params.id);
  }, [getCustomerProfile, match.params.id]);

  const click = () => {
    <Redirect to="/customers" />;
  };
  return curr_customer === null ? (
    <div>
      <Spinner />
    </div>
  ) : (
    <div className="row" style={{ height: "100%" }}>
      <Sidebar1 />
      <div className="col-md-10 mainContainer">
        <Card
          style={{
            maxHeight: "100%",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            border: "solid ipx var(--dark-color)",
            overflow: "auto",
          }}
        >
          <Card.Header as="h5" className="bg-dark" style={{ opacity: "0.9" }}>
            {curr_customer.first_name} {curr_customer.last_name}
            <a href={"/customers"}>
              <Badge
                variant="danger"
                style={{ padding: "5px", borderRadius: "50%", float: "right" }}
              >
                X
              </Badge>
            </a>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col xs={1}>
                <FontAwesomeIcon icon={faUser} size="6x" />
              </Col>
              <Col style={{ marginLeft: "15px" }}>
                <b style={{ fontSize: "25px" }}>
                  {curr_customer.first_name} {curr_customer.last_name}
                  <br />
                </b>
                <span>
                  <FontAwesomeIcon icon={faMobileAlt} />
                  {"   " + curr_customer.mobile_no}
                </span>
                <br />
                <span>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  {"   " + curr_customer.address.city.name}
                </span>
              </Col>

              <Col style={{ float: "right" }}>
                <span>
                  <Badge
                    pill
                    variant="danger"
                    style={{ padding: "8px", fontSize: "15px" }}
                  >
                    <a
                      href={`/profile/${curr_customer.employee_id._id}`}
                      style={{ color: "white" }}
                    >
                      {curr_customer.employee_id.first_name +
                        " " +
                        curr_customer.employee_id.last_name}
                    </a>
                  </Badge>{" "}
                </span>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <br></br>
        <Row>
          <Col>
            <Card
              style={{
                height: "300px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                border: "solid ipx var(--dark-color)",
              }}
            >
              <Card.Header className="bg-dark">
                <b>Past Orders</b>
              </Card.Header>
              <div className="tableDiv">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Order Date</th>
                      <th>Status</th> <th>Dispatch Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cust_orders.map(function (order) {
                      return (
                        <Fragment>
                          <tr>
                            <td>{order.order_date.slice(0, 10)}</td>
                            <td>
                              {order.status === "Pending" ? (
                                <Badge
                                  variant="danger"
                                  style={{ padding: "8px" }}
                                >
                                  Pending
                                </Badge>
                              ) : order.status === "Confirmed" ? (
                                <Badge
                                  variant="dark"
                                  style={{ padding: "8px" }}
                                >
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
                              {order.dispatched_date === undefined
                                ? "Not Dispatched"
                                : order.dispatched_date.slice(0, 10)}
                              <Button
                                variant="success"
                                style={{ float: "right", padding: "2px 4px" }}
                                onClick={() => {
                                  viewId === null
                                    ? setviewId(order._id)
                                    : viewId === order._id
                                    ? setviewId(null)
                                    : setviewId(order._id);
                                }}
                              >
                                ˅
                              </Button>
                            </td>
                          </tr>
                          {viewId === order._id ? (
                            <OrderList orderslist={order.details} />
                          ) : null}
                        </Fragment>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>
          <Col>
            <Card
              style={{
                height: "300px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                border: "solid ipx var(--dark-color)",
              }}
            >
              <Card.Header className="bg-dark">
                <b>Past Payments</b>
              </Card.Header>
              <div className="tableDiv">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cust_payments.map(function (pay) {
                      return (
                        <tr>
                          <td>{pay.date.slice(0, 10)}</td>
                          <td>{pay.amount}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>
        </Row>

        {(showO || showP) && (
          <div>
            <Table striped bordered hover>
              <thead>
                {showO ? (
                  <tr>
                    <th>Order Date</th>
                    <th>Status</th> <th>Dispatch Date</th>
                  </tr>
                ) : (
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {showO
                  ? cust_orders.map(function (order) {
                      return (
                        <tr>
                          <td>{order.order_date.slice(0, 10)}</td>
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
                            {order.dispatched_date === undefined
                              ? "Not Dispatched"
                              : order.dispatched_date.slice(0, 10)}
                          </td>
                        </tr>
                      );
                    })
                  : cust_payments.map(function (pay) {
                      return (
                        <tr>
                          <td>{pay.date.slice(0, 10)}</td>
                          <td>{pay.amount}</td>
                        </tr>
                      );
                    })}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

CustomerProfile.propTypes = {
  getCustomerProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  curr_customer: state.customer.curr_customer,
  cust_orders: state.customer.cust_orders,
  cust_payments: state.customer.cust_payments,
});

export default connect(mapStateToProps, { getCustomerProfile })(
  CustomerProfile
);
