import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import status from './status';
import product from './product';
import raw_material from './raw_material';
import supplier from './supplier';


export default combineReducers({
  alert,
  auth,
  profile,
  status,
  product,
  raw_material,
  supplier
});