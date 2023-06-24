import React from "react";

interface TrackProgressProps {
  progress: boolean;
  left: number;
  right: number;
  onChange: (e) => void;
}

const TrackProgress: React.FC<TrackProgressProps> = ({
  progress,
  left,
  right,
  onChange,
}) => {
  const progressPercent = (left / right) * 100;
  const width = progress ? "100%" : "100px";
  const bottom = progress ? "-6px" : "0px";
  const rightMargin = progress ? "5px" : "0px";
  const backgroundColor = progress ? "red" : "lightgray";

  const minSec = (s) => {
    return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
  }; //minutes seconds format

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div
        style={{
          position: "relative",
          width: width,
          height: "3px",
          backgroundColor: "grey",
          bottom: bottom,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: `${progressPercent}%`,
            height: "3px",
            backgroundColor: backgroundColor,
          }}
        ></div>
        <input
          type="range"
          min={0}
          max={right}
          onChange={onChange}
          value={left}
          style={{
            position: "absolute",
            width: width,
            height: "3px",
            appearance: "none",
            backgroundColor: "transparent",
            // marginBottom: marginBottom,
            cursor: "pointer",
          }}
        ></input>
      </div>
      {progress && (
        <div
          style={{
            position: "absolute",
            top: "36px",
            left: "150px",
            fontSize: "11px",
            color: "darkgray",
          }}
        >
          {minSec(left)} / {minSec(right)}
        </div>
      )}
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          position: relative;
          bottom: 1px;
          right: ${rightMargin};
          background: ${backgroundColor};
          border-radius: 50%;
          transition: transform 0.1s ease-in-out;
        }
        input[type="range"]:hover::-webkit-slider-thumb {
          transform: scale(1);
        }
        input[type="range"]::-webkit-slider-thumb {
          transform: scale(0);
        }
        input[type="range"]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          position: relative;
          bottom: 1px;
          right: ${rightMargin};
          background: ${backgroundColor};
          border-radius: 50%;
        }
        input[type="range"]:hover::-moz-range-thumb {
          transform: scale(1);
        }
        input[type="range"]::-moz-range-thumb {
          transform: scale(0);
        }
        input[type="range"]::-ms-thumb {
          width: 14px;
          height: 14px;
          position: relative;
          bottom: 1px;
          right: ${rightMargin};
          background: ${backgroundColor};
          border-radius: 50%;
        }
        input[type="range"]:hover::-ms-thumb {
          transform: scale(1);
        }
        input[type="range"]::-ms-thumb {
          transform: scale(0);
        }
      `}</style>
    </div>
  );
};

export default TrackProgress;
