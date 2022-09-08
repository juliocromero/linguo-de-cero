import { moviesActionTypes } from './movies.types';

const initialState = {
    loading: false,
    error: '',
    data: []
}

const adventureMoviesReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case moviesActionTypes.UPDATE_VOTES_SUCCESS:
            return {
                ...state,
                data: state.data && state.data.length > 0 ? state.data.map(item => {
                        if(item._id === payload){
                            item.upVotes = item.upVotes + 1
                        }   
                        return item                 
                    }
                ) : state.data
            }
        // case moviesActionTypes.UPDATE_VOTES_FAILURE:
        //     return {
        //         ...state,
        //         data: [],
        //         loading: false,
        //         error: payload
        //     }
        case moviesActionTypes.UPDATE_PLAYS_SUCCESS:
            return {
                ...state,
                data: state.data && state.data.length > 0 ? state.data.map(item => {
                        if(item._id === payload){
                            item.plays = item.plays + 1
                        }   
                        return item                 
                    }
                ) : state.data
            }
        // case moviesActionTypes.UPDATE_VOTES_FAILURE:
        //     return {
        //         ...state,
        //         data: [],
        //         loading: false,
        //         error: payload
        //     }
        case moviesActionTypes.FETCH_ADVENTURE_MOVIES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case moviesActionTypes.FETCH_ADVENTURE_MOVIES_SUCCESS:
            return {
                ...state,
                data: payload,
                loading: false,
                error: ''
            }
        case moviesActionTypes.LOAD_MORE_ADVENTURE_MOVIES_SUCCESS:
            return {
                ...state,
                data: [...state.data, ...payload],
                loading: false,
                error: ''
            }
        case moviesActionTypes.FETCH_ADVENTURE_MOVIES_FAILURE:
            return {
                ...state,
                data: [],
                loading: false,
                error: payload
            }
        default:
            return state;
    }
}

export default adventureMoviesReducer;