import { Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import React from "react";
import styles from "../styles/Player.module.scss";
import TrackProgress from "./TrackProgress";

const Player = () => {
  const active = false;
  const track: ITrack = {
    name: "track3",
    artist: "Coolio",
    comments: [{ username: "www", text: "ewftrrrrrrrr" }],
    text: "lorem ipsum dolor sit amet, consectetur",
  };
  return (
    <div className={styles.player}>
      <IconButton onClick={(e) => e.stopPropagation()}>
        {active ? <Pause /> : <PlayArrow />}
      </IconButton>
      <Grid container direction="column" style={{ width: 200, margin: "20px" }}>
        <div>{track.name}</div>
        <div style={{ fontSize: "12px", color: "gray" }}>{track.artist}</div>
      </Grid>
      <TrackProgress left={0} right={100} onChange={()=>{}}/>
      <VolumeUp style={{marginLeft:"auto"}}/>
      <TrackProgress left={0} right={100} onChange={()=>{}}/>
    </div>
  );
};

export default Player;
