import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_RAW_MATERIALS,
  RAW_MATERIALS_ERROR,
  ADD_RAW_MATERIAL
} from './types';



// Get all raw_materials data
export const getRaw_materials = () => async dispatch => {
  try {
    const res = await axios.get('/api/raw_material');
    dispatch({
      type: GET_RAW_MATERIALS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RAW_MATERIALS_ERROR
    });
  }
};


// Add New Raw-material
export const addRaw_material = (raw_material) => async dispatch => {
  try {
      const res = await fetch('/api/raw_material',{
          method: 'POST',
          body: JSON.stringify(raw_material),
          headers: {
              'Content-Type': 'application/json'
          }
      });
      const result = await axios.get('/api/raw_material');

      dispatch({
          type : ADD_RAW_MATERIAL,
          payload: result.data
      });
  } catch (err) {
      dispatch({
          type : RAW_MATERIALS_ERROR
      });
  }

};

//EDIT Raw_material

export const editRaw_material = (raw_material) => async dispatch => {
 
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify(raw_material);
  try {
    const res = await axios.put(`/api/raw_material/${raw_material.id}`, body, config);
    const result = await axios.get('/api/raw_material');
    dispatch({
      type: GET_RAW_MATERIALS,
      payload: result.data
    });
    
  } catch (err) {
    dispatch({
     type: RAW_MATERIALS_ERROR
    });
  }
};

//delete Raw_material

export const deleteRaw_material = ( id ) => async dispatch => {
 
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.delete(`/api/raw_material/${id}`, config);
    const result = await axios.get('/api/raw_material'); 
    dispatch({
      type: GET_RAW_MATERIALS,
      payload: result.data
    });
  } catch (err) {
    dispatch({
     type:  RAW_MATERIALS_ERROR
    });
  }
};
