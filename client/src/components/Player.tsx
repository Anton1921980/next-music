import {
  Pause,
  PlayArrow,
  SkipNext,
  SkipPrevious,
  ThumbDownAlt,
  ThumbUpAlt,
  ThumbUpOffAlt,
  VolumeUp,
} from "@mui/icons-material";
import { Box, Grid, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import styles from "../styles/Player.module.scss";
import TrackProgress from "./TrackProgress";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";
import { setVolume } from "@/store/actions-creators/player";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { NextThunkDispatch } from "@/store";
import { editTrack, fetchTracks } from "@/store/actions-creators/track";
import { useRouter } from "next/router";
import { fetchPlaylistTracks } from "@/store/actions-creators/playlist";

let audio; //in browser

const Player = ({ store }) => {
  
  const { pause, volume, duration, active, currentPlaylist, currentTime } =
    useTypedSelector((state) => state.player);
  const { tracks: playlistTracks, error: playlistTrackError } =
    useTypedSelector((state) => state.playlistTrack);
  const { tracks, error: trackError } = useTypedSelector(
    (state) => state.track
  );

  const router = useRouter();
  const dispatch = useDispatch() as NextThunkDispatch;

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
  console.log("pause: ", pause);
  const tracklist = playlistTracks?.find((track) => track._id === active?._id)
    ? playlistTracks
    : tracks;

  const playPrev = () => {
    let currentIndex = setActiveTrack;
    let prevTrackIndex =
      currentIndex > 0 ? currentIndex - 1 : tracklist.length - 1;
    let prevTrack = tracklist[prevTrackIndex];
    setActiveTrack(prevTrack);
    pauseTrack();
  };

  const playNext = () => {
    let currentIndex = tracklist.findIndex(
      (track) => track._id === active?._id
    );
    let nextTrackIndex =
      currentIndex < tracklist.length - 1 ? currentIndex + 1 : 0;
    let nextTrack = tracklist[nextTrackIndex];
    setActiveTrack(nextTrack);
    pauseTrack();
  };

  const addOrRemoveToPlaylist = async (e) => {
    e.stopPropagation();
    await dispatch(await editTrack(active?._id, "65607b03d37e11026be70623"));

    // Fetch the updated tracklist
    router.pathname !== "/tracks"
      ? await dispatch(await fetchTracks(`s=${currentPlaylist}`))
      : await dispatch(await fetchTracks());
    await dispatch(await fetchPlaylistTracks(currentPlaylist));  
  };

  useEffect(() => {
    // Update the active track
    const tracklist = playlistTracks?.find((track) => track._id === active?._id)
      ? playlistTracks
      : tracks;
    const updatedTrack = tracklist?.find(
      // tracklist
      (track) => track._id === active?._id
    );
    console.log("updatedTrack: ", updatedTrack);
    updatedTrack && setActiveTrack(updatedTrack);
  }, [tracks, playlistTracks]);

  console.log("currentPlaylist: ", currentPlaylist);

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
    }
  }, [active]);

  const setAudio = () => {
    if (active) {
      audio.src = process.env.NEXT_PUBLIC_SERVER_URL + "/" + active.audio;
      audio.volume = volume / 100; //must be from 0-1
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
        // audio.currentTime = 0; // Reset progress bar to the start
      };
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
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
    <div className={styles.playerContainer}>
      <TrackProgress
        progress={true}
        left={currentTime}
        right={duration}
        onChange={changeCurrentTime}
      />

      <div className={styles.player}>
        <Grid container-fluid>
          <IconButton onClick={playPrev}>
            <SkipPrevious />
          </IconButton>
          <IconButton onClick={play}>
            {!pause ? (
              <Pause sx={{ fontSize: "40px" }} />
            ) : (
              <PlayArrow sx={{ fontSize: "40px" }} />
            )}
          </IconButton>
          <IconButton onClick={playNext}>
            <SkipNext />
          </IconButton>
        </Grid>
        <Box sx={{ display: "flex" }}>
          {active?.picture && (
            <Image
              style={{ marginTop: "20px" }}
              width={50}
              height={50}
              src={process.env.NEXT_PUBLIC_SERVER_URL + "/" + active?.picture}
              alt=""
            />
          )}
          <Grid
            container
            direction="column"
            style={{
              width: 100,
              margin: "20px",
            }}
          >
            <div style={{ fontWeight: "600" }}>{active?.name}</div>
            <div style={{ fontSize: "12px", color: "gray" }}>
              {active?.artist}
            </div>
          </Grid>
          <IconButton onClick={addOrRemoveToPlaylist}>
            {active?.playlists?.find(
              (item) => item == "65607b03d37e11026be70623"
            ) ? (
              <ThumbUpAlt />
            ) : (
              <ThumbUpOffAlt />
            )}
          </IconButton>

          {/* <IconButton onClick={play}>
            <ThumbDownAlt />
          </IconButton> */}
        </Box>
        <div style={{ display: "flex", alignItems: "center" }}>
          <VolumeUp style={{ marginLeft: "auto" }} />
          <TrackProgress
            progress={false}
            left={volume}
            right={100}
            onChange={changeVolume}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
