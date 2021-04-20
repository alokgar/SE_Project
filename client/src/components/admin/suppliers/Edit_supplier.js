import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getSuppliers,
  deleteSupplier,
  editSupplier,
} from "../../../actions/supplier";
import { Button, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

const Edit_supplier = ({
  supplier,
  getSuppliers,
  editSupplier,
  deleteSupplier,
  suppliers,
}) => {
  useEffect(() => {
    getSuppliers();
  }, [getSuppliers]);

  const [formData, setFormData] = useState({
    id: supplier._id,
    name: supplier.name,
    email: supplier.email,
    mobile_no: supplier.mobile_no,
    line1: supplier.address.line1,
    landmark: supplier.address.landmark,
    pincode: supplier.address.pincode,
    city_name: supplier.address.city.name,
  });

  const [isEdit, setIsEdit] = useState(false);
  const {
    id,
    name,
    email,
    mobile_no,
    line1,
    landmark,
    pincode,
    city_name,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    editSupplier({
      id,
      name,
      email,
      mobile_no,
      line1,
      landmark,
      pincode,
      city_name,
    });

    setFormData({
      id: supplier._id,
      name: supplier.name,
      email: supplier.email,
      mobile_no: supplier.mobile_no,
      line1: supplier.address.line1,
      landmark: supplier.address.landmark,
      pincode: supplier.address.pincode,
      city_name: supplier.address.city.name,
    });
    setIsEdit(!isEdit);
  };

  return isEdit === true ? (
    <Fragment>
      <tr>
        <td>{supplier.name}</td>
        <td>{supplier.mobile_no}</td>
        <td>{supplier.email}</td>
        <td>{supplier.address.city.name}</td>
        <td>
          <Button
            variant="success"
            onClick={() => {
              setIsEdit(!isEdit);
            }}
          >
            Edit
          </Button>

          <Button
            variant="danger"
            onClick={() => {
              deleteSupplier(id);
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
      <tr>
        <td colSpan="5">
          <Form onSubmit={(e) => onSubmit(e)} style={{ width: "60%" }}>
            <Form.Group>
              <Form.Label>Supplier Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="name"
                name="name"
                value={name}
                onChange={(e) => onChange(e)}
                required
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="email"
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  required
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Mobile No.</Form.Label>
                <Form.Control
                  required
                  type="text"
                  pattern="[1-9]{1}[0-9]{9}"
                  title="Provide 10 digit mobile number"
                  placeholder="mobile_no"
                  name="mobile_no"
                  value={mobile_no}
                  onChange={(e) => onChange(e)}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="line1"
                name="line1"
                value={line1}
                onChange={(e) => onChange(e)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Landmark</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="landmark"
                name="landmark"
                value={landmark}
                onChange={(e) => onChange(e)}
                required
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  required
                  type="text"
                  pattern="[0-9]{6}"
                  title="Provide 6 digit Pincode"
                  placeholder="pincode"
                  name="pincode"
                  value={pincode}
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>City</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="city_name"
                  name="city_name"
                  value={city_name}
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>
            </Form.Row>

            <Button type="submit">Add Supplier</Button>
            <Button
              variant="outline-primary"
              size="lg"
              href="/suppliers"
              style={{ float: "right", marginRight: "20px" }}
            >
              Cancel
            </Button>
          </Form>
        </td>
      </tr>
    </Fragment>
  ) : (
    <Fragment>
      <tr>
        <td>{supplier.name}</td>
        <td>{supplier.mobile_no}</td>
        <td>{supplier.email}</td>
        <td>{supplier.address.city.name}</td>
        <td>
          <Button
            variant="success"
            onClick={() => {
              setIsEdit(!isEdit);
            }}
          >
            Edit
          </Button>

          <Button
            variant="danger"
            onClick={() => {
              deleteSupplier(id);
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
    </Fragment>
  );
};

Edit_supplier.propTypes = {
  getSuppliers: PropTypes.func.isRequired,
  addSupplier: PropTypes.func.isRequired,
  editSupplier: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  suppliers: state.supplier.suppliers,
});

export default connect(mapStateToProps, {
  getSuppliers,
  deleteSupplier,
  editSupplier,
})(Edit_supplier);
