import React from "react";
//import { ReactComponent as Prev } from "./assets/prev.svg";
import IconPrevious from "./assets/icons/iconsPrevious";
import IconsPlay from "./assets/icons/iconPlay";
import IconsNext from "./assets/icons/iconsNext";
import IconPause from "./assets/icons/iconsPause";
import {setAudioPlayingCompleteData, setAudioPaused} from '../../redux/audioplaying/audioplaying.actions'
import { useDispatch } from "react-redux";
// import { fetchMovieDataConfig } from '../../dataConfig'
import { pushContinueListeningArticle } from '../../redux/listcontinuelistening/listcontinuelistening.actions';

const AudioControls = ({
  audioData,
  isLocalPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick
}) => {

  const dispatch = useDispatch();
  
  const { audioPlayingUrl, playIngCurrentList, articleid, categoryid, duration, trackingProgress } = audioData;

  // //getting complete audio article from categoryList 
  // const fMDC = fetchMovieDataConfig;
	
	// const [data] = idList ? fMDC.filter(el => el.id == idList) : fMDC.filter(el => el.categoryid == category);
	// const selectorCatList = data ? data.selector : preventUndefinedSelector; 
	// const selectedCurrentList = useSelector(selectorCatList);


  const localSetAudioPaused = () => {
    dispatch(setAudioPaused());
    const completeAudioData = {item: playIngCurrentList.find(article => article._id == articleid)}
    dispatch(pushContinueListeningArticle(completeAudioData, trackingProgress));
  }   
 
  return (
  <div>
    <button
      type="button"
      className="prev"
      aria-label="Previous"
      onClick={onPrevClick}
    >
      <IconPrevious />
    </button>
    {isLocalPlaying ? (
      <button
        type="button"
        className="pause"
        // onClick={() => onPlayPauseClick(false)}
        onClick={() => onPlayPauseClick(localSetAudioPaused())}
        aria-label="Pause"
      >
        <IconPause />
      </button>
    ) : (
      <button
        type="button"
        className="play"
        // onClick={() => onPlayPauseClick(true)}
        onClick={() => onPlayPauseClick(dispatch(setAudioPlayingCompleteData(
          audioPlayingUrl, 
          categoryid, 
          articleid, 
          duration, 
          trackingProgress, 
          playIngCurrentList)))}
        aria-label="Play"
      >
        <IconsPlay />
      </button>
    )}
    <button
      type="button"
      className="next"
      aria-label="Next"
      onClick={onNextClick}
    >
      <IconsNext />
    </button>
  </div>
  )
};

export default AudioControls;
