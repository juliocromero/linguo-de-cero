import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchMovieDataConfig, fetchPopularDataConfig, fetchSeriesDataConfig } from "../dataConfig";
// import { fetchplaylistsAsync } from '../redux/playlists/playlists.actions'; 

export const useRetrieveCategory = (slicedUrl, categoryName, page) => {

	const dispatch = useDispatch();
	const [categoryData, setCategoryData] = useState();

	useEffect(() => {
		let selectedConfigArray = null;
		switch (slicedUrl) {
			case "browse":
			case "movies":
				selectedConfigArray = fetchMovieDataConfig;
				break;
			case "tvseries":
				selectedConfigArray = fetchSeriesDataConfig;
				break;
			case "popular":
				selectedConfigArray = fetchPopularDataConfig;
				break;
			// case "playlistcontent":
			// 	selectedConfigArray = fetchplaylistsAsync;
			// 	break;
			default:
				break;
		}

		// if(slicedUrl !== "playlistcontent"){
			const [data] = selectedConfigArray.filter(el => el.genre === categoryName);
			dispatch(data.thunk(`${data.url}&limit=50&offset=${page}`));
			setCategoryData(data);
		// }
		// else {
		// 	dispatch(selectedConfigArray(categoryName));

		// }

	}, [dispatch, categoryName, slicedUrl, page])

	return categoryData;
}