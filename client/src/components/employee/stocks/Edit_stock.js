import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteStock, getStocks, editStock } from "../../../actions/stock";
import { Button, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import ProductOptions from "../products/productOptions";
import SizeOptions from "../sizes/sizeOptions";
import Form from "react-bootstrap/Form";

const Edit_stock = ({
  stock,
  getStocks,
  deleteStock,
  editStock,
  stocks,
  idx,
}) => {
  // useEffect(() => {
  //     getStocks();
  // }, [getStocks]);

  const [formData, setFormData] = useState({
    id: stock._id,
    price: stock.price,
    quantity: stock.quantity,
    product_name: stock.product_id.name,
    size_packing_type: stock.size_id.packing_type,
  });

  const [isEdit, setIsEdit] = useState(false);
  const { id, price, quantity, product_name, size_packing_type } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    editStock({ id, price, quantity, product_name, size_packing_type });

    setFormData({
      id: stock._id,
      price: stock.price,
      quantity: stock.quantity,
      product_name: stock.product_id.name,
      size_packing_type: stock.size_id.packing_type,
    });
    setIsEdit(!isEdit);
  };

  return (
    <Fragment>
      <tr>
        <td>{idx + 1}</td>
        <td>{stock.product_id.name}</td>
        <td>{stock.size_id.packing_type + " " + stock.size_id.unit}</td>
        <td>{stock.quantity}</td>
        <td>{"Rs." + stock.price}</td>
        <td>{stock.last_update.slice(0, 10)}</td>
      </tr>
    </Fragment>
  );
};

Edit_stock.propTypes = {
  getStocks: PropTypes.func.isRequired,
  deleteStock: PropTypes.func.isRequired,
  editStock: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stocks: state.stock.stocks,
});

export default connect(mapStateToProps, { getStocks, deleteStock, editStock })(
  Edit_stock
);
