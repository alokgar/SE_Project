import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getRaw_materials,
  addRaw_material,
  editRaw_material,
} from "../../../actions/raw_material";
import Table from "react-bootstrap/Table";
import SupplierOptions from "../suppliers/supplierOptions";
import Edit_raw_material from "./Edit_raw_material";
import { Button, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FilterRaw_materials from "./filterRaw_materials";
import Sidebar1 from "../sidebar/sidebar";
import Alert from "../../layout/Alert";

const Raw_material = ({
  getRaw_materials,
  addRaw_material,
  editRaw_material,
  raw_materials,
}) => {
  const [showTable, setTable] = useState(true);
  useEffect(() => {
    getRaw_materials();
  }, [getRaw_materials]);

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    unit: "",
    supplier_name: "",
  });

  const { name, quantity, unit, supplier_name } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(name);
    addRaw_material({ name, quantity, unit, supplier_name });
    setFormData({
      name: "",
      quantity: "",
      unit: "",
      supplier_name: "",
    });
    setTable(!showTable);
  };
  const filterconnect = () => {
    setTable(true);
  };

  return raw_materials === null ? (
    <div></div>
  ) : showTable === true ? (
    <div className="row" style={{ height: "100%" }}>
      <Sidebar1 link="/raw_materials" />
      <div className="col-md-8 mainContainer">
        <p
          style={{
            borderBottom: "1px solid black ",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#17a2b8",
          }}
        >
          <Alert />
          Raw Materials
        </p>
        <div className="tableDiv">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Recieving Date</th>
                <th>Supplier</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {raw_materials.length !== 0 ? (
                raw_materials.map(function (raw_material) {
                  return <Edit_raw_material raw_material={raw_material} />;
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
        <Button type="submit" onClick={() => setTable(!showTable)}>
          Add RawMaterial
        </Button>
      </div>
      <FilterRaw_materials />
    </div>
  ) : (
    <div className="row" style={{ height: "100%" }}>
      <Sidebar1 link="/raw_materials" />
      <div className="col-md-10 mainContainer ScrollDiv">
        <br />
        <h2>Add Raw Material</h2>
        <br />
        <Form onSubmit={(e) => onSubmit(e)} style={{ width: "60%" }}>
          <Form.Group>
            <Form.Label>Raw Material Name</Form.Label>
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

          <Form.Group>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              required
              type="text"
              pattern="^0*[1-9]\d*"
              title="Provide greater than 0"
              placeholder="quantity"
              name="quantity"
              value={quantity}
              onChange={(e) => onChange(e)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Unit</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="unit"
              name="unit"
              value={unit}
              onChange={(e) => onChange(e)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Supplier Name</Form.Label>
            <Form.Control
              as="select"
              name="supplier_name"
              value={supplier_name}
              onChange={(e) => onChange(e)}
              required
            >
              <option value="" disabled>
                Choose...
              </option>
              <SupplierOptions />
            </Form.Control>
          </Form.Group>

          <Button type="submit">Add Raw Material</Button>
          <Button
            variant="outline-primary"
            size="lg"
            href="/raw_materials"
            style={{ float: "right", marginRight: "20px" }}
          >
            Cancel
          </Button>
        </Form>
      </div>
    </div>
  );
};

Raw_material.propTypes = {
  getRaw_materials: PropTypes.func.isRequired,
  addRaw_material: PropTypes.func.isRequired,
  editRaw_material: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  raw_materials: state.raw_material.raw_materials,
});

export default connect(mapStateToProps, {
  getRaw_materials,
  addRaw_material,
  editRaw_material,
})(Raw_material);
