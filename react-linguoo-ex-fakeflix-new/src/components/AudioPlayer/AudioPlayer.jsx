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
import AudioVelocity from "./AudioVelocity";
// import { selectCurrentPlayListDataSelector } from '../../redux/currentplaylistdata/currentplaylistdata.selectors';

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
 */

//#endregion

export const AudioPlayer = () => {
  //#region VariableDefinitions

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

  const [velActual, setVelActual] = useState(1);
  const [activeVol, setActiveVol] = useState(true);

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

  const [vol, setVol] = useState((audioRef.current.volume * 100))
  // Destructure for conciseness
  // const { duration } = audioRef.current;

  const currentPercentage =
    duration / velActual
      ? `${(trackProgress / velActual / (duration / velActual)) * 100}%`
      : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #F6AB3B), color-stop(${currentPercentage}, #777))
  `;
  const volStyling = `
  -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${vol*0.01}, #F6AB3B), color-stop(${vol*0.01}, #777))
`;

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

  const changeVelocity = (velActual) => {
    // console.log('changing velocity to ', velActual)
    if (velActual >= 2) {
      setVelActual(1);
    } else {
      setVelActual(velActual + 0.5);
    }
    // audioRef.current.playbackRate = velActual;
    // setDuration(duration/velActual);
    // setAudioTracking(trackProgress)
    // setTrackProgress(trackProgress/velActual);
  };

  //#region Effects

  useEffect(() => {
    setLocalIsPlaying(isPlaying);
    setTrackProgress(trackingProgress);
    if (trackingProgress == 0) {
      audioRef.current.currentTime = trackingProgress;
    }
    if (localIsPlaying) {
      audioRef.current.playbackRate = velActual;
      // setDuration(duration);
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    }
  }, [localIsPlaying, isPlaying, trackingProgress, velActual]);

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
      audioRef.current.playbackRate = velActual;
      audioRef.current.play();
      setLocalIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [audio]);

  function onVolument(e) {   
    audioRef.current.volume = e * 0.01
    setVol(e)
  }
  useEffect(() => {
    let rangeSlider = document.getElementsByClassName('range-slider__volumen')
    rangeSlider[0].addEventListener('mouseleave', () => {
      setActiveVol(false)
    })
    
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);
  
  //#endregion
  return (
    <motion.footer className={`Footer ${isScrolled && "Footer__fixed"}`}>
      <div className="audio-player">
        <Avatar
          badge={true}
          className="Row__poster--avatar artwork"
          img={backdropPath}
          active={null}
          alt={`track artwork for ${originalName} by ${narratorName}`}
        >
          <IconCheck />
        </Avatar>

        <div className="track-info">
          {/* <img
              className="artwork"
              src={backdropPath}
              alt={`track artwork for ${originalName} by ${narratorName}`}
            /> */}
          <h2 className="title audio-player__title">{originalName}</h2>
          {/* <h3 className="artist">{narratorName}</h3> */}
        </div>
        <div className="audio-controls">
          <AudioControls
            audioData={audioPlaying}
            isLocalPlaying={localIsPlaying}
            onPrevClick={toPrevTrack}
            onNextClick={toNextTrack}
            onPlayPauseClick={setLocalIsPlaying}
            // onPlayPauseClick={dispatch(setAudioPlayingCompleteData(audio, category, articleid, duration, trackProgress, playIngCurrentList))}
          />
        </div>
        <h2 className="calcTime calcTimeLeft">
          {trackProgress ? calcTimeToShow(trackProgress / velActual) : "0:00"}
        </h2>
        {/* <div className="progress-range"> */}
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
          style={{ background: trackStyling }}
        />
        <h2 className="calcTime">
          {duration && trackProgress
            ? calcTimeToShow(duration / velActual - trackProgress / velActual)
            : calcTimeToShow(duration / velActual)}
          {
            // {
            // duration && trackProgress  ?
            // calcTimeToShow((duration) - (trackProgress)) :
            // calcTimeToShow(duration)  }
            // {
            // audioRef && audioRef.current && audioRef.current.duration  ?
            // calcTimeToShow((audioRef.current.duration) - (audioRef.current.currentTime)) :
            // calcTimeToShow(audioRef.current.duration) }
          }
        </h2>
        {/* <h2 className="changeVelocity">
            <Next/>
          </h2> */}
        <h2 className="changeVelocity">
          <AudioVelocity
            // audioData = {audioPlaying}
            onChangeVelocityClick={changeVelocity}
            velActual={velActual}
          />
        </h2>
        <div className="range-slider">
          <div className="range-slider__volumen" >
            <Volumen type="button" className="button-volumen pointer" onClick={() => setActiveVol(!activeVol)}/>
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

            <span></span>
          </div>
        </div>

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
