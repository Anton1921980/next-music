import { playTrack } from './../actions-creators/player';
import { TrackAction, TrackActionTypes, TrackState } from "../../../types/track"

const initialState: TrackState = {
    tracks: [],    
    error: ''
}

export const trackReducer = (state = initialState, action: TrackAction) => {
    switch (action.type) {
        case TrackActionTypes.FETCH_TRACKS_ERROR:
            return { ...state, error: action.payload }
        case TrackActionTypes.FETCH_TRACKS:
            return { error: '', tracks: action.payload }
        case TrackActionTypes.EDIT_TRACK:
            return { error: '', tracks: state.tracks.filter(track => track._id != action.payload.toString())}
        case TrackActionTypes.DELETE_TRACK:
            return { error: '', tracks: state.tracks.filter(track => track._id != action.payload.toString()) }

        default:
            return state
    }

}