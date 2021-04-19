import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getCustomers,
  addCustomer,
  editCustomer,
  deleteCustomer,
} from "../../../actions/customer";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { Button, Row, Col } from "react-bootstrap";
import Sidebar1 from "../sidebar/sidebar";
import Alert from "../../layout/Alert";

const Customer = ({
  getCustomers,
  addCustomer,
  editCustomer,
  deleteCustomer,
  customers,
}) => {
  const [showTable, setTable] = useState(true);
  const [showEdit, setEdit] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    mobile_no: "",
    line1: "",
    landmark: "",
    name: "",
    pincode: "",
  });

  const {
    id,
    first_name,
    last_name,
    mobile_no,
    line1,
    landmark,
    name,
    pincode,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (showEdit === false)
      addCustomer({
        first_name,
        last_name,
        mobile_no,
        line1,
        landmark,
        name,
        pincode,
      });
    else {
      editCustomer({
        id,
        first_name,
        last_name,
        mobile_no,
        line1,
        landmark,
        name,
        pincode,
      });
      setEdit(!showEdit);
    }

    setFormData({
      id: "",
      first_name: "",

      last_name: "",

      mobile_no: "",

      line1: "",

      landmark: "",
      name: "",
      pincode: "",
    });
    setTable(!showTable);
  };

  const onEditclick = (cust) => {
    setTable(false);
    setEdit(true);
    setFormData({
      id: cust._id,
      first_name: cust.first_name,

      last_name: cust.last_name,

      mobile_no: cust.mobile_no,

      line1: cust.address.line1,

      landmark: cust.address.landmark,
      name: cust.address.city.name,
      pincode: cust.address.pincode,
    });
  };

  return customers === null ? (
    <div></div>
  ) : showTable === true ? (
    <div>
      <div className="row" style={{ height: "100%" }}>
        <Sidebar1 link="/customers" />
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
            Customers
          </p>
          <div className="tableDiv">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>City</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.length !== 0 ? (
                  customers.map(function (customer) {
                    return (
                      <tr>
                        <td>
                          <a
                            href={`/customer/${customer._id}`}
                            style={{ color: "black" }}
                          >
                            {customer.first_name + " " + customer.last_name}
                          </a>
                        </td>
                        <td>{customer.mobile_no}</td>
                        <td>{customer.address.city.name}</td>
                        <td>
                          <Button
                            variant="success"
                            onClick={() => onEditclick(customer)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => deleteCustomer(customer._id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
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
          <br />
          <Button onClick={() => setTable(false)}>Add Customer</Button>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="row" style={{ height: "100%" }}>
        <Sidebar1 link="/customers" />
        <div className="col-md-10 mainContainer ScrollDiv">
          <h2>Add Customer</h2>
          <br />
          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name="first_name"
                  type="text"
                  placeholder="First Name"
                  value={first_name}
                  onChange={(e) => onChange(e)}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name="last_name"
                  type="text"
                  placeholder="Last Name"
                  value={last_name}
                  onChange={(e) => onChange(e)}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress1">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                name="mobile_no"
                type="text"
                pattern="[1-9]{1}[0-9]{9}"
                title="Provide 10 digit mobile number"
                placeholder="10 digits Mobile No."
                value={mobile_no}
                onChange={(e) => onChange(e)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="line1"
                placeholder="Address"
                value={line1}
                onChange={(e) => onChange(e)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
              <Form.Label>Landmark</Form.Label>
              <Form.Control
                name="landmark"
                placeholder="Landmark"
                value={landmark}
                onChange={(e) => onChange(e)}
                required
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  name="name"
                  value={name}
                  onChange={(e) => onChange(e)}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  type="text"
                  name="pincode"
                  pattern="[0-9]{6}"
                  title="Provide 6 digit Pincode"
                  value={pincode}
                  onChange={(e) => onChange(e)}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Button variant="primary" size="lg" type="submit">
              Submit
            </Button>
            <Button
              variant="outline-primary"
              size="lg"
              href="/customers"
              style={{ float: "right", marginRight: "20px" }}
            >
              Cancel
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

Customer.propTypes = {
  getCustomers: PropTypes.func.isRequired,
  addCustomer: PropTypes.func.isRequired,
  editCustomer: PropTypes.func.isRequired,
  deleteCustomer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  customers: state.customer.customers,
});

export default connect(mapStateToProps, {
  getCustomers,
  addCustomer,
  editCustomer,
  deleteCustomer,
})(Customer);
