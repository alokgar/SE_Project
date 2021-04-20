import React, { Fragment, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../layout/Spinner";
import Approve_status from "../approve_status/approve_status";
import { getCurrentProfile, deleteAccount } from "../../../actions/profile";
import Sidebar1 from "../sidebar/sidebar";
import { Row, Button, Col, Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Datacard, Tablecard } from "../helper/card";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { getSales } from "../../../actions/sales";
import { getStocks } from "../../../actions/stock";
import { getRaw_materials } from "../../../actions/raw_material";
import Alert from "../../layout/Alert";

const Dashboard = ({
  getCurrentProfile,
  orders,
  deleteAccount,
  auth: { user },
  con_orders,
  dis_orders,
  getSales,
  stocks,
  rawMaterial,
  getRaw_materials,
  getStocks,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
    getSales();
    getStocks();
    getRaw_materials();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div className="row" style={{ height: "100%" }}>
      <Sidebar1 link="/dashboard" />
      <div className="col-md-10 mainContainer ScrollDiv">
        <p
          style={{
            borderBottom: "1px solid black ",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#17a2b8",
          }}
        >
          <Alert />
          Dashboard
        </p>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <Card
              style={{
                height: "630px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                border: "solid ipx var(--dark-color)",
                overflow: "auto",
              }}
            >
              <Card.Header className="bg-dark">
                <b style={{ fontSize: "20px" }}> Today</b>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    {dis_orders ? (
                      <Datacard
                        title={"Sales"}
                        subtitle={Object.keys(dis_orders).length}
                        link={"/sales"}
                        color={"#39ac39"}
                      />
                    ) : (
                      <Datacard
                        title={"Sales"}
                        subtitle={"..."}
                        link={"/sales"}
                        color={"#39ac39"}
                      />
                    )}
                  </Col>
                  <Col>
                    {con_orders ? (
                      <Datacard
                        title={"To Dispatch"}
                        subtitle={Object.keys(con_orders).length}
                        link={"/sales"}
                        color={"#dc3545"}
                      />
                    ) : (
                      <Datacard
                        title={"To Dispatch"}
                        subtitle={"..."}
                        link={"/sales"}
                        color={"#dc3545"}
                      />
                    )}
                  </Col>
                </Row>
                <div
                  className="tableDiv"
                  style={{ maxHeight: "250px", marginTop: "20px" }}
                >
                  <p
                    style={{
                      borderBottom: "1px solid black ",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    Stock Alert
                  </p>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Packing</th>
                        <th>Quantity</th>
                        <th>Last updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stocks ? (
                        stocks.length !== 0 ? (
                          stocks.map(function (stock) {
                            if (stock.quantity <= 100) {
                              return (
                                <tr>
                                  <td>{stock.product_id.name}</td>
                                  <td>
                                    {stock.size_id.packing_type +
                                      " " +
                                      stock.size_id.unit}
                                  </td>
                                  <td>{stock.quantity}</td>
                                  <td>{stock.last_update.slice(0, 10)}</td>
                                </tr>
                              );
                            }
                          })
                        ) : (
                          <tr>
                            <td colSpan="4" style={{ textAlign: "center" }}>
                              No Entry Found !{" "}
                            </td>
                          </tr>
                        )
                      ) : null}
                    </tbody>
                  </Table>
                </div>
                <div
                  className="tableDiv"
                  style={{ maxHeight: "250px", marginTop: "20px" }}
                >
                  <p
                    style={{
                      borderBottom: "1px solid black ",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    Raw Material Alert
                  </p>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Material Name</th>
                        <th>Quantity</th>
                        <th>Last Recieved</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rawMaterial ? (
                        rawMaterial.length !== 0 ? (
                          rawMaterial.map(function (raw) {
                            if (raw.quantity <= 50) {
                              return (
                                <tr>
                                  <td>{raw.name}</td>
                                  <td>{raw.quantity + " " + raw.unit}</td>
                                  <td>
                                    {raw.date_of_receiving
                                      .toString()
                                      .slice(0, 10)}
                                  </td>
                                </tr>
                              );
                            }
                          })
                        ) : (
                          <tr>
                            <td colSpan="4" style={{ textAlign: "center" }}>
                              No Entry Found !{" "}
                            </td>
                          </tr>
                        )
                      ) : null}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              style={{
                height: "300px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                border: "solid ipx var(--dark-color)",
                overflow: "auto",
              }}
            >
              <Card.Header className="bg-dark">
                <b>Pending Orders</b>
                <Button
                  variant="primary"
                  size="sm"
                  style={{ float: "right", fontSize: "12px" }}
                  href="/orders"
                >
                  See All
                </Button>
              </Card.Header>
              {orders ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Order Date</th>
                      <th>Status</th>
                      <th>Employee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length !== 0 ? (
                      orders.map(function (order) {
                        if (order.status === "Pending") {
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
                                  {order.employee_id.first_name +
                                    " " +
                                    order.employee_id.last_name}
                                </td>
                              </tr>
                            </Fragment>
                          );
                        }
                      })
                    ) : (
                      <tr>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          No Entry Found !{" "}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              ) : (
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    textAlign: "center",
                    padding: "100px 0px",
                  }}
                >
                  <b>No Entry Found!</b>
                </div>
              )}
            </Card>
            <div>
              <Tablecard
                title={"New Employees"}
                link={"/employees"}
                table={<Approve_status />}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getSales: PropTypes.func.isRequired,
  getStocks: PropTypes.func.isRequired,
  getRaw_materials: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  orders: state.sales.pen_order,
  dis_orders: state.sales.dis_order,
  con_orders: state.sales.con_order,
  stocks: state.stock.stocks,
  rawMaterial: state.raw_material.raw_materials,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  getSales,
  getStocks,
  getRaw_materials,
})(Dashboard);
