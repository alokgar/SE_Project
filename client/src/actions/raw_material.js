import axios from "axios";
import { setAlert } from "./alert";
import dateFormat from "dateformat";

import {
  GET_RAW_MATERIALS,
  RAW_MATERIALS_ERROR,
  ADD_RAW_MATERIAL,
  FILTER_RAW_MATERIALS,
  CLEAR_FILTER_RAW_MATERIALS,
} from "./types";

// Get all raw_materials data
export const getRaw_materials = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/raw_material");
    dispatch({
      type: GET_RAW_MATERIALS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: RAW_MATERIALS_ERROR,
    });
  }
};

// Add New Raw-material
export const addRaw_material = (raw_material) => async (dispatch) => {
  try {
    const res = await fetch("/api/raw_material", {
      method: "POST",
      body: JSON.stringify(raw_material),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await axios.get("/api/raw_material");

    dispatch({
      type: ADD_RAW_MATERIAL,
      payload: result.data,
    });
    dispatch(setAlert("New Raw materials added", "danger"));
  } catch (err) {
    dispatch({
      type: RAW_MATERIALS_ERROR,
    });
  }
};

//EDIT Raw_material

export const editRaw_material = (raw_material) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(raw_material);
  try {
    const res = await axios.put(
      `/api/raw_material/${raw_material.id}`,
      body,
      config
    );
    const result = await axios.get("/api/raw_material");
    dispatch({
      type: GET_RAW_MATERIALS,
      payload: result.data,
    });
    dispatch(setAlert(" Raw materials edited succesfully", "danger"));
  } catch (err) {
    dispatch({
      type: RAW_MATERIALS_ERROR,
    });
  }
};

//delete Raw_material

export const deleteRaw_material = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.delete(`/api/raw_material/${id}`, config);
    const result = await axios.get("/api/raw_material");
    dispatch({
      type: GET_RAW_MATERIALS,
      payload: result.data,
    });
    dispatch(setAlert(" Raw materials deleted succesfully", "danger"));
  } catch (err) {
    dispatch({
      type: RAW_MATERIALS_ERROR,
    });
  }
};

// filter all Raw_materials in given date-range
export const filterRaw_material = ({ from, to }) => async (dispatch) => {
  try {
    const res = await axios.get("/api/raw_material");
    const raw_materials = res.data;
    var filtered = [];

    raw_materials.map(function (raw_material) {
      var curr_date = dateFormat(raw_material.date_of_receiving, "yyyy-mm-dd");
      var raw_material_date = new Date(curr_date).getTime();

      var date = new Date(from);
      var mnth = ("0" + (date.getMonth() + 1)).slice(-2);
      var day = ("0" + date.getDate()).slice(-2);
      var from_date = [date.getFullYear(), mnth, day].join("-");

      date = new Date(to);
      mnth = ("0" + (date.getMonth() + 1)).slice(-2);
      day = ("0" + date.getDate()).slice(-2);
      var to_date = [date.getFullYear(), mnth, day].join("-");

      var f = new Date(from_date).getTime();
      var t = new Date(to_date).getTime();

      if (raw_material_date >= f && raw_material_date <= t) {
        filtered.push(raw_material);
      }
    });

    dispatch({
      type: GET_RAW_MATERIALS,
      payload: filtered,
    });
  } catch (err) {
    dispatch({
      type: RAW_MATERIALS_ERROR,
    });
  }
};

// clears the filtered_raw_materials
export const clearFilter_raw_material = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_FILTER_RAW_MATERIALS,
    });
  } catch (err) {
    dispatch({
      type: RAW_MATERIALS_ERROR,
    });
  }
};
