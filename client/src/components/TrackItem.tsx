import React, { useEffect, useState } from "react";

import {
  Grid,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Tooltip,
  ListItem,
  Divider,
  ListSubheader,
} from "@mui/material";
import {
  Add,
  Delete,
  Pause,
  PlayArrow,
  PlaylistAdd,
  PlaylistRemove,
  Remove,
  ThumbUpAlt,
  ThumbUpOffAlt,
} from "@mui/icons-material";
import styles from "../styles/TrackItem.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { useActions } from "@/hooks/useActions";
import { useDispatch } from "react-redux";
import { NextThunkDispatch, wrapper } from "@/store";
import { useTypedSelector } from "@/hooks/useTypedSelector";

import {
  addOrRemoveToPlaylist,
  delTrack,
  handleChange,
  play,
} from "@/helpers/trackFunctions";

import { IPlaylist } from "../../types/playlist";
import { ITrack } from "../../types/track";

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

  const [playlistChosen, setPlaylistChosen] = React.useState("");
  const [openAdd, set$openAdd] = React.useState(false);
  const [openRemove, set$openRemove] = React.useState(false);

  const dispatch = useDispatch() as NextThunkDispatch;

  const handlePlay = (e:any) => {
    play(e, setActiveTrack, pauseTrack, track);
  };

  const handleDeleteTrack = async (e:any) => {
    await delTrack(e, dispatch, track);
  };

  const handleAddOrRemoveToPlaylist = async (e:any) => {
    await addOrRemoveToPlaylist(
      e,
      dispatch,
      track,
      playlist,
      playlists,
      router
    );
  };

  const handleInputChange = (e:any) => {
    handleChange(
      e,
      setPlaylistChosen,
      handleAddOrRemoveToPlaylist,
      handleClose
    );
  };

  const handleOpen = (e:any) => {
    e.stopPropagation();
    e.currentTarget.value === "add" ? set$openAdd(true) : set$openRemove(true);
    console.log(" e.target.value: ", e);
  };

  const handleClose = (e:any) => {
    e.stopPropagation();
    openAdd ? set$openAdd(false) : set$openRemove(false);
  };

  return (
    <>
      <ListItem
        selected={active?._id === track._id ? true : false}
        sx={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0))",
          lineHeight: "1",
          height: "50px",
        }}
        className={styles.track}
        onClick={() => router.push("/tracks/" + track._id)}
      >
        <IconButton onClick={handlePlay}>
          {active?._id === track._id ? <Pause /> : <PlayArrow />}
        </IconButton>
        {track?.picture && (
          <img
            width={40}
            height={40}
            src={process.env.NEXT_PUBLIC_SERVER_URL + "/" + track.picture}
            alt=""
          />
        )}
        <Grid
          container
          direction="row"
          style={{ width: "500px", margin: "30px" }}
        >
          <div style={{ width: "300px" }}>{track.name}</div>
          <div
            style={{
              width: "200px",
              fontSize: "12px",
              fontWeight: "600",
              color: "gray",
              textTransform: "uppercase",
            }}
          >
            {track.artist}
          </div>
        </Grid>

        <div style={{ width: "180px", marginLeft: "auto" }}>
          <IconButton onClick={handleInputChange}>
            {track?.playlists?.find(
              (item) => item === "65607b03d37e11026be70623"
            ) ? (
              <ThumbUpAlt />
            ) : (
              <ThumbUpOffAlt />
            )}
          </IconButton>
          <Tooltip title="Add to Playlists">
            <IconButton
              onClick={handleOpen}
              style={{ marginLeft: "auto" }}
              value="add"
            >
              <PlaylistAdd />
            </IconButton>
          </Tooltip>
          <Tooltip title=" Remove from Playlists">
            <IconButton
              onClick={handleOpen}
              style={{ marginLeft: "auto" }}
              value="remove"
            >
              <PlaylistRemove />
            </IconButton>
          </Tooltip>
          {openAdd && (
            <FormControl>
              <Select
                MenuProps={{
                  PaperProps: {
                    style: {
                      overflowY: "scroll",
                      maxHeight: "200px",
                      scrollbarWidth: "thin",
                    },
                  },
                }}
                sx={{
                  position: "absolute",
                  width: "220px",
                  right: "0px",
                  ".MuiOutlinedInput-notchedOutline": { borderStyle: "none" },
                }}
                open={openAdd}
                onClose={handleClose}
                onOpen={handleOpen}
                value={playlistChosen}
                onChange={handleInputChange}
                inputProps={{ IconComponent: () => null }}
              >
                <ListSubheader sx={{ fontSize: "14px" }}>
                  add to Playlist:
                </ListSubheader>
                {playlists
                  ?.filter((item:IPlaylist) => !track.playlists.includes(item._id))
                  .map((item:IPlaylist) => (
                    <MenuItem key={item._id} value={item._id}>
                      <Add />
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}

          {openRemove && (
            <FormControl>
              <Select
                MenuProps={{
                  PaperProps: {
                    style: {
                      overflowY: "scroll",
                      maxHeight: "200px",
                      scrollbarWidth: "thin",
                    },
                  },
                }}
                sx={{
                  position: "absolute",
                  right: "0px",
                  width: "220px",
                  ".MuiOutlinedInput-notchedOutline": { borderStyle: "none" },
                }}
                open={openRemove}
                onClose={handleClose}
                onOpen={handleOpen}
                value={playlistChosen}
                onChange={handleInputChange}
                inputProps={{ IconComponent: () => null }}
              >
                <ListSubheader sx={{ fontSize: "14px" }}>
                  remove from Playlist:
                </ListSubheader>
                {playlists
                  ?.filter((item:IPlaylist) => track?.playlists?.includes(item._id))
                  .map((item:IPlaylist) => (
                    <MenuItem key={item._id} value={item._id}>
                      <Remove /> {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}

          <Tooltip title="Delete from Server">
            <IconButton
              onClick={handleDeleteTrack}
              style={{ marginLeft: "auto" }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </div>
      </ListItem>
      <Divider />
    </>
  );
};

export default TrackItem;
