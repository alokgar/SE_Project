import React, { Fragment, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../layout/Spinner";
import { getCurrentProfile, deleteAccount } from "../../../actions/profile";
import Sidebar1 from "../sidebar/sidebar";
import { Row, Button, Col, Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Datacard, Tablecard } from "../helper/card";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { getOrders } from "../../../actions/order";
import { getEmpPayments } from "../../../actions/payment";
import Alert from "../../layout/Alert";

const Dashboard = ({
  getCurrentProfile,
  payments,
  orders,
  getEmpPayments,
  getOrders,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
    getOrders(1);
    getEmpPayments();
  }, [getCurrentProfile]);

  const click = (link) => {
    console.log(link);
    <Redirect to={link} />;
  };

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
                height: "300px",
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
                    {orders ? (
                      <Datacard
                        title={"Sales"}
                        subtitle={
                          Object.values(orders).filter(
                            (e) => e.status === "Dispatched"
                          ).length
                        }
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
                    {orders ? (
                      <Datacard
                        title={"To Dispatch"}
                        subtitle={
                          Object.values(orders).filter(
                            (e) => e.status === "Confirmed"
                          ).length
                        }
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
              </Card.Body>
            </Card>
            <Card
              style={{
                height: "300px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                border: "solid ipx var(--dark-color)",
                overflow: "auto",
                marginTop: "20px",
              }}
            >
              <Card.Header className="bg-dark">
                <b>Payments</b>
                <Button
                  variant="primary"
                  size="sm"
                  style={{ float: "right", fontSize: "12px" }}
                  href="/emp/payments"
                >
                  See All
                </Button>
              </Card.Header>
              {payments ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Date</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.length !== 0 ? (
                      payments.map(function (payment) {
                        return (
                          <Fragment>
                            <tr>
                              <td>
                                {payment.customer_id.first_name}{" "}
                                {payment.customer_id.last_name}
                              </td>
                              <td>{payment.date.toString().slice(0, 10)}</td>
                              <td>{"Rs. " + payment.amount}</td>
                            </tr>
                          </Fragment>
                        );
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
                  href="/emp/orders"
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

            <Card
              style={{
                height: "300px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                border: "solid ipx var(--dark-color)",
                overflow: "auto",
                marginTop: "20px",
              }}
            >
              <Card.Header className="bg-dark">
                <b>Confirmed Orders</b>
                <Button
                  variant="primary"
                  size="sm"
                  style={{ float: "right", fontSize: "12px" }}
                  href="/emp/orders"
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
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length !== 0 ? (
                      orders.map(function (order) {
                        if (order.status === "Confirmed") {
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
  getOrders: PropTypes.func.isRequired,
  getEmpPayments: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  orders: state.order.orders,
  payments: state.payment.payments,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  getOrders,
  getEmpPayments,
})(Dashboard);

// import React, { Fragment, useEffect } from "react";
// import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import Spinner from "../../layout/Spinner";
// import { getCurrentProfile, deleteAccount } from "../../../actions/profile";
// import Sidebar1 from "../sidebar/sidebar";
// import { Row, Button, Col, Container } from "react-bootstrap";
// import Card from "react-bootstrap/Card";
// import { Datacard, Tablecard } from "../helper/card";

// const Dashboard = ({
//   getCurrentProfile,

//   deleteAccount,
//   auth: { user },

//   profile: { profile, loading },
// }) => {
//   useEffect(() => {
//     getCurrentProfile();
//   }, [getCurrentProfile]);

//   return loading && profile === null ? (
//     <Spinner />
//   ) : (
//     <div className="row" style={{ height: "100%" }}>
//       <Sidebar1 link="/dashboard" />
//       <div className="col-md-10 mainContainer ScrollDiv">
//         <Row style={{ justifyContent: "space-evenly" }}>
//           <Col xs={3}>
//             <Datacard
//               title={"Sales"}
//               subtitle={260}
//               link={"/sales"}
//               color={"#343a40"}
//             />
//           </Col>
//           <Col xs={3}>
//             <Datacard
//               title={"Sales"}
//               subtitle={260}
//               link={"/sales"}
//               color={"#343a40"}
//             />
//           </Col>
//           <Col xs={3}>
//             <Datacard
//               title={"Sales"}
//               subtitle={260}
//               link={"/sales"}
//               color={"#343a40"}
//             />
//           </Col>
//         </Row>
//         <Row style={{ marginTop: "30px" }}>
//           <Col>
//             {profile !== null ? (
//               <Fragment>
//                 <div className="my-2">
//                   <button
//                     className="btn btn-danger"
//                     onClick={() => deleteAccount()}
//                   >
//                     <i className="fas fa-user-minus" /> Delete My Account
//                   </button>
//                 </div>
//               </Fragment>
//             ) : (
//               <div>
//                 <Tablecard title={"New Employees"} link={"/employees"} />
//               </div>
//             )}
//           </Col>
//           <Col>
//             <Tablecard title={"Pending Queries"} link={"/employees"} />
//           </Col>
//         </Row>
//       </div>
//     </div>
//   );
// };

// Dashboard.propTypes = {
//   getCurrentProfile: PropTypes.func.isRequired,

//   deleteAccount: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   profile: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   profile: state.profile,
// });

// export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
//   Dashboard
// );
