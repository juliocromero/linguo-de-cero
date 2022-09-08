import { createSelector } from 'reselect';

const selectCurrentPlayListData = (state) => state.currentPlayListData

export const selectCurrentPlayListDataSelector = createSelector(
    [selectCurrentPlayListData],
    currentPlayListData => currentPlayListData
)