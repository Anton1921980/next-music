import React, { useEffect, useState } from "react";
import { ITrack } from "../types/track";
import {
  Box,
  Grid,
  Card,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Tooltip,
  ListItem,
} from "@mui/material";
import {
  Add,
  Book,
  Delete,
  Pause,
  PlayArrow,
  PlaylistAdd,
  PlaylistRemove,
  Remove,
  ThumbDownAlt,
  ThumbDownOffAlt,
  ThumbUpAlt,
  ThumbUpOffAlt,
} from "@mui/icons-material";
import styles from "../styles/TrackItem.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { useActions } from "@/hooks/useActions";
import axios from "axios";
import {
  deleteTrack,
  editTrack,
  fetchTracks,
} from "@/store/actions-creators/track";
import { useDispatch } from "react-redux";
import { NextThunkDispatch, wrapper } from "@/store";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { fetchPlaylistTracks } from "@/store/actions-creators/playlist";
import { setActiveTrack } from "@/store/actions-creators/player";

interface TrackItemProps {
  track: ITrack;
  // active?: boolean;
  playlist: any;
  playlists: any;
}

const TrackItem: React.FC<TrackItemProps> = ({
  track,
  // active = false,
  playlist,
  playlists,
}) => {
  const router = useRouter();

  const { playTrack, pauseTrack, setActiveTrack } = useActions();
  const { active } = useTypedSelector((state) => state.player);
  const { tracks, error: trackError } = useTypedSelector(
    (state) => state.track
  );
  const dispatch = useDispatch() as NextThunkDispatch;

  const play = (e) => {
    e.stopPropagation();
    setActiveTrack(track);
    pauseTrack();
  };
  const delTrack = async (e) => {
    e.stopPropagation();
    await dispatch(await deleteTrack(track._id));
    // await dispatch(await fetchTracks());//only delete from store not reload from server
  };
console.log('playlists',playlists)
  const [playlistChosen, setPlaylistChosen] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const addOrRemoveToPlaylist = async (e) => {
    e.stopPropagation();
    await dispatch(
      await editTrack(
        track._id,
        e.target.value || playlists?.find((item) => item.name === "Liked")?._id
      )
    );
    console.log("e.target.value: ", e.target.value);
    console.log("track._id: ", track._id);
    console.log("playlistaaa: ", playlist);

    router.pathname !== "/tracks"
      ? await dispatch(await fetchTracks(`s=${playlist}`))     
      : await dispatch(await fetchTracks());
    await dispatch(await fetchPlaylistTracks(playlist));
  };



  const handleChange = (e) => {
    e.stopPropagation();
    setPlaylistChosen(e.target.value);
    addOrRemoveToPlaylist(e);
    setPlaylistChosen("");
    handleClose;
  };

  const handleOpen = (e) => {
    e.stopPropagation(e);
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };
console.log("track.playlists",track.playlists)
  return (
    <ListItem
      selected={active?._id === track._id ? true : false}
      sx={{
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0))",
      }}
      className={styles.track}
      onClick={() => router.push("/tracks/" + track._id)}
    >
      <IconButton onClick={play}>
        {active?._id === track._id ? <Pause /> : <PlayArrow />}
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
        <div
          style={{
            fontSize: "12px",
            fontWeight: "600",
            color: "gray",
            textTransform: "uppercase",
          }}
        >
          {track.artist}
        </div>
      </Grid>
      <IconButton onClick={addOrRemoveToPlaylist}>
      {track?.playlists?.find(item=>item==='65607b03d37e11026be70623')?<ThumbUpAlt />:<ThumbUpOffAlt />}
      </IconButton>

      <IconButton onClick={addOrRemoveToPlaylist}>
        {/* <ThumbDownOffAlt /><ThumbDownAlt /> */}
      </IconButton>
      <div style={{ width: "100px", marginLeft: "auto" }}>
        <Tooltip title="Add / Remove from Playlists">
          <IconButton onClick={handleOpen} style={{ marginLeft: "auto" }}>
            <PlaylistAdd />
          </IconButton>
        </Tooltip>
        {open && (
          <FormControl>
            <Select
              sx={{
                ".MuiOutlinedInput-notchedOutline": { borderStyle: "none" },
              }}
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={playlistChosen}
              onChange={handleChange}
              inputProps={{ IconComponent: () => null }}
            >
              {playlists
                ?.filter((item) => !track.playlists.includes(item._id))
                .map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    <Add />
                    {item.name}
                  </MenuItem>
                ))}
              {playlists
                ?.filter((item) => track.playlists.includes(item._id))
                .map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    <Remove /> {item.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}
      </div>
      {/* {!track?.playlists?.find(item=>item==playlist) ? (
          <IconButton
            onClick={addOrRemoveToPlaylist}
            style={{ marginLeft: "auto" }}
          >
            <PlaylistAdd />
          </IconButton>
        ) : (
          <IconButton
            onClick={addOrRemoveToPlaylist}
            style={{ marginLeft: "auto" }}
          >
            <PlaylistRemove />
          </IconButton>
        )}
      </div> */}
      <Tooltip title="Delete from Server">
        <IconButton onClick={delTrack} style={{ marginLeft: "auto" }}>
          <Delete />
        </IconButton>
      </Tooltip>
    </ListItem>
  );
};

export default TrackItem;

// export const getServerSideProps = wrapper.getServerSideProps(
//   async ({ store }) => {
//     const dispatch = store?.dispatch as NextThunkDispatch;

//     await dispatch(await setActiveTrack(track));
//   }
// );
