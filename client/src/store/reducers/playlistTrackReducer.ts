import { TrackAction, TrackActionTypes, TrackState } from "../../../types/track"

const initialState: TrackState = {
    tracks: [],
    error: ''
}

export const playlistTrackReducer = (state = initialState, action: TrackAction) => {
    switch (action.type) {
        case TrackActionTypes.FETCH_TRACKS_ERROR:
            return { ...state, error: action.payload }
        case TrackActionTypes.FETCH_PLAYLIST_TRACKS:
            return { error: '', tracks: action.payload }
        // case TrackActionTypes.DELETE_TRACK:
        //     return { error: '',tracks: state.tracks.filter(track => track._id != action.payload) } 
        
        default:
            return state
    }

}