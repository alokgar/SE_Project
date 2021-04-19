import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getSuppliers,
  addSupplier,
  editSupplier,
} from "../../../actions/supplier";
import Table from "react-bootstrap/Table";
import Edit_supplier from "./Edit_supplier";
import Form from "react-bootstrap/Form";
import { Button, Row, Col } from "react-bootstrap";
import Sidebar1 from "../sidebar/sidebar";
import Alert from "../../layout/Alert";
const Supplier = ({ getSuppliers, addSupplier, editSupplier, suppliers }) => {
  const [showTable, setTable] = useState(true);

  useEffect(() => {
    getSuppliers();
  }, [getSuppliers]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_no: "",
    line1: "",
    landmark: "",
    pincode: "",
    city_name: "",
  });

  const {
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
    console.log(name);
    addSupplier({
      name,
      email,
      mobile_no,
      line1,
      landmark,
      pincode,
      city_name,
    });
    setFormData({
      name: "",
      email: "",
      mobile_no: "",
      line1: "",
      landmark: "",
      pincode: "",
      city_name: "",
    });
    setTable(!showTable);
  };

  return suppliers === null ? (
    <div></div>
  ) : showTable === true ? (
    <div className="row" style={{ height: "100%" }}>
      <Sidebar1 link="/suppliers" />
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
          Suppliers
        </p>
        <div className="tableDiv">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile No.</th>
                <th>Email</th>
                <th>City</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.length !== 0 ? (
                suppliers.map(function (supplier) {
                  return <Edit_supplier supplier={supplier} />;
                })
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No Entry Found !{" "}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <br></br>
        <Button onClick={() => setTable(false)}>Add Supplier</Button>
      </div>
    </div>
  ) : (
    <div className="row" style={{ height: "100%" }}>
      <Sidebar1 link="/suppliers" />
      <div className="col-md-10 mainContainer ScrollDiv">
        <br />
        <h2>Add Supplier</h2>
        <br />

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
      </div>
    </div>
  );
};

Supplier.propTypes = {
  getSuppliers: PropTypes.func.isRequired,
  addSupplier: PropTypes.func.isRequired,
  editSupplier: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  suppliers: state.supplier.suppliers,
});

export default connect(mapStateToProps, {
  getSuppliers,
  addSupplier,
  editSupplier,
})(Supplier);
