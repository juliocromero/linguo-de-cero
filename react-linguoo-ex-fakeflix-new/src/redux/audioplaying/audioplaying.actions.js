//#region imports

import { audioplayingActionTypes } from './audioplaying.types';
import { instanceLinguoo } from "../../axiosInstance";
import { getToken } from '../../shared/localStorage'

//#endregion


export const setAudioPlayingCompleteData = (audioPlayingUrl, categoryid, articleId, duration, trankingProgress, playIngCurrentList) => ({
    type: audioplayingActionTypes.SET_AUDIO_PLAYING_COMPLETE,
    payload: {audioPlayingUrl, categoryid, articleId, duration, trankingProgress, playIngCurrentList}
})

export const setAudioPlayingJustPlay = (trankingProgress) => ({
    type: audioplayingActionTypes.SET_AUDIO_PLAYING_JUSTPLAY,
	payload: trankingProgress
})

// export const setAudioPaused = audioTrackPaused => ({
//     type: audioplayingActionTypes.SET_AUDIO_PAUSED,
//     payload: audioTrackPaused
// })

const token = getToken();

export const setDefaultAudioListValuesAsync = url => {
    return dispatch => {
        dispatch(setDefaultAudioListValuesRequest());
		instanceLinguoo
			.get(url, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})   
			.then(res => {
				//Audiobooks is the default list
				const defaultAudioPlayerList = res.data.map(el => ({
					// ...el,
					id: parseInt(el._id.replace(/\D/g,'').slice(5)),
					_id: el._id,
					genre_ids: [18],
					name: el.title,
					original_name: el.title,
					original_language: 'english',
					origin_country: ['CO'],
					backdrop_path: el.image,
					first_air_date: el.date,
					release_date: el.date,
					vote_average: el.upVotes,
					overview: el.text,
					voteCount: 0,
					isFavourite: false,
					// audio: el.audio.replace(BASE_AUDIOS_URL, ''),
					audio: el.audio,
					duration: el.duration,
					narrator: el.narrator,		
					plays: el.plays,
					upVotes: el.upVotes ? el.upVotes : 0,
					downVotes: el.downVotes ? el.downVotes: 0,		
					status: el.status,
					category: el.category,
					isLinguoo: true,
					fromPlaylist: false
					// idList: 12				
				}));
                const {audio, category, _id, duration } = defaultAudioPlayerList[0];
                dispatch(setDefaultAudioListValuesSuccess(audio, category, _id, duration, 0, defaultAudioPlayerList));
            })
            .catch( error => {
                const errorMessage = error.message;
                dispatch(setDefaultAudioListValuesFailure(errorMessage));
            });
        }
    }

export const setDefaultAudioListValuesSuccess = (audioPlayingUrl, categoryid, articleId, duration, trankingProgress, playIngCurrentList) => ({
    type: audioplayingActionTypes.SET_DEFAULT_AUDIO_VALUES_SUCCESS,
    payload: {audioPlayingUrl, categoryid, articleId, duration, trankingProgress, playIngCurrentList}
})

export const setDefaultAudioListValuesFailure = error => ({
    type: audioplayingActionTypes.SET_DEFAULT_AUDIO_VALUES_FAILURE,
    payload: error
})

export const setDefaultAudioListValuesRequest = () => ({
    type: audioplayingActionTypes.SET_DEFAULT_AUDIO_VALUES_REQUEST
})


export const setAudioPaused = () => ({
    type: audioplayingActionTypes.SET_AUDIO_PAUSED
})

export const setAudioStoped = () => ({
    type: audioplayingActionTypes.SET_AUDIO_STOPED
})

export const setAudioTracking = audioTracking => ({
    type: audioplayingActionTypes.SET_AUDIO_TRACKING,
    payload: audioTracking
})

