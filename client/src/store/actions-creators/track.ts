import { Playlist } from './../../../../server/src/track/schemas/playlist.schema';
import axios from "axios";
import { TrackAction, TrackActionTypes } from "./../../../types/track";
import { Dispatch } from "react";

export const fetchTracks = (playlist: string) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await axios.get( process.env.NEXT_PUBLIC_SERVER_URL + "/tracks/?playlist=" + playlist );
            dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data });
            console.log("response TRACKS: ", response.data);
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: "tracks load error",
            });
            console.log("tracks load error", e);
        }
    };
};

export const searchTracks = (query: string) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/tracks/search?query=" + query);
            dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data });
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: "tracks load error",
            });
            console.log("tracks load error", e);
        }
    };
};


export const editTrack = (id: string|undefined, playlist: string) => {  
    return async (
        dispatch: Dispatch<TrackAction>
    ) => {
        try {            
            const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/tracks/${id}/?playlist=${playlist}`);
            console.log("response: ", response.data);
            dispatch({ type: TrackActionTypes.EDIT_TRACK, payload: response.data });
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: "EDIT error",
            });
            console.log("EDIT TRACK error", e);
        }
    };
};


export const deleteTrack = (id: number|string) => {
    console.log("id: ", id);
    return async (
        dispatch: Dispatch<TrackAction>
    ) => {
        try {
            console.log("id2: ", id);
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/tracks/${id}`);
            console.log("response: ", response.data);
            dispatch({ type: TrackActionTypes.DELETE_TRACK, payload: response.data });
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: "DELETE error",
            });
            console.log("DELETE load error", e);
        }
    };
};
