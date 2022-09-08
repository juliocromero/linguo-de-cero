import React from "react";
import { ReactComponent as Play } from "./assets/play.svg";
import { ReactComponent as Pause } from "./assets/pause.svg";
import { ReactComponent as Next } from "./assets/next.svg";
import { ReactComponent as Prev } from "./assets/prev.svg";
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
  <div className="audio-controls">
    <button
      type="button"
      className="prev"
      aria-label="Previous"
      onClick={onPrevClick}
    >
      <Prev />
    </button>
    {isLocalPlaying ? (
      <button
        type="button"
        className="pause"
        // onClick={() => onPlayPauseClick(false)}
        onClick={() => onPlayPauseClick(localSetAudioPaused())}
        aria-label="Pause"
      >
        <Pause />
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
        <Play />
      </button>
    )}
    <button
      type="button"
      className="next"
      aria-label="Next"
      onClick={onNextClick}
    >
      <Next />
    </button>
  </div>
  )
};

export default AudioControls;
