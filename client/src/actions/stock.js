import axios from "axios";
import { setAlert } from "./alert";
import { GET_STOCKS, STOCKS_ERROR, ADD_STOCK } from "./types";

// Get all stock data
export const getStocks = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/stock");
    dispatch({
      type: GET_STOCKS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: STOCKS_ERROR,
    });
  }
};

// Add New Supplier
export const addStock = (stock) => async (dispatch) => {
  try {
    const res = await fetch("/api/stock", {
      method: "POST",
      body: JSON.stringify(stock),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await axios.get("/api/stock");

    dispatch({
      type: ADD_STOCK,
      payload: result.data,
    });
    dispatch(setAlert("New stock added", "danger"));
  } catch (err) {
    dispatch({
      type: STOCKS_ERROR,
    });
  }
};

//EDIT Supplier

export const editStock = (stock) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(stock);
  try {
    const res = await axios.put(`/api/stock/${stock.id}`, body, config);
    const result = await axios.get("/api/stock");
    dispatch({
      type: GET_STOCKS,
      payload: result.data,
    });
    dispatch(setAlert("Stocks edited succesfully", "danger"));
  } catch (err) {
    dispatch({
      type: STOCKS_ERROR,
    });
  }
};

//delete Supplier

export const deleteStock = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.delete(`/api/stock/${id}`, config);
    const result = await axios.get("/api/stock");
    dispatch({
      type: GET_STOCKS,
      payload: result.data,
    });
    dispatch(setAlert("Stocks deleted succesfully", "danger"));
  } catch (err) {
    dispatch({
      type: STOCKS_ERROR,
    });
  }
};
