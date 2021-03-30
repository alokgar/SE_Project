import {
    GET_SIZES,
    ADD_SIZE,
    SIZE_ERROR
} from '../actions/types';

const initialState = {
    sizes: null,
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_SIZES:
            return {
                ...state,
                sizes: payload,
                loading: false
            };

        case ADD_SIZE:
            return {
                ...state,
                sizes: payload,
                loading: false
            };


        case SIZE_ERROR:
            return {
                ...state,
                loading: false
            };

        default:
            return state;
    }
}