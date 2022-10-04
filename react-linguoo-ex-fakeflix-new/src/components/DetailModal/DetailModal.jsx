import './detailModal.scss'
// import { useRef } from 'react';
// import { useEffect, useState } from 'react';
// import { useEffect, useRef, useState } from 'react';
import { useRef, useState } from 'react';
// import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"
import { staggerOne, modalOverlayVariants, modalVariants, modalFadeInUpVariants } from "../../motionUtils";
import { hideModalDetail } from "../../redux/modal/modal.actions";
import { useDispatch, useSelector } from "react-redux";
import { selectModalContent, selectModalState } from "../../redux/modal/modal.selectors";
// import { BASE_IMG_URL, FALLBACK_IMG_URL } from "../../requests";
import { FALLBACK_IMG_URL } from "../../requests";
import { VscChromeClose } from "react-icons/vsc";
// import { capitalizeFirstLetter, dateToYearOnly } from "../../utils";
// import { dateToYearOnly } from "../../utils";
import { formatDate } from '../../utils';
// import { capitalizeFirstLetter } from "../../utils";
// import { FaMinus, FaPlay, FaPlus } from "react-icons/fa";
// import { FaStop, FaPlay } from "react-icons/fa";
import { FaPause, FaPlay } from "react-icons/fa";
// import {setAudioPlayingCompleteData, setAudioPaused, setAudioStoped } from '../../redux/audioplaying/audioplaying.actions';
// import {setAudioPlayingCompleteData, setAudioStoped } from '../../redux/audioplaying/audioplaying.actions';
import {setAudioPlayingCompleteData, setAudioPaused } from '../../redux/audioplaying/audioplaying.actions';
// import { FaPlay } from "react-icons/fa";
// import { addToFavouritesAsync, removeFromFavouritesAsync } from "../../redux/favourites/favourites.actions";
// import { addToFavourites, removeFromFavourites } from "../../redux/favourites/favourites.actions";
import useOutsideClick from "../../hooks/useOutsideClick";
import { fetchMovieDataConfig } from '../../dataConfig'
// import { selectAudioPlayingSelector } from '../../redux/audioplaying/audioplaying.selectors';
// import { removeContinueListeningArticle, pushContinueListeningArticle } from '../../redux/listcontinuelistening/listcontinuelistening.actions';
import { removeContinueListeningArticle } from '../../redux/listcontinuelistening/listcontinuelistening.actions';


// import { selectNarratorsList } from '../../redux/narrators/narrators.selectors';

// import Playlist from 'react-mp3-player';

const DetailModal = () => {

//#region all

	const dispatch = useDispatch();
	const modalClosed = useSelector(selectModalState);
	const modalContent = useSelector(selectModalContent);
	const handleModalClose = () => dispatch(hideModalDetail());
	// const { overview, fallbackTitle, backdrop_path, release_date, first_air_date, vote_average, original_language, adult, genresConverted, isFavourite } = modalContent;
	// const { overview, fallbackTitle, backdrop_path, narrator : { name }, release_date, first_air_date, upVotes, original_language, category, isFavourite } = modalContent;
	const {
		_id,
		audio, 
		duration, 
		overview, name, backdrop_path, narrator, release_date, upVotes, original_language, category } = modalContent;

	const fMDC = fetchMovieDataConfig;
	
	const [data] = fMDC.filter(el => el.categoryid == category);
	const categoryTitle = data && data.title ? data.title : ""; 
	const formatedDate = release_date ? formatDate(release_date) : "";	
	// const preventUndefinedSelector = ()=> undefined;
	// const narrators = useSelector(selectNarratorsList);
	// const selectedNarrator = narrators.find(n => n._id == narrator._id);
	// const narratorName = selectedNarrator && selectedNarrator.name ? selectedNarrator.name : "";

	// const maturityRating = adult === undefined ? "Not available" : adult ? "Suitable for adults only" : "Suitable for all ages";
	// const reducedDate = release_date ? dateToYearOnly(release_date) : first_air_date ? dateToYearOnly(first_air_date) : "Not Available";
	// const reducedDate = date ? dateToYearOnly(date) : first_air_date ? dateToYearOnly(first_air_date) : "Not Available";
	const modalRef = useRef();

	// const handleAdd = (event) => {
	// 	event.stopPropagation();
	// 	dispatch(addToFavourites({ ...modalContent, isFavourite }));
	// }
	// const handleRemove = (event) => {
	// 	event.stopPropagation();
	// 	dispatch(removeFromFavourites({ ...modalContent, isFavourite }));
	// 	if (!modalClosed) handleModalClose();
	// }
	// const handlePlayAnimation = event => {
	// 	event.stopPropagation();
	// 	handleModalClose();
	// };

	useOutsideClick(modalRef, () => {
		if (!modalClosed) handleModalClose();
	});

//#endregion	

//#region PlayingBehaviorVariableDefinitions

// const selectorAudioPlaying = selectAudioPlayingSelector ? selectAudioPlayingSelector : preventUndefinedSelector
// const audioPlaying = useSelector(selectorAudioPlaying);
// const [isPlayingPaused, setIsPlayingPaused] = useState(false);
// const { articleid, trackingProgress, isPlaying } = audioPlaying;
// const [localTrackingProgress, setLocalTrackingProgress] = useState(trackingProgress);
// const [localTrackingProgress, setLocalTrackingProgress] = useState(0.1);
const [localTrackingProgress, setLocalTrackingProgress] = useState(0);
const [ showPlayIcon, setShowPlayIcon ] = useState(true);
// const continueListeningSelector = selectContinueListeningData ? selectContinueListeningData : preventUndefinedSelector;
// const selectedContinueListening = useSelector(continueListeningSelector);
// const [publicLocalTrackingProgress, setPublicLocalTrackingProgress] = useState(0);
// const existsInContinueListening = selectedContinueListening && 
// selectedContinueListening.data && 
// selectedContinueListening.data.length > 0 &&
// selectedContinueListening.data.some(cl => cl._id == _id);

const selectedCurrentList =  { data: [modalContent] }  

//#endregion	


//#region PlayingBehaviorHandlers

	const handlePlayActionLinguoo = event => {
		setLocalTrackingProgress(0.1);
		setShowPlayIcon(false)
		event.stopPropagation();
		const prevUndefinedData = selectedCurrentList && selectedCurrentList.data ? selectedCurrentList.data : undefined;
			dispatch(setAudioPlayingCompleteData(
				audio, 
				category, 
				_id, 
				duration, 
				// localTrackingProgress > 0 ? localTrackingProgress : 1, 
				// localTrackingProgress > 0 ? localTrackingProgress : 0.1, 
				localTrackingProgress, 
				// localTrackingProgress, 
				prevUndefinedData));
	}

	const pauseActionLinguoo = () => {
		setLocalTrackingProgress(0);
		setShowPlayIcon(true);
		dispatch(setAudioPaused());
		dispatch(removeContinueListeningArticle(_id));
	}

	const handlePauseActionLinguoo = event => {
		event.stopPropagation();		
		pauseActionLinguoo();
	}

	// const handlePauseActionLinguoo = event => {
	// 	event.stopPropagation();
	// 	// setLocalTrackingProgress(trackingProgress);
	// 	dispatch(setAudioPaused());
	// 	dispatch(pushContinueListeningArticle(result, localTrackingProgress));
	// }

//#endregion

// useEffect(()=>{
// 	// if(articleid == _id){ 
// 		//Current article
// 		if(trackingProgress > 0){
// 			setLocalIsPlaying(true)
// 			setShowPlayIcon(!isPlaying);
// 		}
// 		else {
// 			setIsPlayingPaused(false);
// 			setShowPlayIcon(true);				
// 		}
// 		setLocalTrackingProgress(trackingProgress);
// 	// }
// 	// else{
// 	// 	//Any article different than current one
// 	// 	if(localTrackingProgress > 0){
// 	// 		setIsPlayingPaused(true);
// 	// 		setShowPlayIcon(true);
// 	// 	}
// 	// 	else{
// 	// 		setIsPlayingPaused(false);
// 	// 		setShowPlayIcon(true);
// 	// 	}
// 	// }
// // },[articleid, isPlaying, localTrackingProgress])
// },[ isPlaying, localTrackingProgress])



	return (
		<AnimatePresence exitBeforeEnter>
			{!modalClosed && (
				<>
					<motion.div
						variants={modalOverlayVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
						key="modalOverlay"
						className={`Modal__overlay ${modalClosed && 'Modal__invisible'}`}
					>
						<motion.div
							key="modal"
							variants={modalVariants}
							ref={modalRef}
							className={`Modal__wrp ${modalClosed && 'Modal__invisible'}`}
						>
							<motion.button
								className="Modal__closebtn"
								onClick={handleModalClose}
							>
								<VscChromeClose />
							</motion.button>
							<div className="Modal__image--wrp">
								<div className="Modal__image--shadow" />
								<img
									className="Modal__image--img"
									src={backdrop_path ? `${backdrop_path}` : FALLBACK_IMG_URL}
									alt={name}
								/>
								{/* <img
									className="Modal__image--img"
									src={backdrop_path ? `${BASE_IMG_URL}/${backdrop_path}` : FALLBACK_IMG_URL}
									alt={fallbackTitle}
								/> */}
								{/* <img
									className="Modal__image--img"
									src={image ? `${image}` : FALLBACK_IMG_URL}
									alt={name}
								/> */}
								<div className="Modal__image--buttonswrp">
									{/* <Link
										className="Modal__image--button"
										onClick={handlePlayAnimation}
										to={'/play'}
									>
										<FaPlay />
										<span>Play</span>
									</Link> */}
									{ showPlayIcon ? <button
										// className={isPlayingPaused ? "Row__poster-info--icon-reverse icon--play" : "Row__poster-info--icon icon--play"}
										className="Modal__image--button"
										onClick={handlePlayActionLinguoo}
									>
										<FaPlay />
									</button> : 
									<button
										// className="Row__poster-info--icon icon--play"
										className="Modal__image--button"
										// onClick={handlePauseActionLinguoo}
										onClick={handlePauseActionLinguoo}
									>
										<FaPause />
										{/* <FaStop /> */}
									</button>					
									} 				

									{/* {!isFavourite
										? (
											<button className='Modal__image--button-circular' onClick={handleAdd}>
												<FaPlus />
											</button>
										): (
											<button className='Modal__image--button-circular' onClick={handleRemove}>
												<FaMinus />
											</button>
										)} */}
								</div>
							</div>
							<motion.div variants={staggerOne} initial="initial" animate="animate" exit="exit" className="Modal__info--wrp">
								<motion.h3 variants={modalFadeInUpVariants} className="Modal__info--title">{name}</motion.h3>
								<motion.p variants={modalFadeInUpVariants} className="Modal__info--description">{overview}</motion.p>
								<motion.hr variants={modalFadeInUpVariants} className="Modal__info--line"/>
								{/* <motion.h4 variants={modalFadeInUpVariants} className="Modal__info--otherTitle">Info on <b>{name}</b></motion.h4> */}
								{/* <motion.h4 variants={modalFadeInUpVariants} className="Modal__info--otherTitle">Info on <b>{name}</b></motion.h4> */}
								<motion.div variants={modalFadeInUpVariants} className="Modal__info--row">
									<span className='Modal__info--row-label'>Category: </span>
									{/* <span className="Modal__info--row-description">{joinedGenres}</span> */}
									<span className="Modal__info--row-description">{categoryTitle}</span>
								</motion.div>
								<motion.div variants={modalFadeInUpVariants} className="Modal__info--row">
									<span className='Modal__info--row-label'>
										{release_date ? "Release date: " : "First air date: "}
									</span>
									<span className="Modal__info--row-description">{formatedDate}</span>
								</motion.div>
								<motion.div variants={modalFadeInUpVariants} className="Modal__info--row">
									<span className='Modal__info--row-label'>Likes: </span>
									<span className="Modal__info--row-description">{upVotes || "Not available"}</span>
								</motion.div>
								<motion.div variants={modalFadeInUpVariants} className="Modal__info--row">
									<span className='Modal__info--row-label'>Language: </span>
									<span className="Modal__info--row-description">{ original_language == 'es' ? 'Spanish' : 'English'}</span>
									{/* <span className="Modal__info--row-description">{capitalizeFirstLetter(original_language)}</span> */}
									{/* <span className="Modal__info--row-description">{capitalizeFirstLetter(original_language)}</span> */}
									{/* <span className="Modal__info--row-description">{capitalizeFirstLetter(language)}</span> */}
								</motion.div>
								<motion.div variants={modalFadeInUpVariants} className="Modal__info--row">
									<span className='Modal__info--row-label'>Reader: </span>
									{/* <span className="Modal__info--row-description">{maturityRating}</span> */}
									<span className="Modal__info--row-description">{narrator.name}</span>
								</motion.div>
							</motion.div>
						</motion.div>
					</motion.div>
					{/* <Playlist tracks={tracks}/> */}
				</>
			)}
		</AnimatePresence>
	)
}

export default DetailModal
