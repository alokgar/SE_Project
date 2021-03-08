import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_USERS,
  UPDATE_STATUS,
  CLEAR_USERS,
  PROFILE_ERROR
} from './types';



// Get all profiles
export const getUsers = () => async dispatch => {
  dispatch({ type: CLEAR_USERS });

  try {
    const res = await axios.get('/api/users');

    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get profile by ID
// export const getProfileById = userId => async dispatch => {
//   try {
//     const res = await axios.get(`/api/profile/user/${userId}`);

//     dispatch({
//       type: GET_PROFILE,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

