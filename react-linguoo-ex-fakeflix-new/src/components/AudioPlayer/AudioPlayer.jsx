//#region imports

import "./audioplayer.scss";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import AudioControls from "./AudioControls";
import Backdrop from "./Backdrop";
import "./styles.css";
//import { ReactComponent as Next } from "./assets/group.svg";
import { ReactComponent as Volumen } from "./assets/volume.svg";
// import {setAudioPlayingCompleteData, setAudioPaused, setAudioTracking} from '../../redux/audioplaying/audioplaying.actions'
import {
  setAudioPlayingCompleteData,
  setAudioTracking,
  setAudioStoped,
} from "../../redux/audioplaying/audioplaying.actions";
import { useSelector } from "react-redux";
import { selectAudioPlayingSelector } from "../../redux/audioplaying/audioplaying.selectors";

import Avatar from "../Avatar/Avatar";

import IconCheck from "../../assests/icon/IconCheck";

import {
  motion,
  // , useReducedMotion
} from "framer-motion";
// import useViewport from "../../hooks/useViewport";
import useScroll from "../../hooks/useScroll";
import { calcTimeToShow } from "../../shared/timer/calcTime";
import AudioSpeed from "./AudioSpeed";
// import { selectCurrentPlayListDataSelector } from '../../redux/currentplaylistdata/currentplaylistdata.selectors';
import { ReactComponent as Next } from "./assets/Seconds.svg";
import { selectContinueListeningData } from "../../redux/listcontinuelistening/listcontinuelistening.selectors";
import {
  removeContinueListeningArticle,
  removeContinueListeningAsync,
} from "../../redux/listcontinuelistening/listcontinuelistening.actions";
import url from "../../requests";
import useViewport from "../../hooks/useViewport";

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
 */

//#endregion

export const AudioPlayer = () => {
  //#region VariableDefinitions
  const { width } = useViewport();
  const isMobileW = width <= 500;

  // const { width } = useViewport();
  const isScrolled = useScroll(70);

  const preventUndefinedSelector = () => undefined;
  const selectorAudioPlaying = selectAudioPlayingSelector
    ? selectAudioPlayingSelector
    : preventUndefinedSelector;
  const audioPlaying = useSelector(selectorAudioPlaying);

  const { playIngCurrentList, articleid, isPlaying, trackingProgress } =
    audioPlaying;

  const [trackIndex, setTrackIndex] = useState(
    playIngCurrentList.findIndex((article) => article._id == articleid)
  );
  const [trackProgress, setTrackProgress] = useState(trackingProgress);
  const [localIsPlaying, setLocalIsPlaying] = useState(isPlaying);
  const dispatch = useDispatch();

  const [currSpeed, setCurrSpeed] = useState(1);
  const [activeVol, setActiveVol] = useState(false);

  // const selectorCurrentPlaylistData = selectCurrentPlayListDataSelector ? selectCurrentPlayListDataSelector : preventUndefinedSelector;
  // const basedOn = useSelector(selectorCurrentPlaylistData);

  const [originalName, setOriginalName] = useState("");
  const [audio, setAudio] = useState("");
  const [duration, setDuration] = useState(0);
  const [backdropPath, setbackdropPath] = useState("");
  const [narratorName, setNarratorName] = useState("");

  const color = "#141414";
  const audioRef = useRef(new Audio(audio));
  const intervalRef = useRef();
  const isReady = useRef(false);

  const [vol, setVol] = useState(audioRef.current.volume * 100);
  // const [vol, setVol] = useState(0);
  // Destructure for conciseness
  // const { duration } = audioRef.current;

  const currentPercentage =
    duration / currSpeed
      ? `${(trackProgress / currSpeed / (duration / currSpeed)) * 100}%`
      : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #F6AB3B), color-stop(${currentPercentage}, #777))
  `;
  const volStyling = `
  -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${
    vol * 0.01
  }, #F6AB3B), color-stop(${vol * 0.01}, #777))
`;

  const continueListeningSelector = selectContinueListeningData
    ? selectContinueListeningData
    : preventUndefinedSelector;
  const selectedContinueListening = useSelector(continueListeningSelector);
  // const [publicLocalTrackingProgress, setPublicLocalTrackingProgress] = useState(0);
  const existsInContinueListening =
    selectedContinueListening &&
    selectedContinueListening.data &&
    selectedContinueListening.data.length > 0 &&
    selectedContinueListening.data.some((cl) => cl._id == articleid);

  //#endregion

  //#region FunctionVariableDefinitions

  const startTimer = () => {
    // Clear any timers already running

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
        dispatch(setAudioTracking(audioRef.current.currentTime));
      }
    }, [1000]);
  };

  //#region ScrubBehavior

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;

    setTrackProgress(audioRef.current.currentTime);
    dispatch(setAudioTracking(audioRef.current.currentTime));
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!localIsPlaying) {
      setLocalIsPlaying(true);
    }
    startTimer();
  };

  //#endregion

  //#region toNexPrevTrack

  const toPrevTrack = () => {
    let newPlayingArticle;
    if (trackIndex - 1 < 0) {
      setTrackIndex(playIngCurrentList.length - 1);
      newPlayingArticle = playIngCurrentList[playIngCurrentList.length - 1];
    } else {
      setTrackIndex(trackIndex - 1);
      newPlayingArticle = playIngCurrentList[trackIndex - 1];
    }
    const { audio, category, _id, duration } = newPlayingArticle;
    // const durationModVel = duration * velActual;
    dispatch(
      setAudioPlayingCompleteData(
        audio,
        category,
        _id,
        duration,
        1,
        playIngCurrentList
      )
    );
    // dispatch(setAudioPlayingCompleteData(audio, category, _id, durationModVel, 1, playIngCurrentList));
  };

  const toNextTrack = () => {
    if (trackIndex < playIngCurrentList.length - 1) {
      setTrackIndex(trackIndex + 1);
      const newPlayingArticle = playIngCurrentList[trackIndex + 1];
      const { audio, category, _id, duration } = newPlayingArticle;
      // const durationModVel = duration * velActual;
      dispatch(
        setAudioPlayingCompleteData(
          audio,
          category,
          _id,
          duration,
          1,
          playIngCurrentList
        )
      );
      // dispatch(setAudioPlayingCompleteData(audio, category, _id, durationModVel, 1, playIngCurrentList));
    } else {
      setTrackIndex(0);
    }
  };

  //#endregion

  //#endregion

  const changeSpeed = (currSpeed) => {
    // console.log('changing velocity to ', velActual)
    if (currSpeed >= 2) {
      setCurrSpeed(1);
    } else {
      setCurrSpeed(currSpeed + 0.5);
    }
  };

  //#region Effects

  useEffect(() => {
    setLocalIsPlaying(isPlaying);
    setTrackProgress(trackingProgress);
    if (trackingProgress == 0) {
      audioRef.current.currentTime = trackingProgress;
    }
    if (localIsPlaying) {
      audioRef.current.playbackRate = currSpeed;
      // setDuration(duration);
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    }
  }, [localIsPlaying, isPlaying, trackingProgress, currSpeed]);

  useEffect(() => {
    let provisoryIndex = 0;
    if (playIngCurrentList && playIngCurrentList.length > 0) {
      setTrackIndex(
        playIngCurrentList.findIndex((article) => article._id == articleid)
      );
      provisoryIndex = playIngCurrentList.findIndex(
        (article) => article._id == articleid
      );
      setOriginalName(playIngCurrentList[provisoryIndex].original_name);
      setAudio(playIngCurrentList[provisoryIndex].audio);
      // setDuration(playIngCurrentList[provisoryIndex].duration);
      // setDuration(playIngCurrentList[provisoryIndex].duration/velActual);
      setDuration(playIngCurrentList[provisoryIndex].duration);

      if (playIngCurrentList[provisoryIndex].narrator.image) {
        setbackdropPath(playIngCurrentList[provisoryIndex].narrator.image);
      } else {
        setbackdropPath(playIngCurrentList[provisoryIndex].backdrop_path);
      }

      setNarratorName(playIngCurrentList[provisoryIndex].narrator.name);
    }
  }, [playIngCurrentList, articleid]);

  useEffect(() => {
    audioRef.current.pause();

    // audioRef.current = new Audio(audioSrc);
    audioRef.current = new Audio(audio);
    audioRef.current.currentTime = trackingProgress;

    setTrackProgress(trackingProgress);
    dispatch(setAudioTracking(audioRef.current.currentTime));

    if (isReady.current) {
      audioRef.current.playbackRate = currSpeed;
      audioRef.current.play();
      setLocalIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [audio]);

  useEffect(() => {
    if (trackProgress >= duration - 5) {
      setCurrSpeed(1);
      // audioRef.current.playbackRate = currSpeed;
    }
  }, [trackProgress]);

  useEffect(() => {
    if (
      isPlaying &&
      existsInContinueListening &&
      trackProgress >= duration - 1
    ) {
      dispatch(removeContinueListeningArticle(articleid));
      dispatch(
        removeContinueListeningAsync(
          url.useRouteContinueListeningItems,
          articleid
        )
      );
      dispatch(setAudioStoped());
    }
  }, [
    trackProgress,
    isPlaying,
    existsInContinueListening,
    articleid,
    dispatch,
    duration,
  ]);

  function onVolument(e) {
    audioRef.current.volume = e * 0.01;
    setVol(e);
  }
  useEffect(() => {
    let rangeSlider = document.getElementsByClassName("range-slider__volumen");
    rangeSlider[0].addEventListener("mouseleave", () => {
      setActiveVol(false);
    });

    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  //#endregion
  return (
    <motion.footer className={`Footer ${isScrolled && "Footer__fixed"}`}>
      <div
        className="rep-mobile"
        style={{
          position: "relative",
          boxSizing: "border-box",
          background: "#141414",
          fontFamily: "Arial, Helvetica, sans-serif",
          width: "100%",
          display: "flex",
          flexDirection: isMobileW ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {!isMobileW ? (
          <>
            <div
              style={{
                display: "inline-flex",
                justifyContent: "start",
                alignItems: "center",
                width: "50%",
              }}
            >
              <Avatar
                badge={true}
                // className="artwork"
                className="Row__poster--avatar artwork"
                img={backdropPath}
                active={null}
                alt={`track artwork for ${originalName} by ${narratorName}`}
                // style={{
                //   display: "block",
                //   position: "sticky",
                // }}
              >
                <IconCheck />
              </Avatar>
              <div
                // className="track-info"
                style={{
                  display: "inline-flex",
                  marginLeft: "1em",
                  textAlign: "left",
                  // position: "relative",
                  // paddingRight: "3em",
                  overflow: "hidden",
                  maxWidth: "80%",
                  textWrap: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                <h2 className="title">{originalName}</h2>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                width: "55%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <AudioControls
                  audioData={audioPlaying}
                  isLocalPlaying={localIsPlaying}
                  onPrevClick={toPrevTrack}
                  onNextClick={toNextTrack}
                  onPlayPauseClick={setLocalIsPlaying}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  width: "60%",
                  justifyContent: "space-around",
                }}
              >
                <h2 className="calcTime">
                  {trackProgress
                    ? calcTimeToShow(trackProgress / currSpeed)
                    : "0:00"}
                </h2>
                <input
                  type="range"
                  value={trackProgress}
                  step="1"
                  min="0"
                  max={duration ? duration : `${duration}`}
                  className="progress"
                  onChange={(e) => onScrub(e.target.value)}
                  onMouseUp={onScrubEnd}
                  onKeyUp={onScrubEnd}
                  style={{
                    background: trackStyling,
                    Width: "60%",
                    marginTop: "0.4em",
                  }}
                />
                <h2 className="calcTime">
                  {duration && trackProgress
                    ? calcTimeToShow(
                        duration / currSpeed - trackProgress / currSpeed
                      )
                    : calcTimeToShow(duration / currSpeed)}
                </h2>
              </div>
              <div
                style={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginRight: "2em",
                }}
              >
                <Next />

                <AudioSpeed
                  // audioData = {audioPlaying}
                  onChangeSpeedClick={changeSpeed}
                  currSpeed={currSpeed}
                />
                <div
                  className="range-slider"
                  // style={{}}
                >
                  <div className="range-slider__volumen">
                    <Volumen
                      type="button"
                      className="button-volumen pointer"
                      onClick={() => setActiveVol(!activeVol)}
                    />
                    {activeVol ? (
                      <input
                        value={vol}
                        className="input-range "
                        onInput={(e) => onVolument(e.target.value)}
                        name="inputRange"
                        type="range"
                        step="1"
                        max="100"
                        style={{ background: volStyling }}
                      />
                    ) : null}
                  </div>

                  <span></span>
                </div>
              </div>
            </div>
          </>
        ) : (
          //Mobile
          <>
            <div
              style={{
                display: "inline-flex",
                justifyContent: "center",
                textAlign: "center",
                width: "100%",
                padding: "0.5em 0",
              }}
            >
              <Avatar
                badge={true}
                // className="artwork"
                className="Row__poster--avatar artwork"
                img={backdropPath}
                active={null}
                alt={`track artwork for ${originalName} by ${narratorName}`}
              >
                <IconCheck />
              </Avatar>
              <div
                // className="track-info"
                style={{
                  display: "inline-flex",
                  marginLeft: "1em",
                  textAlign: "center",
                  alignItems: "center",
                  alignContent: "center",
                  overflow: "hidden",
                  maxWidth: "80%",
                  flexWrap: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                <h2 className="title">{originalName}</h2>
              </div>
            </div>

            <div
              style={{
                display: "inline-flex",
                width: "100%",
                justifyContent: "space-around",
                alignItems: "center",
                padding: "0 0 2em",
              }}
            >
              <div
                style={{
                  paddingLeft: "0.3em",
                }}
              >
                <AudioControls
                  audioData={audioPlaying}
                  isLocalPlaying={localIsPlaying}
                  onPrevClick={toPrevTrack}
                  onNextClick={toNextTrack}
                  onPlayPauseClick={setLocalIsPlaying}
                />
              </div>
              <div
                style={{
                  display: "inline-flex",
                  width: "50%",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <h2 className="calcTime">
                  {trackProgress
                    ? calcTimeToShow(trackProgress / currSpeed)
                    : "0:00"}
                </h2>
                <input
                  type="range"
                  value={trackProgress}
                  step="1"
                  min="0"
                  max={duration ? duration : `${duration}`}
                  className="progress"
                  onChange={(e) => onScrub(e.target.value)}
                  onMouseUp={onScrubEnd}
                  onKeyUp={onScrubEnd}
                  style={{
                    background: trackStyling,
                    Width: "80%",
                    marginTop: "0.4em",
                  }}
                />
                <h2 className="calcTime">
                  {duration && trackProgress
                    ? calcTimeToShow(
                        duration / currSpeed - trackProgress / currSpeed
                      )
                    : calcTimeToShow(duration / currSpeed)}
                </h2>
              </div>

              <div
                style={{
                  display: "inline-flex",
                  alignContent: "center",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Next />

                <AudioSpeed
                  onChangeSpeedClick={changeSpeed}
                  currSpeed={currSpeed}
                />
                <div className="range-slider">
                  <div className="range-slider__volumen">
                    <Volumen
                      type="button"
                      className="button-volumen pointer"
                      onClick={() => setActiveVol(!activeVol)}
                    />
                    {activeVol ? (
                      <input
                        value={vol}
                        className="input-range "
                        onInput={(e) => onVolument(e.target.value)}
                        name="inputRange"
                        type="range"
                        step="1"
                        max="100"
                        style={{ background: volStyling }}
                      />
                    ) : null}
                  </div>

                  <span></span>
                </div>
              </div>
            </div>
          </>
        )}

        <Backdrop
          trackIndex={trackIndex}
          activeColor={color}
          isPlaying={localIsPlaying}
        />
      </div>
    </motion.footer>
  );
};

export default AudioPlayer;
