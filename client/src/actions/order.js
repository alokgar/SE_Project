import axios from "axios";
import { setAlert } from "./alert";

import { GET_ORDERS, ORDER_ERROR } from "./types";

// Get all orders data
export const getOrders = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/order");
    console.log(res.data);
    dispatch({
      type: GET_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
    });
  }
};
//confirm order
export const confirmOrder = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(`/api/order/${id}/confirm`, config);

    dispatch({
      type: GET_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
    });
  }
};
//dispatch order
export const dispatchOrder = (id, details) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const body = JSON.stringify({ details });
    console.log(details);
    const res = await axios.post(`/api/order/${id}/dispatch`, body, config);

    dispatch({
      type: GET_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
    });
  }
};

//Add order

export const addOrders = ({ customer_id, employee_id, details }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ customer_id, employee_id, details });

  try {
    const res = await axios.post("/api/order", body, config);
    console.log(res.data);
    dispatch({
      type: GET_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
    });
  }
};
