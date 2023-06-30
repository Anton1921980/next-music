// import React, {FC} from 'react';
// import {Provider} from 'react-redux';
// import {AppProps} from 'next/app';
// import {wrapper} from '../store';

// const MyApp: FC<AppProps> = ({Component, ...rest}) => {
//   const {store, props} = wrapper.useWrappedStore(rest);
//   return (
//     <Provider store={store}>
//       <Component {...props.pageProps} />
//     </Provider>
//   );
// };
// export default wrapper.withRedux(MyApp);

import React, {FC} from 'react';
import {AppProps} from 'next/app';
import {wrapper} from "../store";
import { PersistGate } from 'redux-persist/integration/react';

const WrappedApp: FC<AppProps> = ({Component, pageProps}) => (
    // <PersistGate >
    <Component {...pageProps} />
    // </PersistGate>
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



