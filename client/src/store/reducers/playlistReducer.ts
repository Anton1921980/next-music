import { PlaylistAction, PlaylistActionTypes, PlaylistState } from "../../../types/playlist"

const initialState: PlaylistState = {
    playlists: [],
    error: ''
}

export const playlistReducer = (state = initialState, action: PlaylistAction) => {
    switch (action.type) {
        case PlaylistActionTypes.FETCH_PLAYLISTS_ERROR:
            return { ...state, error: action.payload }
        case PlaylistActionTypes.FETCH_PLAYLISTS:
            return { error: '', playlists: action.payload }
        case PlaylistActionTypes.DELETE_PLAYLIST:
            return { error: '', playlists: state.playlists.filter(playlist => playlist._id !== action.payload.toString()) } 
        
        default:
            return state
    }

}