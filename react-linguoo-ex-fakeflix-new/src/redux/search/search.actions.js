import { searchActionTypes } from "./search.types";
// import axios from "../../axiosInstance";
import {instanceLinguoo } from "../../axiosInstance";
import requests from "../../requests";

export const changeSearchInputValue = inputValue => ({
	type: searchActionTypes.CHANGE_SEARCH_INPUT_VALUE,
	payload: inputValue
})

export const clearSearchInputValue = () => ({
	type: searchActionTypes.CLEAR_SEARCH_INPUT_VALUE
})

export const fetchSearchResultsRequest = searchQuery => ({
	type: searchActionTypes.FETCH_SEARCH_RESULTS_REQUEST,
	payload: searchQuery
})

export const fetchSearchResultsSuccess = searchResults => ({
	type: searchActionTypes.FETCH_SEARCH_RESULTS_SUCCESS,
	payload: searchResults
})

export const fetchSearchResultsFailure = errorMessage => ({
	type: searchActionTypes.FETCH_SEARCH_RESULTS_FAILURE,
	payload: errorMessage
})

// export const fetchSearchResultsAsync = searchQuery => {
// 	return dispatch => {
// 		dispatch(fetchSearchResultsRequest(searchQuery));
// 		axios.get(`${requests.fetchSearchQuery}${searchQuery}`)
// 			.then(response => {
// 				const { data: { results } } = response;
// 				const filteredResults = results.filter(result => result.media_type !== 'person');
// 				dispatch(fetchSearchResultsSuccess(filteredResults));
// 			})
// 			.catch(err => {
// 				dispatch(fetchSearchResultsFailure(err.message));
// 			});
// 	}
// }
export const fetchSearchResultsAsync = searchQuery => {
	return dispatch => {
		dispatch(fetchSearchResultsRequest(searchQuery));
		instanceLinguoo.get(`${requests.fetchSearchArticles}${searchQuery}.*&where[title][$options]=i`)
			.then(res => {
				// const { data: { results } } = response;
				// const { data } = response;
				// const filteredResults = results.filter(result => result.media_type !== 'person');
				// dispatch(fetchSearchResultsSuccess(filteredResults));
				const searchResults = res.data.map(el => ({
					// const idPList = favourites && favourites.length > 0 && 
					// favourites.some(item => item._id == el._id) ? 
					// favourites.filter(item => item._id == el._id)[0].idPlayList : null; 
					// return{
					// ...el,
					// idPlayList: idPList,  
					id: parseInt(el._id.replace(/\D/g,'').slice(6)),
					_id: el._id,
					genre_ids: [18],
					name: el.title,
					original_name: el.title,
					original_language: el.language,
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
					isPlaylist: null,
					fromPlaylist: false
				}));				
				dispatch(fetchSearchResultsSuccess(searchResults));
			})
			.catch(err => {
				dispatch(fetchSearchResultsFailure(err.message));
			});
	}
}