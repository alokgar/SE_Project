import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_FEEDBACKS,
  FEEDBACKS_ERROR,
  FEEDBACKS_SUCCESS
} from './types';


// Get all feedbacks data
export const getFeedbacks = () => async dispatch => {
  try {
   
    const res = await axios.get('/api/feedback');
    
    dispatch({
      type: GET_FEEDBACKS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: FEEDBACKS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Add Feedback

export const addFeedback = ({ subject,content }) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    const body = JSON.stringify({ subject,content });
  
    try {
        console.log("--------------------------------");
      const res = await axios.post('/api/feedback', body, config);
      const res1 = await axios.get('/api/feedback');
      dispatch({
        type: FEEDBACKS_SUCCESS,
        payload: res1.data
      });
      
     dispatch(getFeedbacks());
  
    } catch (err) {
  
      dispatch({
        type:  FEEDBACKS_ERROR
      });
  
    }
  };
  
  //EDIT Feedback
  //change status
  export const editFeedback =({ id,subject,content }) => async dispatch => {
   
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    const body = JSON.stringify({ subject,content });
  
    try {
  
      console.log(id)
  
      const res = await axios.put(`/api/feedback/${id}`, body, config);
      const res1 = await axios.get('/api/feedback');
      dispatch({
  
        type: GET_FEEDBACKS,
  
        payload: res1.data
  
      });
  
      
  
      
    } catch (err) {
      dispatch({
       type:  FEEDBACKS_ERROR
      });
    }
  };
  
  
  //delete Feedback
  
  export const deleteFeedback =( id ) => async dispatch => {
   
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
  
  
    try {
  
  
      const res = await axios.delete(`/api/feedback/${id}`, config);
      const res1 = await axios.get('/api/feedback');
      dispatch({
  
        type: GET_FEEDBACKS,
  
        payload: res1.data
  
      });
  
      
  
      
    } catch (err) {
      dispatch({
       type:  FEEDBACKS_ERROR
      });
    }
  };