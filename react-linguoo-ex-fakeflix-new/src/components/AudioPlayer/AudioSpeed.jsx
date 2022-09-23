import React from "react";
import "./styles.css";
import "./audioplayer.scss";
// import { ReactComponent as Next } from "./assets/Seconds.svg";

const AudioVelocity = ({ currSpeed, onChangeSpeedClick }) => {
  return (
    <div>
      <button
        type="button"
        style={{
          color: "white",
          fontSize: "1em",
          // marginLeft: "2em",
          // zIndex: 40,
        }}
        onClick={() => onChangeSpeedClick(currSpeed)}
      >
        {`${currSpeed} x`}
      </button>
    </div>
  );
};

export default AudioVelocity;
