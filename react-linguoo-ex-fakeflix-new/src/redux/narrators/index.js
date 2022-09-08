import { narratorTypes } from './narrators.types';

const initialState = {
    narrators:[],
    error: '',
    title: ''
}

const narratorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case narratorTypes.FETCH_NARRATORS_SUCCESS :
            return {
                ...state,
                narrators: action.payload                
            }
        case narratorTypes.FETCH_NARRATORS_FAILURE :
            return {
                ...state,
                narrators: action.payload                
            }
        default:
            return state
    }
}

export default narratorsReducer