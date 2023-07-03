export interface IComment {
    _id: string;
    userName: string;
    text: string
}

export interface ITrack {
    _id: string;
    name: string;
    artist: string;
    text: string;
    listens: number;
    picture: string;
    audio: string;
    comments: IComment[]
    playlists: string[];
}
export interface TrackState {
    tracks: ITrack[];
    error: string;
}

export enum TrackActionTypes {
    FETCH_TRACKS = 'FETCH_TRACKS',
    EDIT_TRACK = 'EDIT_TRACK',
    DELETE_TRACK = 'DELETE_TRACK',
    FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
    FETCH_PLAYLIST_TRACKS = 'FETCH_PLAYLIST_TRACKS'
}

interface FetchTracksAction {
    type: TrackActionTypes.FETCH_TRACKS;
    payload: ITrack[]
}
interface FetchPlaylistTracksAction {
    type: TrackActionTypes.FETCH_PLAYLIST_TRACKS;
    payload: ITrack[]
}
interface DeleteTrackAction {
    type: TrackActionTypes.DELETE_TRACK;
    payload: number
}
interface EditTrackAction {
    type: TrackActionTypes.EDIT_TRACK;
    payload: ITrack[]
}
interface FetchTracksErrorAction {
    type: TrackActionTypes.FETCH_TRACKS_ERROR;
    payload: string
}

export type TrackAction = FetchTracksAction | DeleteTrackAction | FetchTracksErrorAction | FetchPlaylistTracksAction | EditTrackAction