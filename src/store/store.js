// // src/redux/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import colorReducer from '../store/reducers/ColorSlice';

// const store = configureStore({
//     reducer: {
//         color: colorReducer,
//     },
// });

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import combinedReducer from './combinedReducer'; // Import reducer đã kết hợp

const store = configureStore({
    reducer: combinedReducer,
});

export default store;
