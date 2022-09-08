import { createSelector } from "reselect";

const selectPlaylists = state => state.playlists;

export const selectPlaylistsList = createSelector(
    [selectPlaylists],
    playlists => playlists.playlistsList
)

export const selectPlaylistsTitle = createSelector(
    [selectPlaylists],
    playlists => playlists.title
)

