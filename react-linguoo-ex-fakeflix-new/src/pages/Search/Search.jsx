import "./search.scss"
import Poster from "../../components/Poster/Poster";
import { motion } from "framer-motion";
import { staggerHalf } from "../../motionUtils";
import { useSelector } from "react-redux";
import { selectSearchInputValue } from "../../redux/search/search.selectors";
import { setDefaultAudioListValuesSuccess } from '../../redux/audioplaying/audioplaying.actions'
import { useEffect } from 'react';
import { useDispatch } from "react-redux";

const Search = searchResults => {

	const { results } = searchResults;
	
	const dispatch = useDispatch();
	const selectInputValue = useSelector(selectSearchInputValue);
    const playlistcontentData = results;

    useEffect(()=> {
        //Load playlist into audioplayer as default list
        if(playlistcontentData && playlistcontentData.length > 0){
            const {audio, category, _id, duration } = playlistcontentData[0];
            dispatch(setDefaultAudioListValuesSuccess(audio, category, _id, duration, 0, playlistcontentData));
        }
    },[playlistcontentData]);


	return (
		<div className="Search">
			{results && results.length > 0 && (
				<h2 className="Search__title">Search results for: {selectInputValue}</h2>
			)}
			<motion.div
				className="Search__wrp"
				variants={staggerHalf}
				initial="initial"
				animate="animate"
				exit="exit"
			>
				{results && results.length > 0
					? results.map(result => (
						<Poster
							key={result._id}
							item={result}
							playlistcontentData = {playlistcontentData}
							{...result}
						/>)
					)
					: (
						<h2 className="Search__title">
							Sorry, we searched everywhere but we did not found any audiobook with that title.
						</h2>
					)
				}
			</motion.div>
		</div>
	);
}

export default Search
