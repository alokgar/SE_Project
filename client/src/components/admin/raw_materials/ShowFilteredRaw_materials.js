import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  addRaw_material,
  clearFilter_raw_material,
} from "../../../actions/raw_material";
import Table from "react-bootstrap/Table";
import { Button, Row, Col } from "react-bootstrap";
import SupplierOptions from "../suppliers/supplierOptions";
import Edit_raw_material from "./Edit_raw_material";

const ShowFilteredRaw_materials = ({
  addRaw_material,
  clearFilter_raw_material,
  filtered_raw_materials,
}) => {
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
  };

  return filtered_raw_materials === null ? (
    <div></div>
  ) : (
    <Fragment>
      All the filtered raw-materials are shown here
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {filtered_raw_materials.map(function (raw_material) {
            return (
              <div>
                <Edit_raw_material raw_material={raw_material} />
              </div>
            );
          })}
        </tbody>
      </Table>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="unit"
            name="unit"
            value={unit}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="form-group">
          <select
            name="supplier_name"
            value={supplier_name}
            onChange={(e) => onChange(e)}
          >
            <option value="" disabled>
              Choose a supplier
            </option>
            <SupplierOptions />
          </select>
        </div>
        <input
          type="submit"
          className="btn btn-primary"
          value="Add Raw_material"
        />
        <Button
          variant="outline-primary"
          size="lg"
          href="/raw_materials"
          style={{ float: "right", marginRight: "20px" }}
          onClick={() => clearFilter_raw_material()}
        >
          Back
        </Button>
      </form>
    </Fragment>
  );
};

ShowFilteredRaw_materials.propTypes = {
  addRaw_material: PropTypes.func.isRequired,
  clearFilter_raw_material: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filtered_raw_materials: state.raw_material.filtered_raw_materials,
});

export default connect(mapStateToProps, {
  addRaw_material,
  clearFilter_raw_material,
})(ShowFilteredRaw_materials);
