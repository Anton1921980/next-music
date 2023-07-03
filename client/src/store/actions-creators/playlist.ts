import axios from "axios";
import { Dispatch } from "react";
import { PlaylistAction, PlaylistActionTypes } from "../../../types/playlist";
import { TrackAction, TrackActionTypes } from "../../../types/track";


export const fetchPlaylistTracks = (playlist: any) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/tracks/?playlist=" + playlist);
            dispatch({ type: TrackActionTypes.FETCH_PLAYLIST_TRACKS, payload: response.data });
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: "tracks load error",
            });
            console.log("tracks load error", e);
        }
    };
};

export const fetchPlaylists = () => {
    return async (dispatch: Dispatch<PlaylistAction>) => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/tracks/playlists");
            dispatch({ type: PlaylistActionTypes.FETCH_PLAYLISTS, payload: response.data });
            console.log("response PLAYLISTS: ", response.data);
        } catch (e) {
            dispatch({
                type: PlaylistActionTypes.FETCH_PLAYLISTS_ERROR,
                payload: "PLAYLISTS load error",
            });
            console.log("PLAYLISTS load error", e);
        }
    };
};

export const deletePlaylist = (id: number) => {
    console.log("id: ", id);
    return async (
        dispatch: Dispatch<PlaylistAction>
    ) => {
        try {
            console.log("id2: ", id);
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/tracks/playlists/${id}`);
            console.log("response: ", response.data);
            dispatch({ type: PlaylistActionTypes.DELETE_PLAYLIST, payload: response.data });
        } catch (e) {
            dispatch({
                type: PlaylistActionTypes.FETCH_PLAYLISTS_ERROR,
                payload: "DELETE error",
            });
            console.log("DELETE load error", e);
        }
    };
};
