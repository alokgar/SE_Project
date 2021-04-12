import { GET_SALES, SALES_ERROR } from "../actions/types";

const initialState = {
  loading: true,
  error: {},
  dis_order: null,
  pen_order: null,
  con_order: null,
  prod_wise_order: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SALES:
      return {
        ...state,
        dis_order: payload.dis_order,
        pen_order: payload.pen_order,
        con_order: payload.con_order,
        prod_wise_order: payload.prod_wise_order,
        loading: false,
      };
    case SALES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
