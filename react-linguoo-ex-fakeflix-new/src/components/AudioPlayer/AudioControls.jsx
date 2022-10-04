import React from "react";
//import { ReactComponent as Prev } from "./assets/prev.svg";
import IconPrevious from "./assets/icons/iconsPrevious";
import IconsPlay from "./assets/icons/iconPlay";
import IconsNext from "./assets/icons/iconsNext";
import IconPause from "./assets/icons/iconsPause";
import {
  setAudioPlayingCompleteData,
  setAudioPaused,
} from "../../redux/audioplaying/audioplaying.actions";
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { fetchMovieDataConfig } from '../../dataConfig'
import {
  pushContinueListeningArticle,
  upsertContinueListeningAsync,
} from "../../redux/listcontinuelistening/listcontinuelistening.actions";
import url from "../../requests";

// import { selectContinueListeningData } from "../../redux/listcontinuelistening/listcontinuelistening.selectors";

const AudioControls = ({
  audioData,
  isLocalPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
}) => {
  const dispatch = useDispatch();
  // const preventUndefinedSelector = () => undefined;

  const {
    audioPlayingUrl,
    playIngCurrentList,
    articleid,
    categoryid,
    duration,
    trackingProgress,
  } = audioData;

  // //getting complete audio article from categoryList
  // const fMDC = fetchMovieDataConfig;

  // const [data] = idList ? fMDC.filter(el => el.id == idList) : fMDC.filter(el => el.categoryid == category);
  // const selectorCatList = data ? data.selector : preventUndefinedSelector;
  // const selectedCurrentList = useSelector(selectorCatList);

  const localSetAudioPaused = () => {
    dispatch(setAudioPaused());
    const completeAudioData = {
      item: playIngCurrentList.find((article) => article._id == articleid),
    };
    dispatch(pushContinueListeningArticle(completeAudioData, trackingProgress));
    dispatch(
      upsertContinueListeningAsync(
        url.useRouteContinueListeningItems,
        articleid,
        trackingProgress
      )
    );
  };

  // const continueListeningSelector = selectContinueListeningData
  //   ? selectContinueListeningData
  //   : preventUndefinedSelector;
  // const selectedContinueListening = useSelector(continueListeningSelector);
  // // const [publicLocalTrackingProgress, setPublicLocalTrackingProgress] = useState(0);
  // const existsInContinueListening =
  //   selectedContinueListening &&
  //   selectedContinueListening.data &&
  //   selectedContinueListening.data.length > 0 &&
  //   selectedContinueListening.data.some((cl) => cl._id == articleid);

  // useEffect(() => {
  //   if (
  //     !existsInContinueListening &&
  //     !isPlaying &&
  //     localTrackingProgress > 0 &&
  //     trackingProgress < duration
  //   ) {
  //     setLocalTrackingProgress(0);
  //     setIsAddedContinueListening(false);
  //     // dispatch(setAudioStoped());
  //   } else if (existsInContinueListening && trackingProgress >= duration - 1) {
  //     dispatch(
  //       removeContinueListeningAsync(
  //         url.useRouteContinueListeningItems,
  //         result.item._id
  //       )
  //     );
  //     dispatch(setAudioStoped());
  //     setIsAddedContinueListening(false);
  //     setLocalTrackingProgress(0);
  //     dispatch(removeContinueListeningArticle(_id));
  //   }
  // }, [
  //   existsInContinueListening,
  //   isPlaying,
  //   isAddedContinueListening,
  //   trackingProgress,
  // ]);

  return (
    <div
      // className="control-audio-padre"
      style={{
        display: "inline-flex",
      }}
    >
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
          onClick={() =>
            onPlayPauseClick(
              dispatch(
                setAudioPlayingCompleteData(
                  audioPlayingUrl,
                  categoryid,
                  articleid,
                  duration,
                  trackingProgress,
                  playIngCurrentList
                )
              )
            )
          }
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
  );
};

export default AudioControls;
