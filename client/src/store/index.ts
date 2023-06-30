
import { createStore, Store, applyMiddleware, AnyAction } from "redux";
import {createWrapper, Context} from 'next-redux-wrapper';
import { reducer, RootState } from "./reducers";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";

// create a makeStore function
const makeStore = (context: Context) => createStore(reducer,applyMiddleware(thunk));

// export an assembled wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore, {debug: true});

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>




// import { createStore, Store, applyMiddleware, AnyAction } from "redux";

// import { createWrapper, Context } from 'next-redux-wrapper';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
// import { reducer, RootState } from "./reducers";

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, reducer);

// // create a makeStore function
// const makeStore = (context: Context) => {
//   let store = createStore(persistedReducer, applyMiddleware(thunk));
//   return store;
// };

// let store;
// let persistor;

// if (typeof window !== "undefined") {
//   store = makeStore();
//   persistor = persistStore(store);
// }

// // export an assembled wrapper
// export const wrapper = createWrapper<Store<RootState>>(makeStore, {debug: true});

// export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>

// export { store, persistor };



// import { applyMiddleware, createStore } from "redux";
// import { createWrapper } from "next-redux-wrapper";
// import thunkMiddleware from "redux-thunk";
// import createWebStorage from "redux-persist/lib/storage/createWebStorage";
// import { reducer, RootState } from "./reducers";

// const bindMiddleware = (middleware) => {
//   if (process.env.NODE_ENV !== "production") {
//     const { composeWithDevTools } = require("redux-devtools-extension");
//     return composeWithDevTools(applyMiddleware(...middleware));
//   }
//   return applyMiddleware(...middleware);
// };

// const createNoopStorage = () => {
//   return {
//     getItem(_key) {
//       return Promise.resolve(null);
//     },
//     setItem(_key, value) {
//       return Promise.resolve(value);
//     },
//     removeItem(_key) {
//       return Promise.resolve();
//     },
//   };
// };

// const makeStore = ({ isServer }) => {
//   if (isServer) {
//     return createStore(reducer, bindMiddleware([thunkMiddleware]));
//   } else {
//     const { persistStore, persistReducer } = require("redux-persist");

//     const storage =
//       typeof window !== "undefined"
//         ? createWebStorage("local")
//         : createNoopStorage();
//     const persistConfig = {
//       key: "myProject",
//       whitelist: ["visitedProducts", "user", "cart"],
//       storage,
//     };

//     const persistedReducer = persistReducer(persistConfig,reducer);
//     const store = createStore(
//       persistedReducer,
//       bindMiddleware([thunkMiddleware])
//     );

//     store.__persistor = persistStore(store);

//     return store;
//   }
// };

// export const wrapper = createWrapper(makeStore, {
//   debug: false,
// });