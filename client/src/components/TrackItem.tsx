import React from "react";
import { ITrack } from "../types/track";
import { Box, Grid, Card, IconButton } from "@mui/material";
import { Book, Delete, Pause, PlayArrow } from "@mui/icons-material";
import styles from "../styles/TrackItem.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { useActions } from "@/hooks/useActions";

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({
  track,
  active = false,
  key,
}) => {
  const router = useRouter();

  const { playTrack, pauseTrack, setActiveTrack } = useActions();

  const play = (e) => {
    e.stopPropagation();
    setActiveTrack(track);
    playTrack();
  };

  return (
    <Card
      className={styles.track}
      onClick={() => router.push("/tracks/" + track._id)}
    >
      <IconButton onClick={play}>
        {active ? <Pause /> : <PlayArrow />}
      </IconButton>
      {track?.picture && (
        <Image
          width={70}
          height={70}
          src={"http://localhost:5000/" + track.picture}
          alt=""
        />
      )}
      <Grid container direction="column" style={{ width: 200, margin: "20px" }}>
        <div>{track.name}</div>
        <div style={{ fontSize: "12px", color: "gray" }}>{track.artist}</div>
      </Grid>
      <IconButton
        onClick={(e) => e.stopPropagation()}
        style={{ marginLeft: "auto" }}
      >
        <Delete />
      </IconButton>
    </Card>
  );
};

export default TrackItem;
