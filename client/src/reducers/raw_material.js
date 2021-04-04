import {
	GET_RAW_MATERIALS,
	ADD_RAW_MATERIAL,
	RAW_MATERIALS_ERROR,
	FILTER_RAW_MATERIALS,
	CLEAR_FILTER_RAW_MATERIALS
} from '../actions/types';

const initialState = {
	raw_materials: null,
	filtered_raw_materials: [],
	loading: true,
	error: {}
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_RAW_MATERIALS:
			return {
				...state,
				raw_materials: payload,
				loading: false
			};

		case ADD_RAW_MATERIAL:
			return {
				...state,
				raw_materials: payload,
				loading: false
			};

		case FILTER_RAW_MATERIALS:
			return {
				...state,
				filtered_raw_materials: payload,
				loading: false
			};

		case CLEAR_FILTER_RAW_MATERIALS:
			return {
				...state,
				filtered_raw_materials: [],
				loading: false
			};

		case RAW_MATERIALS_ERROR:
			return {
				...state,
				loading: false
			};

		default:
			return state;
	}
}