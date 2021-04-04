import {
    GET_CATEGORY,
  CATEGORY_SUCCESS,
  CATEGORY_ERROR,
  ADD_CATEGORY,
} from '../actions/types';

const initialState = {
    category: null,
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_CATEGORY:
            return {
                ...state,
                category: payload,
                loading: false
            };

        case ADD_CATEGORY:
            return {
                ...state,
                category: payload,
                loading: false
            };


        case CATEGORY_ERROR:
            return {
                ...state,
                loading: false
            };

        default:
            return state;
    }
}