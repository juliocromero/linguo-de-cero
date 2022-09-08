import requests from "./requests";
import * as movieSelectors from "./redux/movies/movies.selectors";
import * as seriesSelectors from "./redux/series/series.selectors";
import * as playlistSelectors from "./redux/playlists/playlists.selectors";
import {
	// fetchContinueListeningAudiosAsync,
	fetchActionMoviesAsync,
	fetchAdventureMoviesAsync,
	fetchAnimationMoviesAsync,
	fetchComedyMoviesAsync,
	fetchHorrorMoviesAsync,
	fetchLatestMoviesAsync,
	// fetchNetflixMoviesAsync,
	fetchRomanceMoviesAsync,
	fetchTopRatedMoviesAsync,
	fetchTrendingMoviesAsync,
	fetchUpcomingMoviesAsync,
	fetchRecentLastAsync
} from "./redux/movies/movies.actions";
import {
	fetchActionAdventureSeriesAsync,
	fetchAnimationSeriesAsync,
	fetchComedySeriesAsync,
	fetchCrimeSeriesAsync,
	fetchDocumentarySeriesAsync,
	fetchFamilySeriesAsync,
	fetchKidsSeriesAsync,
	fetchNetflixSeriesAsync,
	fetchSciFiFantasySeriesAsync,
	fetchTrendingSeriesAsync,
} from "./redux/series/series.actions";

import { fetchplaylistsAsync } from "./redux/playlists/playlists.actions";

const {
	// fetchContinueListening,
	fetchReleasedMoviesByOneMonth,
	fetchTrendingMovies,
	fetchNetflixOriginals,
	fetchTopRated,
	fetchActionMovies,
	fetchAdventureMovies,
	fetchComedyMovies,
	fetchHorrorMovies,
	fetchRomanceMovies,
	fetchAnimationMovies,
	fetchUpcomingMovies,
	fetchActionAdventureSeries,
	fetchAnimationSeries,
	fetchComedySeries,
	fetchCrimeSeries,
	fetchDocumentarySeries,
	fetchFamilySeries,
	fetchKidsSeries,
	fetchSciFiFantasySeries,
	fetchTrendingSeries,
	fetchRecentLastAudios
} = requests;

export const fetchMovieDataConfig = [
	// {
	// 	id: 0,
	// 	thunk: fetchTopRatedMoviesAsync,
	// 	url: fetchTopRated,
	// 	title: "Top Rated on Fakeflix",
	// 	genre: "toprated",
	// 	selector: movieSelectors.selectTopRatedMovies,
	// },
	{
		id: 0,
		thunk: fetchTopRatedMoviesAsync,
		url: fetchTopRated,
		title: "Playlists",
		genre: "toprated",
		selector: movieSelectors.selectTopRatedMovies,
		// selector: undefined,
	},
	// {
	// 	id: 10,
	// 	thunk: fetchContinueListeningAudiosAsync,
	// 	// url: fetchContinueListening,
	// 	title: "Continue listening",
	// 	genre: "continuelistening",
	// 	categoryId: "000",
	// 	selector: movieSelectors.selectContinueListeningAudios,
	// },
	{
		id: 12,
		thunk: fetchRecentLastAsync,
		url: fetchRecentLastAudios,
		// title: "55de6957b0e835dcde17ad90",
		// genre: "fakeflix",
		title: "Recent Latest",
		genre: "latestrecent",
		categoryid: "",
		// categoryid: "56b286169ffe12f8618198e3",
		selector: movieSelectors.selectRecentLastAudios,
		// isLarge: true,
	},	
	{
		id: 1,
		thunk: fetchTrendingMoviesAsync,
		url: fetchTrendingMovies,
		// title: "Trending Now",
		// genre: "trending",
		// title: "Audiobooks",
		title: "Audiobooks",
		genre: "audiobooks",
		// categoryid: "55de6957b0e835dcde17ad8f", // World
		categoryid: "56b286169ffe12f8618198e3",
		selector: movieSelectors.selectTrendingMovies,
	},
	{
		id: 2,
		thunk: fetchActionMoviesAsync,
		url: fetchActionMovies,
		title: "Technology",
		genre: "technology",
		categoryid: "55de6957b0e835dcde17ad8e",
		selector: movieSelectors.selectActionMovies,
	},
	{
		id: 8,
		thunk: fetchUpcomingMoviesAsync,
		// url: fetchUpcomingMovies,
		// title: "Upcoming",
		url: fetchUpcomingMovies,
		title: "Entertainment",
		genre: "upcoming",
		categoryid: "55de6957b0e835dcde17ad90",
		selector: movieSelectors.selectUpcomingMovies,
	},
	{
		id: 3,
		thunk: fetchAdventureMoviesAsync,
		url: fetchAdventureMovies,
		// title: "Adventure",
		// genre: "adventure",
		title: "Health & Sports",
		genre: "adventure",
		categoryid: "55de6957b0e835dcde17ad91",
		selector: movieSelectors.selectAdventureMovies,
	},
	{
		id: 4,
		thunk: fetchComedyMoviesAsync,
		url: fetchComedyMovies,
		// title: "Comedy",
		// genre: "comedy",
		title: "Culture",
		genre: "comedy",
		categoryid: "55de6957b0e835dcde17ad92",
		selector: movieSelectors.selectComedyMovies,
	},
	{
		id: 5,
		thunk: fetchHorrorMoviesAsync,
		url: fetchHorrorMovies,
		title: "Entrepreneurship",
		genre: "horror",
		categoryId: "55de6957b0e835dcde17ad93",		
		selector: movieSelectors.selectHorrorMovies,
	},
	{
		id: 6,
		thunk: fetchRomanceMoviesAsync,
		url: fetchRomanceMovies,
		// title: "Romance",
		// genre: "romance",
		title: "Inspirational",
		genre: "romance",
		categoryid: "55de6957b0e835dcde17ad94",
		selector: movieSelectors.selectRomanceMovies,
	},
	{
		id: 7,
		thunk: fetchAnimationMoviesAsync,
		url: fetchAnimationMovies,
		// title: "Animation",
		// genre: "animation",
		title: "Lifestyle",
		genre: "animation",
		categoryid: "55de6957b0e835dcde17ad95",
		selector: movieSelectors.selectAnimationMovies,
	},
	// {
	// 	id: 9,
	// 	thunk: fetchNetflixMoviesAsync,
	// 	url: fetchNetflixOriginals,
	// 	// title: "55de6957b0e835dcde17ad90",
	// 	// genre: "fakeflix",
	// 	title: "Fakeflix Originals",
	// 	genre: "fakeflix",
	// 	categoryid: "",
	// 	selector: movieSelectors.selectNetflixMovies,
	// 	isLarge: true,
	// },

];

export const fetchSeriesDataConfig = [
	{
		id: 0,
		thunk: fetchTrendingSeriesAsync,
		url: fetchTrendingSeries,
		title: "Trending Now",
		genre: "trending",
		selector: seriesSelectors.selectTrendingSeries,
	},
	{
		id: 1,
		thunk: fetchNetflixSeriesAsync,
		url: fetchNetflixOriginals,
		title: "Fakeflix Originals",
		genre: "fakeflix",
		selector: seriesSelectors.selectNetflixSeries,
		isLarge: true,
	},
	{
		id: 2,
		thunk: fetchActionAdventureSeriesAsync,
		url: fetchActionAdventureSeries,
		title: "Action & Adventure",
		genre: "actionadventure",
		selector: seriesSelectors.selectActionAdventureSeries,
	},
	{
		id: 3,
		thunk: fetchAnimationSeriesAsync,
		url: fetchAnimationSeries,
		title: "Animation",
		genre: "animation",
		selector: seriesSelectors.selectAnimationSeries,
	},
	{
		id: 4,
		thunk: fetchComedySeriesAsync,
		url: fetchComedySeries,
		title: "Comedy",
		genre: "comedy",
		selector: seriesSelectors.selectComedySeries,
	},
	{
		id: 5,
		thunk: fetchCrimeSeriesAsync,
		url: fetchCrimeSeries,
		title: "Crime",
		genre: "crime",
		selector: seriesSelectors.selectCrimeSeries,
	},
	{
		id: 6,
		thunk: fetchDocumentarySeriesAsync,
		url: fetchDocumentarySeries,
		title: "Documentary",
		genre: "documentary",
		selector: seriesSelectors.selectDocumentarySeries,
	},
	{
		id: 7,
		thunk: fetchFamilySeriesAsync,
		url: fetchFamilySeries,
		title: "Family",
		genre: "family",
		selector: seriesSelectors.selectFamilySeries,
	},
	{
		id: 8,
		thunk: fetchKidsSeriesAsync,
		url: fetchKidsSeries,
		title: "Kids",
		genre: "kids",
		selector: seriesSelectors.selectKidsSeries,
	},
	{
		id: 9,
		thunk: fetchSciFiFantasySeriesAsync,
		url: fetchSciFiFantasySeries,
		title: "Sci-Fi & Fantasy",
		genre: "scififantasy",
		selector: seriesSelectors.selectSciFiFantasySeries,
	},
];

export const fetchPopularDataConfig = [
	{
		id: 0,
		thunk: fetchTopRatedMoviesAsync,
		url: fetchTopRated,
		title: "Top Rated in your country",
		genre: "toprated",
		selector: movieSelectors.selectTopRatedMovies,
	},
	{
		id: 1,
		thunk: fetchLatestMoviesAsync,
		url: fetchReleasedMoviesByOneMonth,
		title: "New on Fakeflix",
		genre: "newin",
		selector: movieSelectors.selectLatestMovies,
	},
	{
		id: 2,
		thunk: fetchUpcomingMoviesAsync,
		url: fetchUpcomingMovies,
		title: "Upcoming",
		genre: "upcoming",
		selector: movieSelectors.selectUpcomingMovies,
	},
];

export const fetchPlayListContentDataConfig = [
	{
		id: 1,
		thunk: fetchplaylistsAsync,
		url: '/playlist',
		selector: playlistSelectors.selectPlaylistsList,
	}
]

export const genresList = [
	{
		id: 28,
		name: "Action",
	},
	{
		id: 12,
		name: "Adventure",
	},
	{
		id: 16,
		name: "Animation",
	},
	{
		id: 35,
		name: "Comedy",
	},
	{
		id: 80,
		name: "Crime",
	},
	{
		id: 99,
		name: "Documentary",
	},
	{
		id: 18,
		name: "Drama",
	},
	{
		id: 10751,
		name: "Family",
	},
	{
		id: 14,
		name: "Fantasy",
	},
	{
		id: 36,
		name: "History",
	},
	{
		id: 27,
		name: "Horror",
	},
	{
		id: 10402,
		name: "Music",
	},
	{
		id: 9648,
		name: "Mystery",
	},
	{
		id: 10749,
		name: "Romance",
	},
	{
		id: 878,
		name: "Science Fiction",
	},
	{
		id: 10770,
		name: "TV Movie",
	},
	{
		id: 53,
		name: "Thriller",
	},
	{
		id: 10752,
		name: "War",
	},
	{
		id: 37,
		name: "Western",
	},
	{
		id: 10759,
		name: "Action & Adventure",
	},
	{
		id: 10762,
		name: "Kids",
	},
	{
		id: 10763,
		name: "News",
	},
	{
		id: 10764,
		name: "Reality",
	},
	{
		id: 10765,
		name: "Sci-Fi & Fantasy",
	},
	{
		id: 10766,
		name: "Soap",
	},
	{
		id: 10767,
		name: "Talk",
	},
	{
		id: 10768,
		name: "War & Politics",
	},
];