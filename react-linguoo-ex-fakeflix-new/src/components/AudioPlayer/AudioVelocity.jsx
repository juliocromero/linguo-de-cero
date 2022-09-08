import React from "react";
import "./styles.css";
import "./audioplayer.scss";

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
        { `${velActual} X` }
      </button>
  </div>
  )
};

export default AudioVelocity;
