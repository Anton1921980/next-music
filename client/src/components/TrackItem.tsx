import React from "react";
import { ITrack } from "../types/track";
import { Box, Grid, Card, IconButton } from "@mui/material";
import { Book, Delete, Pause, PlayArrow, PlaylistAdd, PlaylistRemove } from "@mui/icons-material";
import styles from "../styles/TrackItem.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { useActions } from "@/hooks/useActions";
import axios from "axios";
import { deleteTrack, editTrack, fetchTracks } from "@/store/actions-creators/track";
import { useDispatch } from "react-redux";
import { NextThunkDispatch } from "@/store";

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
  playlist: number;
}

const TrackItem: React.FC<TrackItemProps> = ({
  track,
  active = false,  
  playlist
}) => {

  const router = useRouter();

  const { playTrack, pauseTrack, setActiveTrack } = useActions();

  const dispatch = useDispatch() as NextThunkDispatch;

  const play = (e) => {
    e.stopPropagation();
    setActiveTrack(track);
    playTrack();
  };
  const delTrack =  async (e) => {
    e.stopPropagation();
    await dispatch(await deleteTrack(track._id));
    // await dispatch(await fetchTracks());//only delete from store not reload from server
  };
  
  const addOrRemoveToPlaylist = async(e) =>{
    e.stopPropagation();
    await dispatch(await editTrack(track._id, playlist));
    console.log("track._id, playlist: ", track._id, playlist);
  }

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
          width={50}
          height={50}
          src={"http://localhost:5000/" + track.picture}
          alt=""
        />
      )}
      <Grid container direction="column" style={{ width: 200, margin: "10px" }}>
        <div>{track.name}</div>
        <div style={{ fontSize: "12px", fontWeight:"600", color: "gray", textTransform: 'uppercase' }}>{track.artist}</div>
      </Grid>
      <div style={{width:'100px',marginLeft: "auto"}}>
      <IconButton
        onClick={addOrRemoveToPlaylist}
        style={{ marginLeft: "auto" }}
      >
        <PlaylistAdd />
      </IconButton>
      <IconButton
        onClick={addOrRemoveToPlaylist}
        style={{ marginLeft: "auto" }}
      >
        <PlaylistRemove />
      </IconButton>
      </div>
      <IconButton
        onClick={delTrack}
        style={{ marginLeft: "auto" }}
      >
        <Delete />
      </IconButton>
    </Card>
  );
};

export default TrackItem;
