import React from "react";
import "./styles.css";
import "./audioplayer.scss";
import { ReactComponent as Next } from "./assets/Seconds.svg";

const AudioVelocity = (
  {velActual, onChangeVelocityClick}
) => {

  return (
  <div 
  >
      <button
        type="button"
        style={{ color: 'white', fontSize:'1em'}}
        onClick = {() => onChangeVelocityClick(velActual)}
      >
         <Next/> {`${velActual}`}
      </button>
  </div>
  )
};

export default AudioVelocity;
