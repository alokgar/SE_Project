import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import status from './status';
import product from './product';
import customer from './customer';
import raw_material from './raw_material';
import supplier from './supplier';
import feedback from './feedback';

export default combineReducers({
  alert,
  auth,
  profile,
  status,
  product,
  customer,
  raw_material,
  supplier,
  feedback
});