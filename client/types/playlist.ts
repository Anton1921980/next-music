export interface IPlaylist {
    _id: string;
    name: string;    
}

export interface PlaylistState {
    playlists: IPlaylist[];
    error: string;
}

export enum PlaylistActionTypes {
    FETCH_PLAYLISTS = 'FETCH_PLAYLISTS',
    DELETE_PLAYLIST = 'DELETE_PLAYLIST',
    FETCH_PLAYLISTS_ERROR = 'FETCH_PLAYLISTS_ERROR'
}

interface FetchPlaylistsAction {
    type: PlaylistActionTypes.FETCH_PLAYLISTS;
    payload: IPlaylist[]
}

interface DeletePlaylistAction {
    type: PlaylistActionTypes.DELETE_PLAYLIST;
    payload: number
}

interface FetchPlaylistsErrorAction {
    type: PlaylistActionTypes.FETCH_PLAYLISTS_ERROR;
    payload: string
}

export type PlaylistAction = FetchPlaylistsAction | DeletePlaylistAction | FetchPlaylistsErrorAction