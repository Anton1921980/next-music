import axios from "axios";
import { TrackAction, TrackActionTypes } from "./../../../types/track";
import { Dispatch } from "react";

export const fetchTracks = () => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await axios.get("http://localhost:5000/tracks");
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

export const searchTracks = (query:string) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await axios.get("http://localhost:5000/tracks/search?query=" + query);
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
