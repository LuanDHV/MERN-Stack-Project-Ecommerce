// categorySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Action async để lấy danh mục từ máy chủ
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  try {
    const response = await axios.get('https://nemfashion-server.onrender.com/api/categories');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tải danh mục:', error);
    throw error;
  }
});

// Định nghĩa slice cho danh mục
const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Xử lý các action pending, fulfilled, và rejected cho fetchCategories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Xuất reducer cho danh mục
export default categorySlice.reducer;
