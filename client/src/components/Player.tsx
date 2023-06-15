import { Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import styles from "../styles/Player.module.scss";
import TrackProgress from "./TrackProgress";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";
import { setVolume } from "@/store/actions-creators/player";

let audio; //in browser

const Player = () => {
  // const track: ITrack = {
  //   name: "track3",
  //   artist: "Coolio",
  //   comments: [{ username: "www", text: "ewftrrrrrrrr" }],
  //   text: "lorem ipsum dolor sit amet, consectetur",
  //   audio:
  //     "http://localhost:5000/audio/e831bbb5-5b01-4aa7-8bec-95d3554a9c97.mp3",
  // };
  const { pause, volume, duration, active, currentTime } = useTypedSelector(
    (state) => state.player
  );
  const {
    pauseTrack,
    playTrack,
    setVolume,
    setCurrentTime,
    setDuration,
    setActiveTrack,
  } = useActions();

  const play = () => {
    if (pause) {
      playTrack();
      audio.play();
    } else {
      pauseTrack();
      audio.pause();
    }
  };
  
  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
      // or play() if you want not to play immediately
      playTrack();
      audio.play();
    }
  }, [active]);
  console.log("active: ", active);

  const setAudio = () => {
    if (active) {
      audio.src = 'http://localhost:5000/' + active.audio;
      audio.volume = volume / 100; //must be from 0-1
      const minSec = (s) => {
        return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
      }; //minutes seconds format

      audio.onloadedmetadata = () => {
        setDuration(minSec(Math.ceil(audio.duration)));
      };
      audio.ontimeupdate = () => {
        setCurrentTime(minSec(Math.ceil(audio.currentTime)));
      };
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target?.value) / 100;
    setVolume(Number(e.target?.value));
  };

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target?.value);
    setCurrentTime(Number(e.target?.value));
  };
  if (!active) {
    return null;
  }
  return (
    <div className={styles.player}>
      <IconButton onClick={play}>
        {!pause ? <Pause /> : <PlayArrow />}
      </IconButton>
      <Grid container direction="column" style={{ width: 200, margin: "20px" }}>
        <div>{active?.name}</div>
        <div style={{ fontSize: "12px", color: "gray" }}>{active?.artist}</div>
      </Grid>
      <TrackProgress
        left={currentTime}
        right={duration}
        onChange={changeCurrentTime}
      />
      <VolumeUp style={{ marginLeft: "auto" }} />
      <TrackProgress left={volume} right={100} onChange={changeVolume} />
    </div>
  );
};

export default Player;
