import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getStocks, addStock, editStock } from "../../../actions/stock";
import Table from "react-bootstrap/Table";
import ProductOptions from "../products/productOptions";
import SizeOptions from "../sizes/sizeOptions";
import Edit_stock from "./Edit_stock";
import Form from "react-bootstrap/Form";
import { Button, Row, Col } from "react-bootstrap";
import Sidebar1 from "../sidebar/sidebar";

const Stock = ({ getStocks, addStock, editStock, stocks }) => {
  const [showTable, setTable] = useState(true);

  useEffect(() => {
    getStocks();
  }, [getStocks]);

  const [formData, setFormData] = useState({
    price: "",
    quantity: "",
    product_name: "",
    size_packing_type: "",
  });

  const { price, quantity, product_name, size_packing_type } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    addStock({ price, quantity, product_name, size_packing_type });
    setFormData({
      price: "",
      quantity: "",
      product_name: "",
      size_packing_type: "",
    });
    setTable(!showTable);
  };

  return stocks === null ? (
    <div></div>
  ) : showTable === true ? (
    <div className="row" style={{ height: "100%" }}>
      <Sidebar1 link="/stocks" />
      <div className="col-md-10 mainContainer">
        <div className="tableDiv">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Packing</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Last Update</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map(function (stock, idx) {
                return <Edit_stock stock={stock} idx={idx} />;
              })}
            </tbody>
          </Table>
        </div>
        <br />
      </div>
    </div>
  ) : null;
};

Stock.propTypes = {
  getStocks: PropTypes.func.isRequired,
  addStock: PropTypes.func.isRequired,
  editStock: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stocks: state.stock.stocks,
});

export default connect(mapStateToProps, { getStocks, addStock, editStock })(
  Stock
);
