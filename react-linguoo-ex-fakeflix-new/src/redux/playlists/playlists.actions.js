import { instanceLinguoo } from "../../axiosInstance";
import { playlistsActionTypes } from "./playlists.types";
import { getToken } from '../../shared/localStorage'

const token = getToken();

export const fetchplaylistsSuccess = (playlists, title) => ({
    type: playlistsActionTypes.FETCH_PLAYLISTS_SUCCESS,
    payload: {playlists, title}
})

export const fetchplaylistsFailure = error => ({
    type: playlistsActionTypes.FETCH_PLAYLISTS_FAILURE,
    payload: error
})

export const fetchplaylistsRequest = () => ({
    type: playlistsActionTypes.FETCH_PLAYLISTS_REQUEST
})

// export const fetchplaylistsAsync = (fetchUrl, playListName)=> {
export const fetchplaylistsAsync = (playListName, title)=> {
    return dispatch => {
        dispatch(fetchplaylistsRequest());
        instanceLinguoo
        // .get(
        //     `${fetchUrl}/${ playListName }`,
        //     {
        //         headers: {
		// 			'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1ZjcyYmI4NWYxMjRlNzhlZjQwZWRhMjEiLCJuYW1lIjoiZnJhbW9zMTExIiwiZW1haWwiOiJmZWRlcmljby5yYW1vczI1NEBnbWFpbC5jb20iLCJfX3YiOjAsIm5ld3NDYXRlZ29yaWVzIjpbXSwiaWF0IjoxNjQ1NjYzNDIyfQ.0lp3omEgpr9cURry70E0BB_ly19UcaR4R8kAOnhyYME'
        //         }
        //     }
        // )
        .get(
            `playlists/${ playListName }`,
            {
                headers: {
					'Authorization': `Bearer ${token}`
                }
            }
        )
        .then( res => {
            const playlists = res.data.map(el => ({
                    idPlayList: el._id,
					id: parseInt(el.item._id.replace(/\D/g,'').slice(6)),
					_id: el.item._id,
					genre_ids: [18],
					name: el.item.title,
					original_name: el.item.title,
					original_language: 'english',
					origin_country: ['CO'],
					backdrop_path: el.item.image,
					first_air_date: el.item.date,
					release_date: el.item.date,
					vote_average: el.item.upVotes,
					overview: el.item.text,
					voteCount: 0,
					isFavourite: true,
					audio: el.item.audio,
					duration: el.item.duration,
					narrator: el.item.narrator._id,			
					plays: el.item.plays,
					upVotes: el.item.upVotes ? el.item.upVotes : 0,
					downVotes: el.item.downVotes ? el.item.downVotes: 0,	
					status: el.item.status,
                    category: el.item.category._id,			
					isLinguoo: true,
                    fromPlaylist: false              
            }));
            // const playlists = res.data;            
            dispatch(fetchplaylistsSuccess(playlists, title));
        })
        .catch( error => {
            const errorMessage = error.message;
            dispatch(fetchplaylistsFailure(errorMessage));
        } )          
    }
}