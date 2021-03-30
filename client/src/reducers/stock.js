import {
    GET_STOCKS,
    STOCKS_ERROR,
    ADD_STOCK
} from '../actions/types';

const initialState = {
	stocks : null,
    loading : true,
	error : {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_STOCKS:
			return {
				...state,
				stocks : payload,
				loading : false
			};

		case ADD_STOCK:
			return {
				...state,
				stocks : payload,
				loading : false
			};
		
		
        case STOCKS_ERROR:
            return {
                ...state,
                loading : false      
            };
		
		default:
			return state;
	}
}