import axios from "axios";
import { setAlert } from "./alert";
import { Link, Redirect } from "react-router-dom";
import dateFormat from "dateformat";

import { GET_CATEGORY, ADD_CATEGORY, CATEGORY_ERROR } from "./types";

// Get all category data
export const getCategory = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/category");

    dispatch({
      type: GET_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add New Category
export const addCategory = (category) => async (dispatch) => {
  try {
    const res = await fetch("/api/category", {
      method: "POST",
      body: JSON.stringify(category),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await axios.get("/api/category");

    dispatch({
      type: ADD_CATEGORY,
      payload: result.data,
    });
    dispatch(setAlert(" New Category added succesfully", "danger"));
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
    });
  }
};

// EditCategory
export const editCategory = (size) => async (dispatch) => {};
