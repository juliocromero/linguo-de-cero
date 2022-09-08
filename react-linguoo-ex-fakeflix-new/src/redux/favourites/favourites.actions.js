import { instanceLinguoo } from "../../axiosInstance";
import { favouritesActionTypes } from "./favourites.types";
import {  getToken } from '../../shared/localStorage'

const token = getToken();

////OLD
export const addToFavourites = item => ({
    type: favouritesActionTypes.ADD_TO_FAVOURITES,
    payload: {
        ...item,
        isFavourite: true
    }
})

export const removeFromFavourites = item => ({
    type: favouritesActionTypes.REMOVE_FROM_FAVOURITES,
    payload: {
        ...item,
        isFavourite: false
    }
})


////NEW
export const addToFavouritesSuccess = item => ({
    type: favouritesActionTypes.ADD_TO_FAVOURITES_SUCCESS,
    payload: {
        ...item,
        isFavourite: true
    }
})

export const addToFavouritesFailure = errorMessage => ({
    type: favouritesActionTypes.ADD_TO_FAVOURITES_FAILURE,
    payload: errorMessage
})

export const addToFavouritesRequest = () => ({
	type: favouritesActionTypes.ADD_TO_FAVOURITES_REQUEST,
});

// export const addToFavouritesAsync = (itemId, isFavourite) => {
export const addToFavouritesAsync = item => {
    return dispatch => {
        // dispatch(favouritesActionTypes.ADD_TO_FAVOURITES_REQUEST);
        dispatch(addToFavouritesRequest());
        const data = {
            item: item._id,
            name: 'default',
            model: 'news'
        }
        instanceLinguoo
        .post('/playlists', data , {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then( res => {
            const item = res.data;
            dispatch(addToFavouritesSuccess(item));
        })
        .catch( error => {
            const errorMessage = error.message;
            dispatch(addToFavouritesFailure(errorMessage));
        })
    }
}

export const removeFromFavouritesSuccess = item => ({
    type: favouritesActionTypes.REMOVE_FROM_FAVOURITES_SUCCESS,
    payload: {
        ...item,
        isFavourite: false
    }
})

export const removeFromFavouritesFailure = errorMessage => ({
    type: favouritesActionTypes.REMOVE_FROM_FAVOURITES_FAILURE,
    payload: errorMessage    
})

export const removeFromFavouritesRequest = () => ({
	type: favouritesActionTypes.REMOVE_FROM_FAVOURITES_REQUEST,
});

export const removeFromFavouritesAsync = (item, idPlayList) => {
    return dispatch => {
        dispatch(removeFromFavouritesRequest());
        instanceLinguoo
        .delete(`/playlists/default/${idPlayList}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then( () => {
            dispatch(removeFromFavouritesSuccess(item));
        })
        .catch( error => {
            const errorMessage = error.message;
            dispatch(removeFromFavouritesFailure(errorMessage));
        })
    }
}

export const fetchFavouritesSuccess = favourites => ({
    type: favouritesActionTypes.FETCH_FAVOURITES_SUCCESS,
    payload: favourites
})

export const fetchFavouritesFailure = error => ({
    type: favouritesActionTypes.FETCH_FAVOURITES_FAILURE,
    payload: error
})

export const fetchFavouritesRequest = () => ({
    type: favouritesActionTypes.FETCH_FAVOURITES_REQUEST
})

export const fetchFavouritesAsync = ()=> {
    return dispatch => {
        dispatch(fetchFavouritesRequest());
        instanceLinguoo
        .get(
            'playlists/default',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        .then( res => {
            const favourites = res.data.map(el => ({
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
            // const favourites = res.data;            
            dispatch(fetchFavouritesSuccess(favourites));
        })
        .catch( error => {
            const errorMessage = error.message;
            dispatch(fetchFavouritesFailure(errorMessage));
        } )          
    }
}