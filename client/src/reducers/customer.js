import {
    GET_CUSTOMERS,
    CUSTOMERS_ERROR,
    CUSTOMERS_SUCCESS,
	CUSTOMERS_PROFILE
} from '../actions/types';

const initialState = {
	customers:null,
	curr_customer:null,
    loading: true,
	error: {},
	cust_orders:null,
	cust_payments:null
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_CUSTOMERS:
        case CUSTOMERS_SUCCESS:
			return {
				...state,
				customers: payload,
				loading: false
			};
		
		case CUSTOMERS_PROFILE:
			return {
				...state,
				cust_orders: payload.cust_o,
        		cust_payments: payload.cust_p,
				curr_customer:payload.curr_cust,
				loading: false
			};
		case CUSTOMERS_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
				
			};
		
		default:
			return state;
	}
}