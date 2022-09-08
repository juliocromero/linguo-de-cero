import "./banner.scss";
import React from "react";
import { motion } from "framer-motion";
import { staggerOne, bannerFadeInLoadSectionVariants, bannerFadeInVariants, bannerFadeInUpVariants } from "../../motionUtils";
// import { BASE_IMG_URL } from "../../requests";
import { BACKGROUND_BANER_URL } from "../../requests";
import { FaPlay, FaStop } from "react-icons/fa";
import { BiInfoCircle } from "react-icons/bi";
// import { randomize, truncate } from "../../utils";
// import { Link } from "react-router-dom";
import SkeletonBanner from "../SkeletonBanner/SkeletonBanner";
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { showModalDetail } from "../../redux/modal/modal.actions";
// import { selectTrendingMovies, selectNetflixMovies } from "../../redux/movies/movies.selectors";
// import { selectNetflixSeries } from "../../redux/series/series.selectors";
import { selectRecentLastAudios } from '../../redux/movies/movies.selectors'
import {setAudioPlayingCompleteData, setAudioStoped } from '../../redux/audioplaying/audioplaying.actions';
import { removeContinueListeningArticle } from '../../redux/listcontinuelistening/listcontinuelistening.actions';

const Banner = ({ type }) => {
	// let selector;
	// switch (type) {
	// 	case "movies":
	// 		// selector = selectTrendingMovies;
	// 		break;
	// 	case "series":
	// 		// selector = selectNetflixSeries;
	// 		break;
	// 	default:
	// 		// selector = selectNetflixMovies;
	// 		break;
	// }
	console.log(type);

	// const myData = useSelector(selector);
	// const { loading, error, data: results } = myData;
	// const finalData = results[randomize(results)];
	// const name = finalData?.title || finalData?.name || finalData?.original_name;
	// const description = truncate(finalData?.overview, 150);

	const preventUndefinedSelector = () => undefined;
	

    const recentLastSelector = selectRecentLastAudios ? selectRecentLastAudios : preventUndefinedSelector;
    const recentLastAudios = useSelector(recentLastSelector);
	const { loading, error, data: results } = recentLastAudios;     
    // const recentLastAudio = recentLastAudios && recentLastAudios.length > 0 ? recentLastAudios[0] : null
	const preventUndefinedData = results && results.length > 0 ? {data:results[0]} : undefined;

	const name = preventUndefinedData?.data?.name;
	const description = preventUndefinedData?.data?.overview;
	const audio = preventUndefinedData?.data?.audio;
	const category = preventUndefinedData?.data?.category;
	const _id = preventUndefinedData?.data?._id;
	const duration = preventUndefinedData?.data?.duration;


	const dispatch = useDispatch();

	// const handlePlayAnimation = event => {
	// 	event.stopPropagation();
	// };

	const handleModalOpening = () => {
		dispatch(showModalDetail({ ...preventUndefinedData?.data, name }));
	}


	const [localTrackingProgress, setLocalTrackingProgress] = useState(0);
	const [ showPlayIcon, setShowPlayIcon ] = useState(true);
	

	//#region PlayingBehaviorHandlers

	const handlePlayActionLinguoo = event => {
		setLocalTrackingProgress(0.1);
		setShowPlayIcon(false)
		event.stopPropagation();
		// const prevUndefinedData = selectedCurrentList && selectedCurrentList.data ? selectedCurrentList.data : undefined;
			dispatch(setAudioPlayingCompleteData(
				audio, 
				category, 
				_id, 
				duration, 
				// localTrackingProgress > 0 ? localTrackingProgress : 1, 
				// localTrackingProgress > 0 ? localTrackingProgress : 0.1, 
				localTrackingProgress, 
				// localTrackingProgress, 
				[preventUndefinedData?.data]));
	}

	const stopActionLinguoo = () => {
		setLocalTrackingProgress(0);
		setShowPlayIcon(true);
		dispatch(setAudioStoped());
		dispatch(removeContinueListeningArticle(_id));
	}

	const handleStopActionLinguoo = event => {
		event.stopPropagation();		
		stopActionLinguoo();
	}

	//#endregion


	return (
		<>
			<motion.section
				variants={bannerFadeInLoadSectionVariants}
				initial='initial'
				animate='animate'
				exit='exit'
				className="Banner__loadsection"
			>
				{loading && <SkeletonBanner />}
				{error && <div className="errored">Oops, an error occurred.</div>}
			</motion.section>

			{!loading && results && (
				<motion.header
					variants={bannerFadeInVariants}
					initial='initial'
					animate='animate'
					exit='exit'
					className="Banner"
					style={{backgroundImage: `url(${BACKGROUND_BANER_URL})`}}
				>
					<motion.div
						className="Banner__content"
						variants={staggerOne}
						initial='initial'
						animate='animate'
						exit='exit'
					>
						<motion.h1 variants={bannerFadeInUpVariants} className="Banner__content--title">{name}</motion.h1>
						<motion.div variants={bannerFadeInUpVariants} className="Banner__buttons">
							{ showPlayIcon ? <button
										// className={isPlayingPaused ? "Row__poster-info--icon-reverse icon--play" : "Row__poster-info--icon icon--play"}
										className="Banner__button"
										onClick={handlePlayActionLinguoo}
									>
										<FaPlay />
										<span>Play</span>
									</button> : 
									<button
										// className="Row__poster-info--icon icon--play"
										className="Banner__button"
										// onClick={handlePauseActionLinguoo}
										onClick={handleStopActionLinguoo}
									>
										{/* <FaPause /> */}
										<FaStop />
										<span>Stop</span>
									</button>					
									} 				

							<button
								className="Banner__button"
								onClick={handleModalOpening}
							>
								<BiInfoCircle size="1.5em" />
								<span>More info</span>
							</button>
						</motion.div>
						<motion.p variants={bannerFadeInUpVariants} className="Banner__content--description">{description}</motion.p>
					</motion.div>
					<div className="Banner__panel" />
					<div className="Banner__bottom-shadow" />
				</motion.header>
			)}
		</>
	)
}

export default React.memo(Banner);