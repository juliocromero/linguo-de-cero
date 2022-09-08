import { createSelector } from 'reselect';

export const selectContinueListeningData = state => state.listContinueListening;

export const selectContinueListeningDataSelector = createSelector(
    [selectContinueListeningData],
    listContinueListening => listContinueListening
)