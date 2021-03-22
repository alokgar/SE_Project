import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PRODUCTS,
  PRODUCTS_ERROR,
  UPDATE_STATUS,
  CLEAR_USERS,
  PROFILE_ERROR,
  CHANGE_STATUS
} from './types';



// Get all products data
export const getProducts = () => async dispatch => {

  

  try {
   
    const res = await axios.get('/api/products');
    
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PRODUCTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

