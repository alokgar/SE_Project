import {
	GET_PRODUCTS,
	PRODUCTS_SUCCESS,
	PRODUCTS_ERROR,
	FILTER_PRODUCT,
	CLEAR_FILTER
} from '../actions/types';

const initialState = {
	products: [],
	filtered_products: [],
	loading: true,
	error: {}
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_PRODUCTS:
		case PRODUCTS_SUCCESS:
			return {
				...state,
				products: payload,
				loading: false
			};


		case PRODUCTS_ERROR:
			return {
				...state,
				error: payload,
				loading: false,

			};

		case FILTER_PRODUCT:
			return {
				...state,
				filtered_products : payload,
				loading : false
			};

		case CLEAR_FILTER:
			return {
				...state,
				filtered_products : [],
				loading : false
			}

		default:
			return state;
	}
}