import { currentPlaylistDataTypes } from './currentplaylistdata.types'

const initialState = {
    basedOn: 'category'
}

const currentPlayListReducer = (state = initialState, action) => {
    switch (action.type) {
        case currentPlaylistDataTypes.CHANGE_PLAYLIST_SOURCE_BASED_ON:
            return {
                ...state,
                basedOn: action.basedOn
            }
        default: 
            return state
    }
}

export default currentPlayListReducer