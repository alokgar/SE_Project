import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSales } from "../../../actions/sales";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import { Button, Row, Col } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Sidebar1 from "../sidebar/sidebar";
import { Datacard, Tablecard } from "../helper/card";

const Sales = ({
  getSales,
  con_order,
  dis_order,
  pen_order,
  prod_wise_order,
  loading,
  match,
}) => {
  const [showP, setP] = useState(false);
  const [showO, setO] = useState(false);
  const [viewId, setviewId] = useState(null);
  useEffect(() => {
    getSales();
  }, [getSales]);

  return loading === true ? (
    <div></div>
  ) : (
    <div className="row" style={{ height: "100%" }}>
      <Sidebar1 link="/sales" />
      <div className="col-md-10 mainContainer">
        <p style={{ borderBottom: "1px solid black " }}>
          <span
            style={{ fontWeight: "bold", color: "#17a2b8", fontSize: "25px" }}
          >
            Sales
          </span>
        </p>

        <Row style={{ justifyContent: "space-evenly" }}>
          <Col xs={3}>
            <Datacard
              title={"Total Orders"}
              subtitle={
                Object.keys(pen_order).length +
                Object.keys(dis_order).length +
                Object.keys(con_order).length
              }
              link={"/Sales"}
              color={"#17a2b8"}
            />
          </Col>
          <Col xs={3}>
            <Datacard
              title={"Confirmed Orders"}
              subtitle={Object.keys(con_order).length}
              link={"/Sales"}
              color={"#39ac39"}
            />
          </Col>
          <Col xs={3}>
            <Datacard
              title={"Dispatched Orders"}
              subtitle={Object.keys(dis_order).length}
              link={"/Sales"}
              color={"#dc3545"}
            />
          </Col>
        </Row>

        <br></br>
        <Row>
          <Col>
            <Card
              style={{
                maxHeight: "300px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                border: "solid ipx var(--dark-color)",
              }}
            >
              <Card.Header className="bg-dark">
                <b>Sales History</b>
              </Card.Header>
              <div className="tableDiv">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th>Size</th>
                      <th>Quantity sold</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prod_wise_order.length === 0 ? (
                      <tr>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          No Entry Found!
                        </td>
                      </tr>
                    ) : (
                      prod_wise_order.map(function (prod) {
                        if (prod._id.status === "Dispatched") {
                          return (
                            <Fragment>
                              <tr>
                                <td>#</td>
                                <td>{prod.product_name}</td>
                                <td>
                                  {prod.packing_type} {prod.unit}
                                </td>
                                <td>
                                  {prod.quantity}{" "}
                                  {prod.unit === "Kg" ||
                                  prod.unit === "g" ||
                                  prod.unit === "kg"
                                    ? "kg"
                                    : "ltr"}
                                </td>
                              </tr>
                            </Fragment>
                          );
                        }
                      })
                    )}
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>
          <Col>
            <Card
              style={{
                maxHeight: "300px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                border: "solid ipx var(--dark-color)",
              }}
            >
              <Card.Header className="bg-dark">
                <b>To be Dispatched</b>
              </Card.Header>
              <div className="tableDiv">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th>Size</th>
                      <th>Quantity sold</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prod_wise_order.length === 0 ? (
                      <tr>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          No Entry Found!
                        </td>
                      </tr>
                    ) : (
                      prod_wise_order.map(function (prod) {
                        if (prod._id.status === "Confirmed") {
                          return (
                            <Fragment>
                              <tr>
                                <td>#</td>
                                <td>{prod.product_name}</td>
                                <td>
                                  {prod.packing_type} {prod.unit}
                                </td>
                                <td>
                                  {prod.quantity}{" "}
                                  {prod.unit === "Kg" ||
                                  prod.unit === "g" ||
                                  prod.unit === "kg"
                                    ? "kg"
                                    : "ltr"}
                                </td>
                              </tr>
                            </Fragment>
                          );
                        }
                      })
                    )}
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

Sales.propTypes = {
  getSales: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  con_order: state.sales.con_order,
  dis_order: state.sales.dis_order,
  pen_order: state.sales.pen_order,
  prod_wise_order: state.sales.prod_wise_order,
  loading: state.sales.loading,
});

export default connect(mapStateToProps, { getSales })(Sales);
