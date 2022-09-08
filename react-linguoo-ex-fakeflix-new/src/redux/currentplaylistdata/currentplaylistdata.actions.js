import { currentPlaylistDataTypes } from './currentplaylistdata.types'

export const changePlaylistSourceBasedOn = basedOn => ({
    type: currentPlaylistDataTypes.CHANGE_PLAYLIST_SOURCE_BASED_ON,
    payload: basedOn
})