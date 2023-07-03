
import {
    deleteTrack,
    editTrack,
    fetchTracks,
  } from "@/store/actions-creators/track";
  import { fetchPlaylistTracks } from "@/store/actions-creators/playlist";
import { ITrack } from "../../types/track";
import { IPlaylist } from "../../types/playlist";


export const play = (e:any, setActiveTrack:any, pauseTrack:any, track:ITrack) => {
    e.stopPropagation();
    setActiveTrack(track);
    pauseTrack();
  };
  
  export const delTrack = async (e:any, dispatch:any, track:ITrack) => {
    e.stopPropagation();
    await dispatch(await deleteTrack(track?._id));
  };

  export const addOrRemoveToPlaylist = async (e:any, dispatch:any, track:ITrack, playlist:any, playlists:any, router:any) => {
    e.stopPropagation();
    await dispatch(
      await editTrack(
        track?._id,
        e.target.value || playlists?.find((item:any) => item.name === "Liked")?._id
      )
    );
    router.pathname !== "/tracks"
      ? await dispatch(await fetchTracks(`s=${playlist}`))     
      : await dispatch(await fetchTracks(""));
    await dispatch(await fetchPlaylistTracks(playlist));
  };
  
  export const handleChange = (e:any, setPlaylistChosen:any, addOrRemoveToPlaylist:any, handleClose:any) => {
    e.stopPropagation();
    setPlaylistChosen(e.target.value);
    addOrRemoveToPlaylist(e);
    setPlaylistChosen("");
    handleClose;
  };