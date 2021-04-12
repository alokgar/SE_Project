import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import status from "./status";
import product from "./product";
import customer from "./customer";
import raw_material from "./raw_material";
import supplier from "./supplier";
import size from "./size";
import stock from "./stock";

import feedback from './feedback';
import payment from './payment';
import order from './order';
import category from './category';
import production_detail from './production_detail';
import sales from "./sales";
import users from "./users";

export default combineReducers({
  alert,
  auth,
  profile,
  status,
  product,
  customer,
  raw_material,
  supplier,
  feedback,
  payment,
  size,
  stock,
  feedback,
  order,
  category,
  production_detail,
  sales,
  users,
});
