import {
    GET_PAYMENTS,
    PAYMENTS_ERROR,
    PAYMENTS_SUCCESS
} from '../actions/types';

const initialState = {
	payments:null,
    loading: true,
    payment:null,
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_PAYMENTS:
        case PAYMENTS_SUCCESS:
			return {
				...state,
				payments: payload,
				loading: false
			};
		
		
		case PAYMENTS_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
				
			};
		
		default:
			return state;
	}
}