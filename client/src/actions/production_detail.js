import axios from "axios";
import { setAlert } from "./alert";
import { Link, Redirect } from "react-router-dom";
import dateFormat from "dateformat";

import {
    GET_PRODUCTION_DETAILS,
    CLEAR_PRODUCTION_DETAILS,
	PRODUCTION_DETAILS_ERROR
} from "./types";

// Get all productions_details between the given dates
export const getProduction_details = ({ from, to }) => async (dispatch) => {
    try {
      const res = await axios.get("/api/production_details");
      const details = res.data;
      var filtered = [];
  
      details.map(function (detail) {
        var curr_date = dateFormat(detail.date, "yyyy-mm-dd");
        var detail_date = new Date(curr_date).getTime();
  
        var date = new Date(from);
        var mnth = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        var fr = [date.getFullYear(), mnth, day].join("-");
  
        date = new Date(to);
        mnth = ("0" + (date.getMonth() + 1)).slice(-2);
        day = ("0" + date.getDate()).slice(-2);
        var tr = [date.getFullYear(), mnth, day].join("-");
  
        var f = new Date(fr).getTime();
        var t = new Date(tr).getTime();
        // console.log("product");
        // console.log(product_date);
        // console.log("from");
        // console.log(f);
        // console.log("to");
        // console.log(t);
  
        if (detail_date >= f && detail_date <= t) {
          filtered.push(detail);
        }
      });
  
      dispatch({
        type: GET_PRODUCTION_DETAILS,
        payload: filtered,
      });
    } catch (err) {
      dispatch({
        type: PRODUCTION_DETAILS_ERROR,
      });
    }
  };
  