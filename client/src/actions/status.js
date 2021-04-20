import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_USERS,
  UPDATE_STATUS,
  CLEAR_USERS,
  PROFILE_ERROR,
  CHANGE_STATUS,
} from "./types";

// Get all profiles
export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/users");

    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//change status
export const changeStatus = (Userid) => async (dispatch) => {
  try {
    // console.log(Userid)

    if (Userid.i === 0) {
      const res = await axios.get(`/api/users/${Userid.id}`);

      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
      dispatch(setAlert("Employee Approved", "success"));
    } else {
      const res = await axios.get(`/api/users/reject/${Userid.id}`);
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
      dispatch(setAlert("Employee Rejected", "danger"));
    }
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
