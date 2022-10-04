import { listContinueListeningTypes } from './listcontinuelistening.types'
import { instanceLinguoo } from "../../axiosInstance";
import {  getToken } from '../../shared/localStorage'

const token = getToken();

export const pushContinueListeningArticle = (newArticle, localTrackingProgress) => ({
    type: listContinueListeningTypes.PUSH_ARTICLE,
    payload: {...newArticle.item, localTrackingProgress: localTrackingProgress, genre_ids: [100]} 
})

// export const updateContinueListeningArticle = article => ({
//     type: listContinueListeningTypes.UPDATE_ARTICLE,
//     payload: article
// })

export const removeContinueListeningArticle = articleid => ({
    type: listContinueListeningTypes.REMOVE_ARTICLE,
    payload: articleid
})

const fetchContinueListeningSuccess = (continueListening, isPage) => ({
	type: isPage
		? listContinueListeningTypes.FETCH_CONTINUE_LISTENING_SUCCESS
		: listContinueListeningTypes.LOAD_MORE_CONTINUE_LISTENING_SUCCESS,
	payload: continueListening,
});

const fetchContinueListeningFailure = error => ({
	type: listContinueListeningTypes.FETCH_CONTINUE_LISTENING_FAILURE,
	payload: error,
});

const fetchContinueListeningRequest = ()=> ({
    type: listContinueListeningTypes.FETCH_CONTINUE_LISTENING_REQUEST
});

export const fetchContinueListeningAsync = (fetchUrl, isPage) => {
    return dispatch => {
        dispatch(fetchContinueListeningRequest());
        instanceLinguoo
            .get(`${fetchUrl}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                const continuelistening = res.data.map(conlis => {
                    const {pausedNew, trackingAudioValue} = conlis;
                    const el = pausedNew;
                    const articleToPushCL = {
					id: parseInt(el._id.replace(/\D/g,'').slice(6)),
					_id: el._id,
					genre_ids: [100],
					name: el.title,
					original_name: el.title,
					original_language: el.language,
					origin_country: ['CO'],
					backdrop_path: el.image || '',
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
					isPlaylist: null,
					fromPlaylist: false,
                    trackingAudioValue: trackingAudioValue
                    }
                    // dispatch(pushContinueListeningArticle(articleToPushCL, trackingAudioValue));
                    return articleToPushCL;
                });
                if (isPage) {
					dispatch(fetchContinueListeningSuccess(continuelistening, isPage));
				} else dispatch(fetchContinueListeningSuccess(continuelistening));
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(fetchContinueListeningFailure(errorMessage));
            });
    }
};

const upsertContinueListeningSuccess = () => ({
    type: listContinueListeningTypes.UPSERT_CONTINUE_LISTENING_SUCCESS,
    payload: true
})

const upsertContinueListeningFailure = (error) => ({
    type: listContinueListeningTypes.UPSERT_CONTINUE_LISTENING_FAILURE,
    payload: error 
});

const upsertContinueListeningRequest = () => ({
    type: listContinueListeningTypes.UPSERT_CONTINUE_LISTENING_REQUEST
})

export const upsertContinueListeningAsync = (updUrl, pausedNew, trackingAudioValue ) => {
    return dispatch => {
        dispatch(upsertContinueListeningRequest());
        const conlis = {
            "pausedNew":  pausedNew,
            "trackingAudioValue": trackingAudioValue
        };

        instanceLinguoo.post(updUrl, {
            conlis
        }, {
            headers: {
                'Authorization': `Bearer ${token}`            }
        })
        .then(() => {
            dispatch(upsertContinueListeningSuccess);
        })  
        .catch(error => {
            upsertContinueListeningFailure(error);
        })      
    }
}

const removeContinueListeningSuccess = () => ({
    type: listContinueListeningTypes.REMOVE_CONTINUE_LISTENING_SUCCESS,
    payload: true
})

const removeContinueListeningFailure = (error) => ({
    type: listContinueListeningTypes.REMOVE_CONTINUE_LISTENING_FAILURE,
    payload: error 
});

const removeContinueListeningRequest = () => ({
    type: listContinueListeningTypes.REMOVE_CONTINUE_LISTENING_REQUEST
})

export const removeContinueListeningAsync = (delUrl, pausedNew) => {
    return dispatch => {
        dispatch(removeContinueListeningRequest());

        instanceLinguoo.delete(`${delUrl}/${pausedNew}`, {
            headers: {
                'Authorization': `Bearer ${token}`            }
        })
        .then(() => {
            dispatch(removeContinueListeningSuccess);
        })  
        .catch(error => {
            removeContinueListeningFailure(error);
        })      
    }
}