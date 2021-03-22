import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import status from './status';
import product from './product';


export default combineReducers({
  alert,
  auth,
  profile,
  status,
  product
});