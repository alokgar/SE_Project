import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateProfile } from "../../../actions/profile";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { Button, Row, Col } from "react-bootstrap";
import { setAlert } from "../../actions/alert";
import Sidebar1 from "../sidebar/sidebar";

const UpdateProfile = ({ setAlert, user, updateProfile }) => {
  useEffect(() => {}, []);

  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    mobile_no: user.mobile_no,
    email: user.email,
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    updateProfile({ first_name, last_name, mobile_no, type, email });
  };

  return (
    <div className="row" style={{ height: "100%" }}>
      <Sidebar1 link="/orders" />
      <div className="col-md-10 mainContainer ScrollDiv">
        <h2>Update Profile</h2>
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
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              name="mobile_no"
              type="text"
              placeholder="10 digits Mobile No."
              value={mobile_no}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          {/* <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              name="line1"
              placeholder="Address"
              value={line1}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
            <Form.Label>Landmark</Form.Label>
            <Form.Control
              name="landmark"
              placeholder="Landmark"
              value={landmark}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                name="name"
                value={name}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                name="pincode"
                value={pincode}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
          </Form.Row> */}

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
        <br />
      </div>
    </div>
  );
};

UpdateProfile.propTypes = {
  updateProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  setAlert,
})(UpdateProfile);
