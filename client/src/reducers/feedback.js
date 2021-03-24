import {
    GET_FEEDBACKS,
    FEEDBACKS_ERROR,
    FEEDBACKS_SUCCESS
} from '../actions/types';

const initialState = {
	feedbacks:null,
    loading: true,
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_FEEDBACKS:
        case FEEDBACKS_SUCCESS:
			return {
				...state,
				feedbacks: payload,
				loading: false
			};
		
		
		case FEEDBACKS_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
				
			};
		
		default:
			return state;
	}
}