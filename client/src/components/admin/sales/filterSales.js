import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { filterProduct, getProducts } from "../../../actions/product";
import Form from "react-bootstrap/Form";
import { Button, Row, Col } from "react-bootstrap";

const FilterProducts = ({ filterProduct, getProducts }) => {
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
    filterProduct({ from, to });
    // setFormData({
    //     from: new Date(),
    //     to: new Date()
    // });
    setFlag(true);
  };

  // if (flag) {
  //     return <Redirect to='/show_filtered_products' />
  // }
  const onreset = () => {
    getProducts();
    setFormData({
      from: new Date(),
      to: new Date(),
    });
  };

  return (
    <Form style={{ float: "right" }}>
      <label for="from">From : </label>
      <input id="from" type="text"></input>
      <span>{"  "} </span>
      <label for="to">To : </label>
      <input id="ro" type="text"></input>

      <Button type="submit" style={{ padding: "5px 8px 5px 8px" }}>
        Search
      </Button>
      <Button
        variant="outline-primary"
        onClick={() => onreset()}
        style={{ padding: "5px 8px 5px 8px" }}
      >
        Reset
      </Button>
    </Form>
  );
};

FilterProducts.propTypes = {
  filterProduct: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
};

export default connect(null, { filterProduct, getProducts })(FilterProducts);
