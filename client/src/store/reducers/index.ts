// import { rootReducer } from './index';
import { combineReducers } from "redux";
import { playerReducer } from "./playerRreducer";
import {HYDRATE} from 'next-redux-wrapper';
import { trackReducer } from "./trackReducer";
import { playlistReducer } from "./playlistReducer";
import { playlistTrackReducer } from "./playlistTrackReducer";

 const rootReducer = combineReducers({
    player: playerReducer,
    track: trackReducer,
    playlist: playlistReducer,
    playlistTrack: playlistTrackReducer
})
export const reducer = (state:any, action:any) => {
    if (action.type === HYDRATE) {
      const nextState = {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      };
      if (state.count) nextState.count = state.count; // preserve count value on client side navigation
      return nextState;
    } else {
      return rootReducer(state, action);
    }
  };
  
export type RootState = ReturnType<typeof rootReducer>