import axios from "../../axiosInstance";
import { instanceLinguoo } from "../../axiosInstance";
import { moviesActionTypes } from "./movies.types";
import {  getToken } from '../../shared/localStorage'
// import { useSelector } from "react-redux";
// import { selectFavouritesList } from "../../redux/favourites/favourites.selectors"

// import { BASE_AUDIOS_URL } from '../../requests';

const token = getToken();

// Action
export const fetchActionMoviesRequest = () => ({
	type: moviesActionTypes.FETCH_ACTION_MOVIES_REQUEST,
});

export const fetchActionMoviesSuccess = (actionMovies, isPage) => ({
	type: isPage
		? moviesActionTypes.FETCH_ACTION_MOVIES_SUCCESS
		: moviesActionTypes.LOAD_MORE_ACTION_MOVIES_SUCCESS,
	payload: actionMovies,
});

export const fetchActionMoviesFailure = error => ({
	type: moviesActionTypes.FETCH_ACTION_MOVIES_FAILURE,
	payload: error,
});

export const updateVotesSuccess = item => ({
	type : moviesActionTypes.UPDATE_VOTES_SUCCESS,
	payload: item
})

export const updatePlaysSuccess = item => ({
	type : moviesActionTypes.UPDATE_PLAYS_SUCCESS,
	payload: item
})

// export const updateVotesFailure = err => ({
// 	type : moviesActionTypes.UPDATE_VOTES_FAILURE,
// 	payload: err
// })


//Technology
// export const fetchActionMoviesAsync = (fetchUrl, isPage, favourites) => {
export const fetchActionMoviesAsync = (fetchUrl, isPage) => {
	// const favourites = favs.map(item => ({category: item.category, _id: item._id, idPlayList: item.idPlayList}))
	// const favourites = [{category: '55de6957b0e835dcde17ad8e', _id: '61426b72a3882cb1220de833', idPlayList: '621d73893289e9261ccc872f'}];
	// const favourites = [];
	// favourites.filter(item => item.category == '55de6957b0e835dcde17ad8e');
	return dispatch => {
		dispatch(fetchActionMoviesRequest());
		// axios
		// 	.get(fetchUrl)
		instanceLinguoo
			.get(`${fetchUrl}&limit=50&offset=0`, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			.then(res => {
				const actionMovies = res.data.map(el => ({
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
				if (isPage) {
					dispatch(fetchActionMoviesSuccess(actionMovies, isPage));
				} else dispatch(fetchActionMoviesSuccess(actionMovies));
			})
			.catch(error => {
				const errorMessage = error.message;
				dispatch(fetchActionMoviesFailure(errorMessage));
			});
	};
};

// Adventure
export const fetchAdventureMoviesRequest = () => ({
	type: moviesActionTypes.FETCH_ADVENTURE_MOVIES_REQUEST,
});

export const fetchAdventureMoviesSuccess = (adventureMovies, isPage) => ({
	type: isPage
        ? moviesActionTypes.FETCH_ADVENTURE_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_ADVENTURE_MOVIES_SUCCESS,
	payload: adventureMovies,
});

export const fetchAdventureMoviesFailure = error => ({
	type: moviesActionTypes.FETCH_ADVENTURE_MOVIES_FAILURE,
	payload: error,
});

export const fetchAdventureMoviesAsync = (fetchUrl, isPage) => {
	return dispatch => {
		dispatch(fetchAdventureMoviesRequest());
		// axios
		// 	.get(fetchUrl)
		instanceLinguoo
			.get(`${fetchUrl}&limit=50&offset=0`, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			.then(res => {
				// const adventureMovies = res.data.results.map(el => ({
				const adventureMovies = res.data.map(el => ({
					// ...el,
					id: parseInt(el._id.replace(/\D/g,'').slice(5)),
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
					fromPlaylist: false
				}));
                if (isPage) {
                    dispatch(fetchAdventureMoviesSuccess(adventureMovies, isPage));
                } else dispatch(fetchAdventureMoviesSuccess(adventureMovies));
			})
			.catch(error => {
				const errorMessage = error.message;
				dispatch(fetchAdventureMoviesFailure(errorMessage));
			});
	};
};

// SplashAnimation
export const fetchAnimationMoviesRequest = () => ({
	type: moviesActionTypes.FETCH_ANIMATION_MOVIES_REQUEST,
});

export const fetchAnimationMoviesSuccess = (animationMovies, isPage) => ({
    type: isPage
        ? moviesActionTypes.FETCH_ANIMATION_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_ANIMATION_MOVIES_SUCCESS,
	payload: animationMovies,
});

export const fetchAnimationMoviesFailure = error => ({
	type: moviesActionTypes.FETCH_ANIMATION_MOVIES_FAILURE,
	payload: error,
});

export const fetchAnimationMoviesAsync = (fetchUrl, isPage) => {
	return dispatch => {
		dispatch(fetchAnimationMoviesRequest());
		// axios
		// 	.get(fetchUrl)
		instanceLinguoo
			.get(`${fetchUrl}&limit=50&offset=0`, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			.then(res => {
				// const animationMovies = res.data.results.map(el => ({
				const animationMovies = res.data.map(el => ({
					// ...el,
					id: parseInt(el._id.replace(/\D/g,'').slice(5)),
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
					fromPlaylist: false
				}));
                if (isPage) {
                    dispatch(fetchAnimationMoviesSuccess(animationMovies, isPage));
                } else dispatch(fetchAnimationMoviesSuccess(animationMovies));
			})
			.catch(error => {
				const errorMessage = error.message;
				dispatch(fetchAnimationMoviesFailure(errorMessage));
			});
	};
};

// Comedy
export const fetchComedyMoviesRequest = () => ({
	type: moviesActionTypes.FETCH_COMEDY_MOVIES_REQUEST,
});

export const fetchComedyMoviesSuccess = (comedyMovies, isPage) => ({
    type: isPage
        ? moviesActionTypes.FETCH_COMEDY_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_COMEDY_MOVIES_SUCCESS,
	payload: comedyMovies,
});

export const fetchComedyMoviesFailure = error => ({
	type: moviesActionTypes.FETCH_COMEDY_MOVIES_FAILURE,
	payload: error,
});

export const fetchComedyMoviesAsync = (fetchUrl, isPage) => {
	return dispatch => {
		dispatch(fetchComedyMoviesRequest());
		// axios
		// 	.get(fetchUrl)
		instanceLinguoo
			.get(`${fetchUrl}&limit=50&offset=0`, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			.then(res => {
				// const comedyMovies = res.data.results.map(el => ({
				const comedyMovies = res.data.map(el => ({
					// ...el,
					id: parseInt(el._id.replace(/\D/g,'').slice(5)),
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
					fromPlaylist: false	
				}));
                if (isPage) {
                    dispatch(fetchComedyMoviesSuccess(comedyMovies, isPage));
                } else dispatch(fetchComedyMoviesSuccess(comedyMovies));
			})
			.catch(error => {
				const errorMessage = error.message;
				dispatch(fetchComedyMoviesFailure(errorMessage));
			});
	};
};

// Horror
export const fetchHorrorMoviesRequest = () => ({
	type: moviesActionTypes.FETCH_HORROR_MOVIES_REQUEST,
});

export const fetchHorrorMoviesSuccess = (horrorMovies, isPage) => ({
    type: isPage
        ? moviesActionTypes.FETCH_HORROR_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_HORROR_MOVIES_SUCCESS,
	payload: horrorMovies,
});

export const fetchHorrorMoviesFailure = error => ({
	type: moviesActionTypes.FETCH_HORROR_MOVIES_FAILURE,
	payload: error,
});

export const fetchHorrorMoviesAsync = (fetchUrl, isPage) => {
	return dispatch => {
		dispatch(fetchHorrorMoviesRequest());
		// axios
		// 	.get(fetchUrl)
		instanceLinguoo
			.get(`${fetchUrl}&limit=50&offset=0`, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			.then(res => {
				// const horrorMovies = res.data.results.map(el => ({
				const horrorMovies = res.data.map(el => ({
					// ...el,
					id: parseInt(el._id.replace(/\D/g,'').slice(5)),
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
					fromPlaylist: false				
				}));
                if (isPage) {
                    dispatch(fetchHorrorMoviesSuccess(horrorMovies, isPage));
                } else dispatch(fetchHorrorMoviesSuccess(horrorMovies));
			})
			.catch(error => {
				const errorMessage = error.message;
				dispatch(fetchHorrorMoviesFailure(errorMessage));
			});
	};
};

// Netflix
export const fetchNetflixMoviesRequest = () => ({
	type: moviesActionTypes.FETCH_NETFLIX_MOVIES_REQUEST,
});

export const fetchNetflixMoviesSuccess = (netflixMovies, isPage) => ({
    type: isPage
        ? moviesActionTypes.FETCH_NETFLIX_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_NETFLIX_MOVIES_SUCCESS,
	payload: netflixMovies,
});

export const fetchNetflixMoviesFailure = error => ({
	type: moviesActionTypes.FETCH_NETFLIX_MOVIES_FAILURE,
	payload: error,
});

export const fetchNetflixMoviesAsync = (fetchUrl, isPage) => {
	return dispatch => {
		dispatch(fetchNetflixMoviesRequest());
		axios
			.get(fetchUrl)
			.then(res => {
				const netflixMovies = res.data.results.map(el => ({
					...el,
					isFavourite: false,
				}));
                if (isPage) {
                    dispatch(fetchNetflixMoviesSuccess(netflixMovies, isPage));
                } else dispatch(fetchNetflixMoviesSuccess(netflixMovies));
			})
			.catch(error => {
				const errorMessage = error.message;
				dispatch(fetchNetflixMoviesFailure(errorMessage));
			});
	};
};

// Romance
export const fetchRomanceMoviesRequest = () => ({
	type: moviesActionTypes.FETCH_ROMANCE_MOVIES_REQUEST,
});

export const fetchRomanceMoviesSuccess = (romanceMovies, isPage) => ({
    type: isPage
        ? moviesActionTypes.FETCH_ROMANCE_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_ROMANCE_MOVIES_SUCCESS,
	payload: romanceMovies,
});

export const fetchRomanceMoviesFailure = error => ({
	type: moviesActionTypes.FETCH_ROMANCE_MOVIES_FAILURE,
	payload: error,
});

export const fetchRomanceMoviesAsync = (fetchUrl, isPage) => {
	return dispatch => {
		dispatch(fetchRomanceMoviesRequest());
		// axios
		// 	.get(fetchUrl)
		instanceLinguoo
			.get(`${fetchUrl}&limit=50&offset=0`, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			.then(res => {
				// const romanceMovies = res.data.results.map(el => ({
				const romanceMovies = res.data.map(el => ({
					// ...el,
					id: parseInt(el._id.replace(/\D/g,'').slice(5)),
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
					fromPlaylist: false		
				}));
                if (isPage) {
                    dispatch(fetchRomanceMoviesSuccess(romanceMovies, isPage));
                } else dispatch(fetchRomanceMoviesSuccess(romanceMovies));
			})
			.catch(error => {
				const errorMessage = error.message;
				dispatch(fetchRomanceMoviesFailure(errorMessage));
			});
	};
};

// Top Rated
export const fetchTopRatedMoviesRequest = () => ({
	type: moviesActionTypes.FETCH_TOP_RATED_MOVIES_REQUEST,
});

export const fetchTopRatedMoviesSuccess = (topRatedMovies, isPage) => ({
    type: isPage
        ? moviesActionTypes.FETCH_TOP_RATED_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_TOP_RATED_MOVIES_SUCCESS,
	payload: topRatedMovies,
});

export const fetchTopRatedMoviesFailure = error => ({
	type: moviesActionTypes.FETCH_TOP_RATED_MOVIES_FAILURE,
	payload: error,
});

//Linguoo Playlists
export const fetchTopRatedMoviesAsync = (fetchUrl, isPage) => {
	return dispatch => {
		dispatch(fetchTopRatedMoviesRequest());
		// axios
		instanceLinguoo
			.get(`${fetchUrl}&limit=50&offset=0`, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			.then(res => {
				const topRatedMovies = res.data.map(el => ({
					id: parseInt(el._id.replace(/\D/g,'').slice(4)),
					genre_ids: [18],
					name: el.name,
					original_name: el.name,
					origin_country: ['CO'],
					backdrop_path: el.image,
					first_air_date: '2003-10-21',
					// overview: '',
					voteCount: 0,
					isFavourite: false,
					isLinguoo: true,
					playListName: el.playlistName,
					isPlaylist: true,
					fromPlaylist: false
				}));
                if (isPage) {
                    dispatch(fetchTopRatedMoviesSuccess(topRatedMovies, isPage));
                } else dispatch(fetchTopRatedMoviesSuccess(topRatedMovies));
			})
			.catch(error => {
				const errorMessage = error.message;
				dispatch(fetchTopRatedMoviesFailure(errorMessage));
			});
	};
};

// Trending
export const fetchTrendingMoviesRequest = () => ({
	type: moviesActionTypes.FETCH_TRENDING_MOVIES_REQUEST,
});

export const fetchTrendingMoviesSuccess = (trendingMovies, isPage) => ({
    type: isPage
        ? moviesActionTypes.FETCH_TRENDING_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_TRENDING_MOVIES_SUCCESS,
	payload: trendingMovies,
});

export const fetchTrendingMoviesFailure = error => ({
	type: moviesActionTypes.FETCH_TRENDING_MOVIES_FAILURE,
	payload: error,
});

//World Category
export const fetchTrendingMoviesAsync = (fetchUrl, isPage) => {
	return dispatch => {
		dispatch(fetchTrendingMoviesRequest());
		// axios
		// 	.get(fetchUrl)
		instanceLinguoo
			.get(`${fetchUrl}&limit=50&offset=0`, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			.then(res => {
				const trendingMovies = res.data.map(el => ({
					// ...el,
					id: parseInt(el._id.replace(/\D/g,'').slice(5)),
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
					articleTrackingProgress: 0,
					isLinguoo: true,
					fromPlaylist: false
				}));
                if (isPage) {
                    dispatch(fetchTrendingMoviesSuccess(trendingMovies, isPage));
                } else dispatch(fetchTrendingMoviesSuccess(trendingMovies));
			})
			.catch(error => {
				const errorMessage = error.message;
				dispatch(fetchTrendingMoviesFailure(errorMessage));
			});
	};
};

// Upcoming
export const fetchUpcomingMoviesRequest = () => ({
	type: moviesActionTypes.FETCH_UPCOMING_MOVIES_REQUEST,
});

export const fetchUpcomingMoviesSuccess = (upcomingMovies, isPage) => ({
    type: isPage
        ? moviesActionTypes.FETCH_UPCOMING_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_UPCOMING_MOVIES_SUCCESS,
	payload: upcomingMovies,
});

export const fetchUpcomingTrendingMoviesFailure = error => ({
	type: moviesActionTypes.FETCH_UPCOMING_MOVIES_FAILURE,
	payload: error,
});

export const fetchUpcomingMoviesAsync = (fetchUrl, isPage) => {
	return dispatch => {
		dispatch(fetchUpcomingMoviesRequest());
		// axios
		// 	.get(fetchUrl)
		instanceLinguoo
			.get(`${fetchUrl}&limit=50&offset=0`, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			.then(res => {
				// const upcomingMovies = res.data.results.map(el => ({
				const upcomingMovies = res.data.map(el => ({
					// ...el,
					id: parseInt(el._id.replace(/\D/g,'').slice(5)),
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
					fromPlaylist: false
				}));
                if (isPage) {
                    dispatch(fetchUpcomingMoviesSuccess(upcomingMovies, isPage));
                } else dispatch(fetchUpcomingMoviesSuccess(upcomingMovies));
			})
			.catch(error => {
				const errorMessage = error.message;
				dispatch(fetchUpcomingTrendingMoviesFailure(errorMessage));
			});
	};
};

export const fetchRecentLastRequest = () => ({
	type: moviesActionTypes.FETCH_RECENTLAST_MOVIES_REQUEST
});

export const fetchRecentLastSuccess = (RecentLast, isPage) => ({
    type: isPage
        ? moviesActionTypes.FETCH_RECENTLAST_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_RECENTLAST_MOVIES_SUCCESS,
	payload: RecentLast,
});

export const fetchRecentLastMoviesFailure = error => ({
	type: moviesActionTypes.FETCH_RECENTLAST_MOVIES_FAILURE,
	payload: error,
});

export const fetchRecentLastAsync = (fetchUrl, isPage) => {
	return dispatch => {
		dispatch(fetchRecentLastRequest());
		// axios
		// 	.get(fetchUrl)
		instanceLinguoo
			.get(`${fetchUrl}&limit=50&offset=0`, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			.then(res => {
				// const RecentLast = res.data.results.map(el => ({
				const RecentLast = res.data.map(el => ({
					id: parseInt(el._id.replace(/\D/g,'').slice(5)),
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
					articleTrackingProgress: 0,
					isLinguoo: true,
					idList: 12,
					fromPlaylist: false
				}));
                if (isPage) {
                    dispatch(fetchRecentLastSuccess(RecentLast, isPage));
                } else dispatch(fetchRecentLastSuccess(RecentLast));
			})
			.catch(error => {
				const errorMessage = error.message;
				dispatch(fetchRecentLastMoviesFailure(errorMessage));
			});
	};
};

// Latest
export const fetchLatestMoviesRequest = () => ({
	type: moviesActionTypes.FETCH_LATEST_MOVIES_REQUEST,
});

export const fetchLatestMoviesSuccess = (latestMovies, isPage) => ({
    type: isPage
        ? moviesActionTypes.FETCH_LATEST_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_LATEST_MOVIES_SUCCESS,
	payload: latestMovies,
});

export const fetchLatestTrendingMoviesFailure = error => ({
	type: moviesActionTypes.FETCH_LATEST_MOVIES_FAILURE,
	payload: error,
});

export const fetchLatestMoviesAsync = (fetchUrl, isPage) => {
	return dispatch => {
		dispatch(fetchLatestMoviesRequest());
		axios
			.get(fetchUrl)
			.then(res => {
				const latestMovies = res.data.results.map(el => ({
					...el,
					isFavourite: false,
				}));
                if (isPage) {
                    dispatch(fetchLatestMoviesSuccess(latestMovies, isPage));
                } else dispatch(fetchLatestMoviesSuccess(latestMovies));
			})
			.catch(error => {
				const errorMessage = error.message;
				dispatch(fetchLatestTrendingMoviesFailure(errorMessage));
			});
	};
};
