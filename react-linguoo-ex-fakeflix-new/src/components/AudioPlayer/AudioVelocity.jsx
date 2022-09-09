import React from "react";
import "./styles.css";
import "./audioplayer.scss";
import {FaRandom} from 'react-icons/fa'

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
         <FaRandom/> {`${velActual}`}
      </button>
  </div>
  )
};

export default AudioVelocity;
