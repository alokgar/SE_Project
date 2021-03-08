import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import status from './status';


export default combineReducers({
  alert,
  auth,
  profile,
  status
});