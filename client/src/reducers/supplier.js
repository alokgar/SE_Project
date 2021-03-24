import {
    GET_SUPPLIERS,
	ADD_SUPPLIER,
    SUPPLIERS_ERROR
} from '../actions/types';

const initialState = {
	suppliers : null,
    loading : true,
	error : {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_SUPPLIERS:
			return {
				...state,
				suppliers : payload,
				loading : false
			};

		case ADD_SUPPLIER:
			return {
				...state,
				suppliers : payload,
				loading : false
			};
		
		
        case SUPPLIERS_ERROR:
            return {
                ...state,
                loading : false
                    
            };
		
		default:
			return state;
	}
}