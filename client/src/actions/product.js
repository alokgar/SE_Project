import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PRODUCTS,
  PRODUCTS_SUCCESS,
  PRODUCTS_ERROR
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



//Add products

export const addProduct = ({ name, description, category_name }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, description, category_name });

  try {

    const res = await axios.post('/api/products', body, config);

    dispatch({
      type: PRODUCTS_SUCCESS,
      payload: res.data
    });
    
   dispatch(getProducts());

  } catch (err) {

    dispatch({
      type:  PRODUCTS_ERROR
    });

  }
};

//EDIT Product
//change status
export const editProduct =({ id,name, description, category_name }) => async dispatch => {
 
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, description, category_name });

  try {

    console.log(id)

    const res = await axios.put(`/api/products/${id}`, body, config);

    dispatch({

      type: GET_PRODUCTS,

      payload: res.data

    });

    

    
  } catch (err) {
    dispatch({
     type:  PRODUCTS_ERROR
    });
  }
};


//delete Product

export const deleteProduct =( id ) => async dispatch => {
 
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };



  try {


    const res = await axios.delete(`/api/products/${id}`, config);

    dispatch({

      type: GET_PRODUCTS,

      payload: res.data

    });

    

    
  } catch (err) {
    dispatch({
     type:  PRODUCTS_ERROR
    });
  }
};