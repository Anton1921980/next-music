import React, {FC} from 'react';
import {AppProps} from 'next/app';
import {wrapper} from "../store";
import '@/styles/globals.css';

const WrappedApp: FC<AppProps> = ({Component, pageProps}) => (
    <Component {...pageProps} />
);

export default wrapper.withRedux(WrappedApp);

// import React, {FC, useEffect, useState} from 'react';
// import {AppProps} from 'next/app';
// import {wrapper} from "../store";
// import { PersistGate } from 'redux-persist/integration/react';
// import { useSelector } from 'react-redux';

// const selectPersistor = state => state.__persistor;

// const WrappedApp: FC<AppProps> = ({Component, pageProps}) => {
//     const [isReady, setIsReady] = useState(false);
//     const persistor = useSelector(selectPersistor);

//     useEffect(() => {
//         if (persistor) {
//             setIsReady(true);
//         }
//     }, [persistor]);

//     return isReady ? (
//         <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
//             <Component {...pageProps} />
//         </PersistGate>
//     ) : (
//         <Component {...pageProps} />
//     );
// }

// export default wrapper.withRedux(WrappedApp);
