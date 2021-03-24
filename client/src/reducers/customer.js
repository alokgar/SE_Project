import {
    GET_CUSTOMERS,
    CUSTOMERS_ERROR,
    CUSTOMERS_SUCCESS
} from '../actions/types';

const initialState = {
	customers:null,
    loading: true,
	error: {}
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