// detailProductSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductDetails = createAsyncThunk('productDetails/fetchProductDetails', async (productId) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product details for ID ${productId}:`, error);
    throw error;
  }
});

const detailProductSlice = createSlice({
  name: 'productDetails',
  initialState: {
    selectedProduct: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedProduct } = detailProductSlice.actions;
export const selectSelectedProduct = (state) => state.productDetails.selectedProduct;

export default detailProductSlice.reducer;
