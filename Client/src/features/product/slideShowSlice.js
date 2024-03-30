// slideshowSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Định nghĩa reducer và initialState cho slideshowSlice
const slideshowSlice = createSlice({
    name: 'slideshow',
    initialState: {
        currentIndexForNewProducts: 0,
        currentIndexForPremiumDresses: 0,
    },
    reducers: {
        setIndex: (state, action) => {
            const { productType, newIndex } = action.payload;
            if (productType === 'NewProducts') {
                state.currentIndexForNewProducts = newIndex;
            } else if (productType === 'PremiumDresses') {
                state.currentIndexForPremiumDresses = newIndex;
            }
        },
    },
});

// Action creator để chuyển đến slide trước đó
export const prevSlide = createAsyncThunk(
    'slideshow/prevSlide',
    async (productType, { dispatch, getState }) => {
        const state = getState();
        const currentIndex = state.slideshow[`currentIndexFor${productType}`];
        const newIndex = (currentIndex - 1 + 12) % 8;
        dispatch(slideshowSlice.actions.setIndex({ productType, newIndex }));
    }
);

// Action creator để chuyển đến slide tiếp theo
export const nextSlide = createAsyncThunk(
    'slideshow/nextSlide',
    async (productType, { dispatch, getState }) => {
        const state = getState();
        const currentIndex = state.slideshow[`currentIndexFor${productType}`];
        const newIndex = (currentIndex + 1) % 8;
        dispatch(slideshowSlice.actions.setIndex({ productType, newIndex }));
    }
);

// Xuất các action creators từ reducer
export const { setIndex } = slideshowSlice.actions;

export default slideshowSlice.reducer;
