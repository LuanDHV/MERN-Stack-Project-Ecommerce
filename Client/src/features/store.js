// store.js

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

// Tạo Redux store sử dụng rootReducer
const store = configureStore({
    // Sử dụng rootReducer để quản lý toàn bộ state
    reducer: rootReducer,
});

export default store;
