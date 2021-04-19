import axios from "axios";
import { setAlert } from "./alert";
import { GET_SIZES, ADD_SIZE, SIZE_ERROR } from "./types";

// Get all sizes data
export const getSizes = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/size");
    dispatch({
      type: GET_SIZES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SIZE_ERROR,
    });
  }
};

// Add New Size
export const addSize = (size) => async (dispatch) => {
  try {
    const res = await fetch("/api/size", {
      method: "POST",
      body: JSON.stringify(size),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await axios.get("/api/size");

    dispatch({
      type: ADD_SIZE,
      payload: result.data,
    });
    dispatch(setAlert("New size added", "danger"));
  } catch (err) {
    dispatch({
      type: SIZE_ERROR,
    });
  }
};

//EDIT Size

export const editSize = (size) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(size);
  try {
    const res = await axios.put(`/api/size/${size.id}`, body, config);
    const result = await axios.get("/api/size");
    dispatch({
      type: GET_SIZES,
      payload: result.data,
    });
    dispatch(setAlert("edited size succesfully", "danger"));
  } catch (err) {
    dispatch({
      type: SIZE_ERROR,
    });
  }
};
