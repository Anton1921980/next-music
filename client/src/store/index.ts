
import { createStore, Store, applyMiddleware, AnyAction } from "redux";
import {createWrapper, Context} from 'next-redux-wrapper';
import { reducer, RootState } from "./reducers";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";

// create a makeStore function
const makeStore = (context: Context) => createStore(reducer,applyMiddleware(thunk));

// export an assembled wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore, {debug: true});

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>