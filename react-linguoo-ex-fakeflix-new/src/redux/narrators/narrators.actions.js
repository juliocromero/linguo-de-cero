import { instanceLinguoo } from "../../axiosInstance";
import { narratorTypes } from './narrators.types'
import {  getToken } from '../../shared/localStorage'
import { fetchHorrorMoviesFailure } from "../movies/movies.actions";

const token = getToken();

export const fetchNarratorsRequest = () => ({
    type: narratorTypes.FETCH_NARRATORS_REQUEST,
})

export const fetchNarratorsAsync = (fetchNarratorsUrl, narratorId = "")  => {
    return dispatch => {
        dispatch(fetchNarratorsRequest);
        instanceLinguoo
            .get(`${fetchNarratorsUrl}/${narratorId}`, {
                headers: {
					'Authorization': `Bearer ${token}`                    
                }
            })
            .then( res => {
                const narrators = res.data;
                dispatch(fetchNarratorsSuccess(narrators)); 
            })
            .catch( err => {
                const errorMessage = err.message;
                dispatch(fetchHorrorMoviesFailure(errorMessage))
            })
    }
}

export const fetchNarratorsSuccess = narrators => ({
    type: narratorTypes.FETCH_NARRATORS_SUCCESS,
    payload: narrators
})

export const fetchNarratorsFailure = errorMessage => ({
    type: narratorTypes.FETCH_NARRATORS_FAILURE,
    payload: errorMessage
})

