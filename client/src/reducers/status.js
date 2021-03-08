import {
    GET_USERS,
    UPDATE_STATUS,
    CLEAR_USERS
} from '../actions/types';

const initialState = {
	profile: null,
	profiles: [],
    users:[],
	repos: [],
	loading: true,
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_USERS:
		case UPDATE_STATUS:
			return {
				...state,
				users: payload,
				loading: false
			};
		
		
		case CLEAR_USERS:
			return {
				...state,
				users: [],
				repos: [],
				loading: false
			};
		
		default:
			return state;
	}
}