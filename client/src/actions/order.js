import axios from "axios";
import { setAlert } from "./alert";

import { GET_ORDERS, ORDER_ERROR } from "./types";

// Get all orders data
export const getOrders = (userType) => async (dispatch) => {
  try {
    const res =
      userType === 1
        ? await axios.get("/api/order/emp")
        : await axios.get("/api/order");

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
    const res1 = await axios.post(`/api/order/${id}/confirm`, config);
    const res = await axios.get("/api/order");

    dispatch({
      type: GET_ORDERS,
      payload: res.data,
    });
    dispatch(setAlert("Order Confirmed !", "success"));
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
    });
  }
};
//dispatch order
export const dispatchOrder = (id, num, details) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const body = JSON.stringify({ details, dispatch_num: num });

    const res1 = await axios.post(`/api/order/${id}/dispatch`, body, config);
    console.log(res1.data);
    const res = await axios.get("/api/order");
    dispatch({
      type: GET_ORDERS,
      payload: res.data,
    });
    dispatch(
      setAlert(`Order Dispatched with dispatch num: ${num} !`, "danger")
    );
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
    });
  }
};

//Add order

export const addOrders = (
  { customer_id, employee_id, details },
  userType
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ customer_id, employee_id, details });

  try {
    const res1 = await axios.post("/api/order", body, config);
    const res =
      userType === 1
        ? await axios.get("/api/order/emp")
        : await axios.get("/api/order");
    dispatch({
      type: GET_ORDERS,
      payload: res.data,
    });
    dispatch(setAlert(`Order placed successfully`, "success"));
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
    });
  }
};

// Delete order
export const deleteOrder = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res1 = await axios.delete(`/api/order/${id}`, config);
    const res = await axios.get("/api/order");

    dispatch({
      type: GET_ORDERS,
      payload: res.data,
    });
    dispatch(setAlert("Order Deleted!", "Danger"));
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
    });
  }
};
