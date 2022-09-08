import { createSelector } from 'reselect'

const selectNarrators = state => state.narrators;

export const selectNarratorsList = createSelector(
    [selectNarrators],
    narrators => narrators.narrators
)