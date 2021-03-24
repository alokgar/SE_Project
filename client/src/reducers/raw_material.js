import {
    GET_RAW_MATERIALS,
	ADD_RAW_MATERIAL,
    RAW_MATERIALS_ERROR
} from '../actions/types';

const initialState = {
	raw_materials : null,
    loading : true,
	error : {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_RAW_MATERIALS:
			return {
				...state,
				raw_materials : payload,
				loading : false
			};
			
			case ADD_RAW_MATERIAL:
            return {
                ...state,
				raw_materials : payload,
                loading : false
            };
		
            case RAW_MATERIALS_ERROR:
                return {
                    ...state,
                    loading : false
                };
		
		default:
			return state;
	}
}