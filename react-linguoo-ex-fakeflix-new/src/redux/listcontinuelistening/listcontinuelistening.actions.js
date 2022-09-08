import { listContinueListeningTypes } from './listcontinuelistening.types'

export const pushContinueListeningArticle = (newArticle, localTrackingProgress) => ({
    type: listContinueListeningTypes.PUSH_ARTICLE,
    payload: {...newArticle.item, localTrackingProgress: localTrackingProgress} 
})

// export const updateContinueListeningArticle = article => ({
//     type: listContinueListeningTypes.UPDATE_ARTICLE,
//     payload: article
// })

export const removeContinueListeningArticle = articleid => ({
    type: listContinueListeningTypes.REMOVE_ARTICLE,
    payload: articleid
})