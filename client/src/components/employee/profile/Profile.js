import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../layout/Spinner";
import { getCurrentProfile } from "../../../actions/profile";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import { Button, Row, Col } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Sidebar1 from "../sidebar/sidebar";
import OrderList from "../orders/order_list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faMobileAlt,
} from "@fortawesome/free-solid-svg-icons";

const Profile = ({
  getCurrentProfile,
  loading,
  user,
  orders,
  payments,
  prod_wise,
  match,
}) => {
  const [viewId, setviewId] = useState(null);

  useEffect(() => {
    getCurrentProfile(match.params.id);
  }, [getCurrentProfile, match.params.id]);

  return user === null || loading ? (
    <Spinner />
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
            <span style={{ fontSize: "25px" }}>Profile</span>
            <a href={"/employees"}>
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
                  {user.first_name} {user.last_name}
                  <br />
                </b>
                <span>
                  <FontAwesomeIcon icon={faEnvelope} />
                  {"  " + user.email}
                </span>
                <br />
                <span>
                  <FontAwesomeIcon icon={faMobileAlt} />
                  {"   " + user.mobile_no}
                </span>
              </Col>

              <Col></Col>
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
                      <th>Status</th>
                      <th>Dispatch Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(function (order) {
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
                <b>Payments</b>
              </Card.Header>
              <div className="tableDiv">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Customer Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map(function (pay) {
                      return (
                        <tr>
                          <td>{pay.date.slice(0, 10)}</td>
                          <td>{"Rs. " + pay.amount}</td>
                          <td>
                            <a
                              href={`/emp/customer/${pay.customer_id._id}`}
                              style={{ color: "black" }}
                            >
                              {pay.customer_id.first_name +
                                " " +
                                pay.customer_id.last_name}
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.profile.profile,
  orders: state.profile.orders,
  payments: state.profile.payments,
  prod_wise: state.profile.prod_wise_order,
  loading: state.profile.loading,
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
