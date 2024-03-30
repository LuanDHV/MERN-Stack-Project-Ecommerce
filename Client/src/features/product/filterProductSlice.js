// filterProductSlice.js
import { createSlice } from '@reduxjs/toolkit';

const filterProductSlice = createSlice({
    name: 'filterProducts',
    initialState: {
        filterSizes: [],
        filterColors: [],
        filterPrice: null,
        filterKeyword: '',
    },
    reducers: {
        setFilterSizes: (state, action) => {
            state.filterSizes = action.payload;
        },
        setFilterColors: (state, action) => {
            state.filterColors = action.payload;
        },
        setFilterPrice: (state, action) => {
            state.filterPrice = action.payload;
        },
        setFilterKeyword: (state, action) => {
            state.filterKeyword = action.payload;
        },
    },
});

// Xuất action creators và selectors cho chức năng lọc sản phẩm
export const { setFilterSizes, setFilterColors, setFilterPrice, setFilterKeyword } = filterProductSlice.actions;
export const selectFilterProducts = (state) => state.filterProducts;

// Xuất reducer cho chức năng lọc sản phẩm
export default filterProductSlice.reducer;
