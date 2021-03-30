import {
    GET_ORDERS,
	ORDER_ERROR
} from '../actions/types';

const initialState = {
	orders:[],
   loading: true,
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_ORDERS:
		
			return {
				...state,
				orders: payload,
				loading: false
			};
		
		
		case ORDER_ERROR:
			return {
				...state,
				
				loading: false,
				
			};
		
		default:
			return state;
	}
}