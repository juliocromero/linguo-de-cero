import { listContinueListeningTypes } from './listcontinuelistening.types';

const initialState = {
    data: []
}

const listContinueListeningReducer = (state = initialState, action) => {
    switch(action.type){
        case listContinueListeningTypes.PUSH_ARTICLE: 
            return {
                ...state,
                data: state.data.some(dataArticle => dataArticle._id == action.payload._id) 
                ? state.data 
                : [...state.data, action.payload],
            }
        // case listContinueListeningTypes.UPSERT_CONTINUE_LISTENING_SUCCESS: 
        //     return {
        //         ...state,
        //         data: state.data.some(dataArticle => dataArticle._id == action.payload._id) 
        //         ? state.data 
        //         : [...state.data, action.payload],
        //     }
        case listContinueListeningTypes.FETCH_CONTINUE_LISTENING_SUCCESS: 
            return {
                ...state,
                data: [ ...action.payload],
            }
        case listContinueListeningTypes.REMOVE_ARTICLE:
            return {
                ...state,
                data: state.data.filter(dataArticle => dataArticle._id !== action.payload) 
            }
        default:
            return state         
    }
}

export default listContinueListeningReducer;