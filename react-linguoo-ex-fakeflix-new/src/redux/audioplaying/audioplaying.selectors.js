import { createSelector } from 'reselect';

const selectAudioPlaying = state => state.audioPlaying;

export const selectAudioPlayingSelector = createSelector(
    [selectAudioPlaying],
    audioPlaying => audioPlaying
)