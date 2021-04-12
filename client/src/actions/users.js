import axios from "axios";
import { setAlert } from "./alert";

import { GET_USER, USERS_ERROR } from "./types";

// Get all users data
export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/users/emp");

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
