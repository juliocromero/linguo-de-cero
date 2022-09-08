import { favouritesActionTypes } from "./favourites.types"
import { initialLoadFavouritesUtil, addToFavouritesUtil, removeFromFavouritesUtil } from "./favourites.utils"

const initialState = {
    favouritesList: [],
    error: ''
}

const favouritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case favouritesActionTypes.ADD_TO_FAVOURITES:
            return {
                ...state,
                favouritesList: addToFavouritesUtil(state.favouritesList, action.payload)
            }
        case favouritesActionTypes.REMOVE_FROM_FAVOURITES:
            return {
                ...state,
                favouritesList: removeFromFavouritesUtil(state.favouritesList, action.payload)
            }
        // default:
        //     return state
        case favouritesActionTypes.ADD_TO_FAVOURITES_SUCCESS:
            return {
                ...state,
                favouritesList: addToFavouritesUtil(state.favouritesList, action.payload)
            }
        case favouritesActionTypes.ADD_TO_FAVOURITES_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case favouritesActionTypes.REMOVE_FROM_FAVOURITES_SUCCESS:
            return {
                ...state,
                favouritesList: removeFromFavouritesUtil(state.favouritesList, action.payload)
            }
        case favouritesActionTypes.REMOVE_FROM_FAVOURITES_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case favouritesActionTypes.FETCH_FAVOURITES_SUCCESS:
            return {
                ...state,
                favouritesList: initialLoadFavouritesUtil(action.payload)
            }
        case favouritesActionTypes.FETCH_FAVOURITES_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default favouritesReducer
