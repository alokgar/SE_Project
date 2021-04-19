import axios from "axios";
import { setAlert } from "./alert";

import { GET_SUPPLIERS, SUPPLIERS_ERROR, ADD_SUPPLIER } from "./types";

// Get all suppliers data
export const getSuppliers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/supplier");
    dispatch({
      type: GET_SUPPLIERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SUPPLIERS_ERROR,
    });
  }
};

// Add New Supplier
export const addSupplier = (supplier) => async (dispatch) => {
  try {
    const res = await fetch("/api/supplier", {
      method: "POST",
      body: JSON.stringify(supplier),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await axios.get("/api/supplier");

    dispatch({
      type: ADD_SUPPLIER,
      payload: result.data,
    });
    dispatch(setAlert("New supplier added", "danger"));
  } catch (err) {
    dispatch({
      type: SUPPLIERS_ERROR,
    });
  }
};

//EDIT Supplier

export const editSupplier = (supplier) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(supplier);
  try {
    const res = await axios.put(`/api/supplier/${supplier.id}`, body, config);
    const result = await axios.get("/api/supplier");
    dispatch({
      type: GET_SUPPLIERS,
      payload: result.data,
    });
    dispatch(setAlert("supplier edited successfully", "danger"));
  } catch (err) {
    dispatch({
      type: SUPPLIERS_ERROR,
    });
  }
};

//delete Supplier

export const deleteSupplier = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.delete(`/api/supplier/${id}`, config);
    const result = await axios.get("/api/supplier");
    dispatch({
      type: GET_SUPPLIERS,
      payload: result.data,
    });
    dispatch(setAlert("supplier deleted successfully", "danger"));
  } catch (err) {
    dispatch({
      type: SUPPLIERS_ERROR,
    });
  }
};
