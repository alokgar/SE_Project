import {
	GET_PRODUCTION_DETAILS,
    CLEAR_PRODUCTION_DETAILS,
	PRODUCTION_DETAILS_ERROR
} from '../actions/types';

const initialState = {
	production_details: [],
	loading: true,
	error: {}
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_PRODUCTION_DETAILS:
			return {
				...state,
				production_details: payload,
				loading: false
			};


		case PRODUCTION_DETAILS_ERROR:
			return {
				...state,
				loading: false
			};

		case CLEAR_PRODUCTION_DETAILS:
			return {
				...state,
				production_details : [],
				loading : false
			}

		default:
			return state;
	}
}