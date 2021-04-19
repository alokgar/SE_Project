import axios from "axios";
import { setAlert } from "./alert";

import { GET_PAYMENTS, PAYMENTS_ERROR, PAYMENTS_SUCCESS } from "./types";

// Get all payments data
export const getPayments = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/payment");

    dispatch({
      type: GET_PAYMENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PAYMENTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all payments by employee id
export const getEmpPayments = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/payment/emp");
    dispatch({
      type: GET_PAYMENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PAYMENTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Payment

export const addPayment = ({ amount, date, customer_id }, userType) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ amount, date, customer_id });

  try {
    console.log(body);
    const res = await axios.post("/api/payment", body, config);
    const res1 =
      userType === 1
        ? await axios.get("/api/payment/emp")
        : await axios.get("/api/payment");
    dispatch({
      type: PAYMENTS_SUCCESS,
      payload: res1.data,
    });

    dispatch(setAlert("Payment added", "danger"));
  } catch (err) {
    dispatch({
      type: PAYMENTS_ERROR,
    });
  }
};

//EDIT Payment
//change status
export const editPayment = (
  { id, amount, date, customer_id },
  userType
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ amount, date, customer_id });

  try {
    console.log(body);

    const res = await axios.put(`/api/payment/${id}`, body, config);
    const res1 =
      userType === 1
        ? await axios.get("/api/payment/emp")
        : await axios.get("/api/payment");
    dispatch({
      type: GET_PAYMENTS,

      payload: res1.data,
    });
    dispatch(setAlert("Payment edited successfully", "danger"));
  } catch (err) {
    dispatch({
      type: PAYMENTS_ERROR,
    });
  }
};

//delete Payment

export const deletePayment = (id, userType) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.delete(`/api/payment/${id}`, config);
    const res1 =
      userType === 1
        ? await axios.get("/api/payment/emp")
        : await axios.get("/api/payment");
    dispatch({
      type: GET_PAYMENTS,

      payload: res1.data,
    });
    dispatch(setAlert("Payment deleted successfully", "danger"));
  } catch (err) {
    dispatch({
      type: PAYMENTS_ERROR,
    });
  }
};
