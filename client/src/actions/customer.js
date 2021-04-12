import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_CUSTOMERS,
  CUSTOMERS_ERROR,
  CUSTOMERS_SUCCESS,
  CUSTOMERS_PROFILE,
} from "./types";

// Get all customers data
export const getCustomers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/customer");

    dispatch({
      type: GET_CUSTOMERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CUSTOMERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Customer

export const addCustomer = ({
  first_name,
  last_name,
  mobile_no,
  line1,
  landmark,
  pincode,
  name,
}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    first_name,
    last_name,
    mobile_no,
    line1,
    landmark,
    pincode,
    name,
  });

  try {
    const res = await axios.post("/api/customer", body, config);
    const res1 = await axios.get("/api/customer");
    dispatch({
      type: CUSTOMERS_SUCCESS,
      payload: res1.data,
    });

    dispatch(getCustomers());
  } catch (err) {
    dispatch({
      type: CUSTOMERS_ERROR,
    });
  }
};

//EDIT Customer
//change status
export const editCustomer = ({
  id,
  first_name,
  last_name,
  mobile_no,
  line1,
  landmark,
  pincode,
  name,
}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    id,
    first_name,
    last_name,
    mobile_no,
    line1,
    landmark,
    pincode,
    name,
  });

  try {
    console.log(id);

    const res = await axios.put(`/api/customer/${id}`, body, config);
    const res1 = await axios.get("/api/customer");
    dispatch({
      type: GET_CUSTOMERS,

      payload: res1.data,
    });
  } catch (err) {
    dispatch({
      type: CUSTOMERS_ERROR,
    });
  }
};

//delete Customer

export const deleteCustomer = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.delete(`/api/customer/${id}`, config);
    const res1 = await axios.get("/api/customer");
    dispatch({
      type: GET_CUSTOMERS,

      payload: res1.data,
    });
  } catch (err) {
    dispatch({
      type: CUSTOMERS_ERROR,
    });
  }
};

// Get all customers data
export const getCustomerProfile = (id) => async (dispatch) => {
  try {
    const order = await axios.get(`/api/order/${id}/customer`);
    const pay = await axios.get(`/api/payment/${id}/customer`);
    const cust = await axios.get(`/api/customer/${id}`);

    function groupBy(list) {
      const map = new Map();
      list.forEach((item) => {
        item.details.forEach((prod) => {
          const key = [prod.size_id.packing_type, prod.product_id.name];
          console.log(key);
          const collection = map.get(key);
          if (!collection) {
            map.set(key, prod.quantity);
          } else {
            map.set(key, collection + prod.quantity);
          }
        });
      });
      return map;
    }
    var pwo = groupBy(order.data.order);
    console.log(pwo);
    dispatch({
      type: CUSTOMERS_PROFILE,
      payload: {
        cust_o: order.data.order,
        cust_p: pay.data,
        curr_cust: cust.data,
        cust_pwo: order.data.prod_wise_order,
      },
    });
  } catch (err) {
    dispatch({
      type: CUSTOMERS_ERROR,
      payload: { msg: err },
    });
  }
};
