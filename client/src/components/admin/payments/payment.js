import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getPayments,
  addPayment,
  editPayment,
  deletePayment,
} from "../../../actions/payment";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { Button, Row, Col } from "react-bootstrap";
import CustomerOptions from "../customers/customerOptions";
import Spinner from "../../layout/Spinner";
import Sidebar1 from "../sidebar/sidebar";

const Payment = ({
  getPayments,
  addPayment,
  editPayment,
  deletePayment,
  payments,
}) => {
  const [showTable, setTable] = useState(true);
  const [showEdit, setEdit] = useState(false);
  const [viewId, setviewId] = useState(null);
  const [coptID, custoptID] = useState("");

  const [formData, setFormData] = useState({
    id: "",
    date: new Date().toISOString().slice(0, 10),
    customer_id: "",
    amount: "",
  });

  const { id, amount, date, customer_id } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    getPayments();
  }, [getPayments]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (showEdit === false) addPayment({ amount, date, customer_id });
    else {
      editPayment({ id, amount, date, customer_id });
      setEdit(!showEdit);
      custoptID("");
    }

    setFormData({
      id: "",
      date: new Date().toISOString().slice(0, 10),
      customer_id: "",
      amount: "",
    });

    setTable(!showTable);
  };

  const onEditclick = (payment) => {
    setTable(false);
    setEdit(true);
    custoptID(payment.customer_id._id);
    setFormData({
      id: payment._id,
      date: payment.date.toString().slice(0, 10),
      customer_id: payment.customer_id._id,
      amount: payment.amount,
    });
  };

  const onViewclick = (id) => {
    viewId === null
      ? setviewId(id)
      : viewId === id
      ? setviewId(null)
      : setviewId(id);
  };
  return payments === null ? (
    <Spinner />
  ) : showTable === true ? (
    <div className="row" style={{ height: "100%" }}>
      <Sidebar1 link="/payments" />
      <div className="col-md-10 mainContainer">
        <p
          style={{
            borderBottom: "1px solid black ",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#17a2b8",
          }}
        >
          Payments
        </p>
        <div className="tableDiv">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Actions</th>
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
                        {/* <td><Button variant="success" onClick={() => onViewclick(payment._id)} >View</Button></td> */}
                        <td>
                          <Button
                            variant="success"
                            onClick={() => onEditclick(payment)}
                          >
                            Edit
                          </Button>

                          <Button
                            variant="danger"
                            onClick={() => deletePayment(payment._id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                      {/* {viewId === payment._id?<tr><td>Content</td><td colSpan="4"> {payment.content}</td></tr>:null} */}
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
        </div>
        <Button onClick={() => setTable(false)}>Add Payment</Button>
      </div>
    </div>
  ) : (
    <div className="row" style={{ height: "100%" }}>
      <Sidebar1 link="/payments" />
      <div className="col-md-10 mainContainer ScrollDiv">
        <h2>Add Payment</h2>
        <Form onSubmit={(e) => onSubmit(e)}>
          <Form.Group>
            <Form.Label>Customer</Form.Label>
            <Form.Control
              as="select"
              name="customer_id"
              value={customer_id}
              onChange={(e) => onChange(e)}
            >
              <option value="" disabled>
                Choose...
              </option>
              <CustomerOptions id={coptID} />
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              placeholder={new Date().toISOString().slice(0, 10)}
              value={date}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              name="amount"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Button variant="primary" size="lg" type="submit">
            Submit
          </Button>
          <Button
            variant="outline-primary"
            size="lg"
            href="/payments"
            style={{ float: "right", marginRight: "20px" }}
          >
            Cancel
          </Button>
        </Form>
      </div>
    </div>
  );
};

Payment.propTypes = {
  getPayments: PropTypes.func.isRequired,
  addPayment: PropTypes.func.isRequired,
  editPayment: PropTypes.func.isRequired,
  deletePayment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  payments: state.payment.payments,
});

export default connect(mapStateToProps, {
  getPayments,
  addPayment,
  editPayment,
  deletePayment,
})(Payment);
