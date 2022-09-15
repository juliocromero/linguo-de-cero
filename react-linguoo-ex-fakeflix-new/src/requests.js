import { getOneMonthAgoReleaseDate } from "./utils";

export const GITHUB_BASE_URL = "https://github.com/Th3Wall";
export const GITHUB_AVATAR_URL = "https://avatars.githubusercontent.com/u/25078541?v=4";
const GITHUB_ASSETS_BASE_URL = "https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Fakeflix";
export const LANG = "en-US";
export const REGION = "US";
export const BASE_IMG_URL = "https://image.tmdb.org/t/p/original";
export const BASE_AUDIOS_URL = "https://s3-us-west-1.amazonaws.com/audionews/";
export const FALLBACK_IMG_URL = `${GITHUB_ASSETS_BASE_URL}/Fakeflix_readme.png`;
// export const LOGO_URL = `${GITHUB_ASSETS_BASE_URL}/Fakeflix_logo.png`;
// export const LOGO_URL = `https://imgnews.s3.us-west-1.amazonaws.com/linguoologo.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXNhLWVhc3QtMSJHMEUCIFhHScYrelI64aAmpQ%2F%2BaEXUG04A0dslwkdnTQdVvLsaAiEAqHETuUGXjHfjP54kWwQ7hcflImSMSXA5GKXyfkaBtKgqngIIsf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARADGgw5Mzg5Njg3MTgzMjUiDEiG29FWmZLdsFLbOSryAXQDS%2Baxo9olAcXJGWgewVefuSUBcT%2FoWgpuK0%2BtQSFZO3aI1qYkef%2BjzL4kdTEVkytgBM58YgLk1MfVKkSTWnEDxA3Oa%2BtRn%2B9zkNDJa4Ur%2FptVD%2BjoK7bLyCaoaner4CypS4f5CY3OZSObvAxoxPwo4BR8vVPpjGVAFWanOxrvh9efsO%2Fhi2ztlkDGeqelJimY6pU%2FV7Hw1gnsnQKEJ05NWAs8i8fcdYhzQiL9nUzdMMPlgYT9tGHp7TbjDCzm%2Bb0GMnKZwjE9CC13uKyG4e%2BXPn5S4UDlvN0zHFTczUYt8eocxNjWTbk887ef4GwmYWW0MLbBmpEGOt8ByV%2BpqMeugxb0LqL%2BzZ%2FRCgX3Ug9RGmBHKMCkE%2F9GKPCuv3ZkssWuU6TzAIyfwbbg5CtVIb9iFWol%2BqqgKs769QenuMiIx2eg5ECPButIssTtyQER4zpOylQGlcUb%2FAIFJHVeaUhea8vIDsboe7BLPz8UmUReBnqvj7UwAwbH1LuZWMv0gQFaRWq3qk8nIoBgtu2o24UtuNGTrIRSzXG8T63cgzj3uuEwjmDqrrRl%2BimYLGK6EzrNHmzcMmrfoHOBmLs7jvrCwv90uTaIzeKJ1q79qjXK3St2i65Iuxog1g%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220308T002605Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA5VHXFTP2S3Q4CXAO%2F20220308%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=fae4d54097d744fe4afe610caa2200b8c4c6adbf9ed49c5dbbcd4b15cf6f28f9`;
// export const LOGO_URL = `https://imgnews.s3.us-west-1.amazonaws.com/linguoologo1.png`;
// export const LOGO_URL = `https://imgnews.s3.us-west-1.amazonaws.com/linguoologo1.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEkaCXNhLWVhc3QtMSJHMEUCIFhHScYrelI64aAmpQ%2F%2BaEXUG04A0dslwkdnTQdVvLsaAiEAqHETuUGXjHfjP54kWwQ7hcflImSMSXA5GKXyfkaBtKgqngIIsf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARADGgw5Mzg5Njg3MTgzMjUiDEiG29FWmZLdsFLbOSryAXQDS%2Baxo9olAcXJGWgewVefuSUBcT%2FoWgpuK0%2BtQSFZO3aI1qYkef%2BjzL4kdTEVkytgBM58YgLk1MfVKkSTWnEDxA3Oa%2BtRn%2B9zkNDJa4Ur%2FptVD%2BjoK7bLyCaoaner4CypS4f5CY3OZSObvAxoxPwo4BR8vVPpjGVAFWanOxrvh9efsO%2Fhi2ztlkDGeqelJimY6pU%2FV7Hw1gnsnQKEJ05NWAs8i8fcdYhzQiL9nUzdMMPlgYT9tGHp7TbjDCzm%2Bb0GMnKZwjE9CC13uKyG4e%2BXPn5S4UDlvN0zHFTczUYt8eocxNjWTbk887ef4GwmYWW0MLbBmpEGOt8ByV%2BpqMeugxb0LqL%2BzZ%2FRCgX3Ug9RGmBHKMCkE%2F9GKPCuv3ZkssWuU6TzAIyfwbbg5CtVIb9iFWol%2BqqgKs769QenuMiIx2eg5ECPButIssTtyQER4zpOylQGlcUb%2FAIFJHVeaUhea8vIDsboe7BLPz8UmUReBnqvj7UwAwbH1LuZWMv0gQFaRWq3qk8nIoBgtu2o24UtuNGTrIRSzXG8T63cgzj3uuEwjmDqrrRl%2BimYLGK6EzrNHmzcMmrfoHOBmLs7jvrCwv90uTaIzeKJ1q79qjXK3St2i65Iuxog1g%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220308T003219Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA5VHXFTP2S3Q4CXAO%2F20220308%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=0140205bccb1741e94f8a7034ef42994344d71e0025276ac2f601b528182a2d9`;
// export const LOGO_URL = process.env.PUBLIC_URL + '/linguoologo1.png';
export const LOGO_URL = process.env.PUBLIC_URL + '/logolinguoopositivo.png';
export const HOME = process.env.PUBLIC_URL + '/home_1.svg';
export const PLAYLIST = process.env.PUBLIC_URL +'playlist_play_black_36dp.svg';
export const CONOCENOS = process.env.PUBLIC_URL   + 'face_black_36dp.svg';
export const CORAZON = process.env.PUBLIC_URL   + 'corazon.svg';
export const DOWLOAND = process.env.PUBLIC_URL + 'download.svg'
export const BACKGROUND_BANER_URL = process.env.PUBLIC_URL + '/linguoolog.png';
export const BACKGROUND_LOGIN_URL = process.env.PUBLIC_URL + '/spacelinguoo.jpg';
// export const BACKGROUND_BANER_URL = process.env.PUBLIC_URL + '/Sintítulo.png';
// export const MOBILE_LOGO_URL = `${GITHUB_ASSETS_BASE_URL}/Fakeflix_favicon_192.png`;
export const MOBILE_LOGO_URL = process.env.PUBLIC_URL + '/IsoLinguoo-06.png';
// export const PROFILE_PIC_URL = `${GITHUB_ASSETS_BASE_URL}/Fakeflix_profilepic.png`;
// export const PROFILE_PIC_URL = process.env.PUBLIC_URL + '/UserLinguoo-09.png';
export const PROFILE_PIC_URL = process.env.PUBLIC_URL + '/ONBJXO1-03.png';
// export const PROFILE_PIC_URL = process.env.PUBLIC_URL + '/ONBJXO1-02.png';
export const SIGNIN_BGIMG_URL = `${GITHUB_ASSETS_BASE_URL}/Fakeflix_auth_bg.jpg`;
export const TADUM_SOUND_URL = `${GITHUB_ASSETS_BASE_URL}/Fakeflix_TaDum.mp3`;
const ONEMONTHAGO = getOneMonthAgoReleaseDate();
const { REACT_APP_API_KEY } = process.env;

const requests = {
	fetchSearchArticles: `/news?limit=50&offset=0&populate[0]=narrator&where[title][$regex]=.*`,
	fetchSearchQuery: `/search/multi?api_key=${REACT_APP_API_KEY}&language=${LANG}&query=`,
	fetchTrendingAll: `/trending/all/week?api_key=${REACT_APP_API_KEY}&sort_by=popularity.desc&language=${LANG}`,
	fetchReleasedMoviesByOneMonth: `/discover/movie?api_key=${REACT_APP_API_KEY}&primary_release_date.gte=${ONEMONTHAGO}&sort_by=popularity.desc&language=${LANG}`,
    // Movies
	//Category World
	// fetchTrendingMovies: `/trending/movies/week?api_key=${REACT_APP_API_KEY}&sort_by=popularity.desc&language=${LANG}`,
	// fetchTrendingMovies: `/news?limit=30&offset=0&populate[0]=narrator&where[category]=55de6957b0e835dcde17ad8f`,
	//Category Audiobooks
	fetchNarrators: `/narrators`,
	// fetchTrendingMovies: `/news?limit=50&offset=0&populate[0]=narrator&where[category]=56b286169ffe12f8618198e3`,
	// fetchTrendingMovies: `/news?&populate[0]=narrator&where[category]=56b286169ffe12f8618198e3&limit=50&offset=0`,
	fetchTrendingMovies: `/news?populate[0]=narrator&where[category]=56b286169ffe12f8618198e3`,
	// fetchTrendingMovies: `/news?limit=30&offset=0&populate[0]=narrator`,
	//Category Entertainment
	// fetchUpcomingMovies: `/movie/upcoming?api_key=${REACT_APP_API_KEY}&language=${LANG}`,
	// fetchUpcomingMovies: `/news?limit=30&offset=0&populate[0]=narrator&where[category]=55de6957b0e835dcde17ad90`,
	// fetchUpcomingMovies: `/news?populate[0]=narrator&where[category]=55de6957b0e835dcde17ad90&limit=50&offset=0`,
	fetchUpcomingMovies: `/news?populate[0]=narrator&where[category]=55de6957b0e835dcde17ad90`,
	//Category RecentLast
	// fetchUpcomingMovies: `/movie/upcoming?api_key=${REACT_APP_API_KEY}&language=${LANG}`,
	// fetchRecentLastAudios: `/news?limit=30&offset=0&populate[0]=narrator`,
	// fetchRecentLastAudios: `/news?populate[0]=narrator&limit=50&offset=0`,
	fetchRecentLastAudios: `/news?populate[0]=narrator`,
	// fetchTopRated: `/movie/top_rated?api_key=${REACT_APP_API_KEY}&sort_by=popularity.desc&region=${REGION}`,
	fetchTopRated: `/playlist-infos?where[language]=es`,
	//Category Technology
	// fetchActionMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=28&sort_by=popularity.desc&language=${LANG}`,
	fetchActionMovies: `/news?populate[0]=narrator&where[category]=55de6957b0e835dcde17ad8e`,
	//
	// fetchAdventureMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=12&sort_by=popularity.desc&language=${LANG}`,
	// fetchAdventureMovies: `/news?limit=30&offset=0&populate[0]=narrator&where[category]=55de6957b0e835dcde17ad91`,
	// fetchAdventureMovies: `/news?populate[0]=narrator&where[category]=55de6957b0e835dcde17ad91&limit=50&offset=0`,
	fetchAdventureMovies: `/news?populate[0]=narrator&where[category]=55de6957b0e835dcde17ad91`,
	//Culture
	// fetchComedyMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=35&sort_by=popularity.desc&language=${LANG}`,
	fetchComedyMovies: `/news?populate[0]=narrator&where[category]=55de6957b0e835dcde17ad92`,
	//Entrepreneurial
	// fetchHorrorMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=27&sort_by=popularity.desc&language=${LANG}`,
	fetchHorrorMovies: `/news?populate[0]=narrator&where[category]=55de6957b0e835dcde17ad93`,
	// fetchHorrorMovies: `/news?limit=980&offset=0&populate[0]=narrator&where[category]=55de6957b0e835dcde17ad93`,
	//Inspirational
	// fetchRomanceMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=10749&sort_by=popularity.desc&language=${LANG}`,
	fetchRomanceMovies: `/news?populate[0]=narrator&where[category]=55de6957b0e835dcde17ad94`,
	fetchWarMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=10752&sort_by=popularity.desc&language=${LANG}`,
	//Lifestyle
	// fetchAnimationMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=16&sort_by=popularity.desc&language=${LANG}`,
	fetchAnimationMovies: `/news?populate[0]=narrator&where[category]=55de6957b0e835dcde17ad95`,
	discoverMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&sort_by=popularity.desc&language=${LANG}`,
    // Series
	discoverSeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&sort_by=popularity.desc&language=${LANG}`,
	fetchTrendingSeries: `/trending/tv/week?api_key=${REACT_APP_API_KEY}&sort_by=popularity.desc&language=${LANG}`,
	fetchNetflixOriginals: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_networks=213&sort_by=popularity.desc&language=${LANG}`,
	// fetchNetflixOriginals: `/news?limit=30&offset=0&populate[0]=narrator&where[category]=55de6957b0e835dcde17ad90`,
	fetchActionAdventureSeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=10759&sort_by=popularity.desc&language=${LANG}`,
	// fetchActionAdventureSeries: `/news?limit=30&offset=0&populate[0]=narrator&where[category]=55de6957b0e835dcde17ad90`,
	fetchAnimationSeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=16&sort_by=popularity.desc&language=${LANG}`,
	fetchComedySeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=35&sort_by=popularity.desc&language=${LANG}`,
	fetchCrimeSeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=80&sort_by=popularity.desc&language=${LANG}`,
	fetchDocumentarySeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=99&sort_by=popularity.desc&language=${LANG}`,
	fetchFamilySeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=10751&sort_by=popularity.desc&language=${LANG}`,
	fetchKidsSeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=10762&sort_by=popularity.desc&language=${LANG}`,
	fetchSciFiFantasySeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=10765&sort_by=popularity.desc&language=${LANG}`,
};

export default requests;
