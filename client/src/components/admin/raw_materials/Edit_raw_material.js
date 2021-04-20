import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getRaw_materials,
  deleteRaw_material,
  editRaw_material,
} from "../../../actions/raw_material";
import { Button, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import SupplierOptions from "../suppliers/supplierOptions";
import Form from "react-bootstrap/Form";

const Edit_raw_material = ({
  raw_material,
  getRaw_materials,
  editRaw_material,
  deleteRaw_material,
  raw_materials,
}) => {
  // useEffect(() => {

  //     getRaw_materials();

  // }, [getRaw_materials]);

  const [formData, setFormData] = useState({
    id: raw_material._id,
    name: raw_material.name,
    quantity: raw_material.quantity,
    unit: raw_material.unit,
    supplier_name: raw_material.supplier_id.name,
  });

  const [isEdit, setIsEdit] = useState(false);
  const { id, name, quantity, unit, supplier_name } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    editRaw_material({ id, name, quantity, unit, supplier_name });

    setFormData({
      id: raw_material._id,
      name: raw_material.name,
      quantity: raw_material.quantity,
      unit: raw_material.unit,
      supplier_name: raw_material.supplier_id.name,
    });
    setIsEdit(!isEdit);
  };

  return isEdit === true ? (
    <Fragment>
      <tr>
        <td>{raw_material.name}</td>
        <td>{raw_material.quantity + " " + raw_material.unit}</td>
        <td>{raw_material.date_of_receiving.toString().slice(0, 10)}</td>
        <td>{raw_material.supplier_id.name}</td>
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
              deleteRaw_material(id);
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
            <Button type="submit">Edit Raw Material</Button>
          </Form>
        </td>
      </tr>
    </Fragment>
  ) : (
    <Fragment>
      <tr>
        <td>{raw_material.name}</td>
        <td>{raw_material.quantity + " " + raw_material.unit}</td>
        <td>{raw_material.date_of_receiving.toString().slice(0, 10)}</td>
        <td>{raw_material.supplier_id.name}</td>
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
              deleteRaw_material(id);
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
    </Fragment>
  );
};

Edit_raw_material.propTypes = {
  getRaw_materials: PropTypes.func.isRequired,
  deleteRaw_material: PropTypes.func.isRequired,
  editRaw_material: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  raw_materials: state.raw_material.raw_materials,
});

export default connect(mapStateToProps, {
  getRaw_materials,
  deleteRaw_material,
  editRaw_material,
})(Edit_raw_material);
