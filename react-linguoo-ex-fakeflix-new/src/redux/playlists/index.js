import { playlistsActionTypes } from "./playlists.types"
// import { initialLoadPlaylistsUtil, addToPlaylistsUtil, removeFromPlaylistsUtil } from "./playlists.utils"

const initialState = {
    playlistsList: [],
    error: '',
    title: ''
}

const playlistsReducer = (state = initialState, action) => {
    switch (action.type) {
         case playlistsActionTypes.FETCH_PLAYLISTS_SUCCESS:
            return {
                ...state,
                playlistsList: action.payload.playlists,
                title: action.payload.title
            }
        case playlistsActionTypes.FETCH_PLAYLISTS_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default playlistsReducer
