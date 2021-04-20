import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { filterProduct, getProducts } from "../../../actions/product";
import { getProduction_details } from "../../../actions/production_detail";

import Form from "react-bootstrap/Form";
import { Button, Row, Col } from "react-bootstrap";

const FilterProductionDetails = ({ getProduction_details }) => {
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
    console.log("onSubmit Clicked");
    getProduction_details({ from, to });
    setFlag(true);
  };

  const onreset = () => {
    getProduction_details({ from: 0, to: 0 });
    setFormData({
      from: new Date(),
      to: new Date(),
    });
  };

  return (
    <Form
      onSubmit={(e) => onSubmit(e)}
      className="col-md-2"
      style={{ left: "-30px", paddingTop: "20px" }}
    >
      <Form.Group>
        <Form.Label>From</Form.Label>
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
        <Form.Label>To</Form.Label>
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

FilterProductionDetails.propTypes = {
  getProduction_details: PropTypes.func.isRequired,
};

export default connect(null, { getProduction_details })(
  FilterProductionDetails
);
