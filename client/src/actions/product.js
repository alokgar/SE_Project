import axios from "axios";
import { setAlert } from "./alert";
import { Link, Redirect } from "react-router-dom";
import dateFormat from "dateformat";

import {
  GET_PRODUCTS,
  PRODUCTS_SUCCESS,
  PRODUCTS_ERROR,
  FILTER_PRODUCT,
  CLEAR_FILTER,
} from "./types";

// Get all products data
export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/products");

    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add products

export const addProduct = ({ name, description, category_name }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, description, category_name });

  try {
    const res = await axios.post("/api/products", body, config);

    const res1 = await axios.get("/api/products");
    dispatch({
      type: GET_PRODUCTS,
      payload: res1.data,
    });
    dispatch(setAlert("Product added successfully", "danger"));
  } catch (err) {
    dispatch({
      type: PRODUCTS_ERROR,
    });
  }
};

//EDIT Product
//change status
export const editProduct = ({ id, name, description, category_name }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, description, category_name });

  try {
    console.log(id);

    const res = await axios.put(`/api/products/${id}`, body, config);
    const res1 = await axios.get("/api/products");
    dispatch({
      type: GET_PRODUCTS,

      payload: res1.data,
    });
    dispatch(setAlert("Product updated successfully", "danger"));
  } catch (err) {
    dispatch({
      type: PRODUCTS_ERROR,
    });
  }
};

//delete Product

export const deleteProduct = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.delete(`/api/products/${id}`, config);
    const res1 = await axios.get("/api/products");
    dispatch({
      type: GET_PRODUCTS,

      payload: res1.data,
    });
    dispatch(setAlert("Product deleted successfully", "danger"));
  } catch (err) {
    dispatch({
      type: PRODUCTS_ERROR,
    });
  }
};

// filter all Products in given date-range
export const filterProduct = ({ from, to }) => async (dispatch) => {
  try {
    const res = await axios.get("/api/products");
    const products = res.data;
    var filtered = [];

    products.map(function (product) {
      var curr_date = dateFormat(product.date, "yyyy-mm-dd");
      var product_date = new Date(curr_date).getTime();

      var date = new Date(from);
      var mnth = ("0" + (date.getMonth() + 1)).slice(-2);
      var day = ("0" + date.getDate()).slice(-2);
      var fr = [date.getFullYear(), mnth, day].join("-");

      date = new Date(to);
      mnth = ("0" + (date.getMonth() + 1)).slice(-2);
      day = ("0" + date.getDate()).slice(-2);
      var tr = [date.getFullYear(), mnth, day].join("-");

      var f = new Date(fr).getTime();
      var t = new Date(tr).getTime();
      // console.log("product");
      // console.log(product_date);
      // console.log("from");
      // console.log(f);
      // console.log("to");
      // console.log(t);

      if (product_date >= f && product_date <= t) {
        filtered.push(product);
      }
    });

    dispatch({
      type: GET_PRODUCTS,
      payload: filtered,
    });
  } catch (err) {
    dispatch({
      type: PRODUCTS_ERROR,
    });
  }
};

// clears the filtered_products
export const clearFilterProduct = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_FILTER,
    });
  } catch (err) {
    dispatch({
      type: PRODUCTS_ERROR,
    });
  }
};
