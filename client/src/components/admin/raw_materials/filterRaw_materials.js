import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import {
  filterRaw_material,
  getRaw_materials,
} from "../../../actions/raw_material";
import Form from "react-bootstrap/Form";
import { Button, Row, Col } from "react-bootstrap";

const FilterRaw_materials = ({ filterRaw_material, getRaw_materials }) => {
  const [formData, setFormData] = useState({
    from: new Date(),
    to: new Date(),
  });

  const [flag, setFlag] = useState(false);

  const { from, to } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    filterRaw_material({ from, to });
    // setFormData({
    //     from: new Date(),
    //     to: new Date()
    // });
    setFlag(true);
    // table();
  };

  const onreset = () => {
    getRaw_materials();
    setFormData({
      from: new Date(),
      to: new Date(),
    });
  };
  // if(flag){
  //     return <Redirect to='/show_filtered_raw_materials' />
  // }

  return (
    <Form
      onSubmit={(e) => onSubmit(e)}
      className="col-md-2"
      style={{ left: "-30px", paddingTop: "20px" }}
    >
      <Form.Group>
        <Form.Label>Raw Material Name</Form.Label>
        <Form.Control
          required
          type="date"
          placeholder="from"
          name="from"
          value={from}
          onChange={(e) => onChange(e)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Raw Material Name</Form.Label>
        <Form.Control
          required
          type="date"
          placeholder="to"
          name="to"
          value={to}
          onChange={(e) => onChange(e)}
        />
      </Form.Group>

      <Button type="submit">Search</Button>
      <Button variant="outline-primary" onClick={() => onreset()}>
        Reset
      </Button>
    </Form>
  );
};

FilterRaw_materials.propTypes = {
  filterRaw_material: PropTypes.func.isRequired,
  getRaw_materials: PropTypes.func.isRequired,
};

export default connect(null, { filterRaw_material, getRaw_materials })(
  FilterRaw_materials
);
