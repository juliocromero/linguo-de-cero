import { playsandvotesActionTypes } from './playsandvotes.types';
import { instanceLinguoo } from '../../axiosInstance'
import { getToken } from '../../shared/localStorage';

const token = getToken();

export const addToVotedRequest = ()=>({
    type: playsandvotesActionTypes.ADD_TO_VOTED_REQUEST,
})

export const addToVotedSuccess = upVotedNews => ({
    type: playsandvotesActionTypes.ADD_TO_VOTED_SUCCESS,
    payload: upVotedNews,
})

export const addToVotedFailure = error => ({
    type: playsandvotesActionTypes.ADD_TO_VOTED_FAILURE,
    payload: error,
})

export const addToVotedAsync = item => {
    return dispatch => {
       dispatch(addToVotedRequest);
       instanceLinguoo
       .put(`/news/${ item }/up-vote`, '', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        .then( res => {
            const upVotedNews = res.data;
            dispatch(addToVotedSuccess(upVotedNews));
        } )
        .catch( error => {
            const errorMessage = error.message;
            dispatch(addToVotedFailure(errorMessage));
        });
    }
}


export const addToPlayedRequest = ()=>({
    type: playsandvotesActionTypes.ADD_TO_PLAYED_REQUEST,
})

export const addToPlayedSuccess = upPlayedNews => ({
    type: playsandvotesActionTypes.ADD_TO_PLAYED_SUCCESS,
    payload: upPlayedNews,
})

export const addToPlayedFailure = error => ({
    type: playsandvotesActionTypes.ADD_TO_PLAYED_FAILURE,
    payload: error,
})

export const addToPlayedAsync = item => {
    return dispatch => {
       dispatch(addToPlayedRequest);
       instanceLinguoo
       .put(`/news/${ item }/play`, '', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        .then( res => {
            const upPlayedNews = res.data;
            dispatch(addToPlayedSuccess(upPlayedNews));
        } )
        .catch( error => {
            const errorMessage = error.message;
            dispatch(addToPlayedFailure(errorMessage));
        });
    }
}
