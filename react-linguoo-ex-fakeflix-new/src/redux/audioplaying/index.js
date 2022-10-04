import { audioplayingActionTypes } from './audioplaying.types';

const initialState = {
    error:'',
    audioPlayingUrl: '',
    categoryid: '',
    articleid: '',
    duration: 0,
    trackingProgress: 0,
    isPlaying: false,
    playIngCurrentList: []
}

const audioPlayingReducer = (state = initialState, action) => {
    switch(action.type){
        case audioplayingActionTypes.SET_AUDIO_PLAYING_COMPLETE:
            return {
                ...state,
                audioPlayingUrl: action.payload.audioPlayingUrl,
                categoryid: action.payload.categoryid,
                articleid: action.payload.articleId,
                duration: action.payload.duration,
                trackingProgress: action.payload.trankingProgress,
                playIngCurrentList: action.payload.playIngCurrentList,
                isPlaying: true
            }
        case audioplayingActionTypes.SET_AUDIO_PLAYING_JUSTPLAY:
            return {
                ...state,
                trankingProgress: action.payload,
                isPlaying: true
            }
        case audioplayingActionTypes.SET_AUDIO_PAUSED:
            return {
                ...state,
                // trackingProgress: action.payload,
                isPlaying: false
            }
        case audioplayingActionTypes.SET_AUDIO_STOPED:
            return {
                ...state,
                trackingProgress: 0,                
                isPlaying: false
            }
        case audioplayingActionTypes.SET_AUDIO_TRACKING:
            return {
                ...state,
                trackingProgress: action.payload
            }
        case audioplayingActionTypes.SET_DEFAULT_AUDIO_VALUES_SUCCESS:
            return {
                ...state,
                audioPlayingUrl: action.payload.audioPlayingUrl,
                categoryid: action.payload.categoryid,
                articleid: action.payload.articleId,
                duration: action.payload.duration,
                trackingProgress: action.payload.trankingProgress,
                playIngCurrentList: action.payload.playIngCurrentList,                
                isPlaying: false
            }
        case audioplayingActionTypes.SET_DEFAULT_AUDIO_VALUES_FAILURE:
            return {
                ...state,
                error: action.payload,
                isPlaying: false
            }
        default:
            return state
    }
}

export default audioPlayingReducer;