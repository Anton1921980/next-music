
import {
    deleteTrack,
    editTrack,
    fetchTracks,
  } from "@/store/actions-creators/track";
  import { fetchPlaylistTracks } from "@/store/actions-creators/playlist";


export const play = (e, setActiveTrack, pauseTrack, track) => {
    e.stopPropagation();
    setActiveTrack(track);
    pauseTrack();
  };
  
  export const delTrack = async (e, dispatch, track) => {
    e.stopPropagation();
    await dispatch(await deleteTrack(track?._id));
  };

  export const addOrRemoveToPlaylist = async (e, dispatch, track, playlist, playlists, router) => {
    e.stopPropagation();
    await dispatch(
      await editTrack(
        track?._id,
        e.target.value || playlists?.find((item) => item.name === "Liked")?._id
      )
    );
    router.pathname !== "/tracks"
      ? await dispatch(await fetchTracks(`s=${playlist}`))     
      : await dispatch(await fetchTracks());
    await dispatch(await fetchPlaylistTracks(playlist));
  };
  
  export const handleChange = (e, setPlaylistChosen, addOrRemoveToPlaylist, handleClose) => {
    e.stopPropagation();
    setPlaylistChosen(e.target.value);
    addOrRemoveToPlaylist(e);
    setPlaylistChosen("");
    handleClose;
  };