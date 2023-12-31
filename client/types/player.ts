import { ITrack } from "./track";

export interface PlayerState {
    active: null | ITrack;
    volume: number;
    duration: number;
    currentTime: number;
    pause: boolean;
    currentPlaylist: null | number
    changeTheme: null | string;
}

export enum PlayerActionTypes {
    PLAY = "PLAY",
    PAUSE = "PAUSE",
    SET_ACTIVE = "SET_ACTIVE",
    SET_DURATION = "SET_DURATION",
    SET_CURRENT_TIME = "SET_CURRENT_TIME",
    SET_VOLUME = "SET_VOLUME",
    SET_CURRENT_PLAYLIST = "SET_CURRENT_PLAYLIST",
    SET_CHANGE_THEME = "SET_CHANGE_THEME",
}

interface PlayAction {
    type: PlayerActionTypes.PLAY;
}
interface PauseAction {
    type: PlayerActionTypes.PAUSE;
}
interface SetActiveAction {
    type: PlayerActionTypes.SET_ACTIVE;
    payload: ITrack;
}
interface SetDurationAction {
    type: PlayerActionTypes.SET_DURATION;
    payload: number;
}
interface SetCurrentTimeAction {
    type: PlayerActionTypes.SET_CURRENT_TIME;
    payload: number;
}
interface SetVolumeAction {
    type: PlayerActionTypes.SET_VOLUME;
    payload: number;
}
interface SetCurrentPlaylistAction {
    type: PlayerActionTypes.SET_CURRENT_PLAYLIST;
    payload: number;
}
interface SetChangeThemeAction {
    type: PlayerActionTypes.SET_CHANGE_THEME;
    payload: string;
}
export type PlayerAction =
    PlayAction |
    PauseAction |
    SetActiveAction |
    SetDurationAction |
    SetCurrentTimeAction |
    SetVolumeAction |
    SetCurrentPlaylistAction |
    SetChangeThemeAction
