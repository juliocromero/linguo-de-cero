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
          fontSize: currSpeed !== 1.5 ? "1em" : "0.8em",
          // fontSize: "0.8em",
          // fontSize: "1em",
          // marginLeft: "2em",
          zIndex: 40,
        }}
        onClick={() => onChangeSpeedClick(currSpeed)}
      >
        {`${currSpeed} x`}
      </button>
    </div>
  );
};

export default AudioVelocity;
