import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchPlayListContentDataConfig } from '../dataConfig';

export const useRetrievePlayListContent = (playListContentName, page) => {

	const dispatch = useDispatch();
	const [playListContentData, setPlayListContentData] = useState();

	useEffect(() => {
            let selectedConfigArray = null;
            selectedConfigArray = fetchPlayListContentDataConfig;

            const [data] = selectedConfigArray.filter(el => el.id == 1);    
			dispatch(data.thunk('playlists',`${playListContentName}&page=${page}`));
			setPlayListContentData(data);

	}, [dispatch, playListContentName, page])

	return playListContentData;
}