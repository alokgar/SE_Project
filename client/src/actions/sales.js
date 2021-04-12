import axios from "axios";
import { setAlert } from "./alert";

import { GET_SALES, SALES_ERROR } from "./types";

// Get all SALES data
export const getSales = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/sales");
    dispatch({
      type: GET_SALES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SALES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
