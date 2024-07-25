// productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setIndex } from "./slideShowSlice";
import * as filterProductActions from "./filterProductSlice";

// Định nghĩa slice cho sản phẩm
const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    currentIndex: 0,
    selectedProductId: null,
  },
  reducers: {
    // Thiết lập ID sản phẩm được chọn
    setSelectedProductId: (state, action) => {
      state.selectedProductId = action.payload;
    },
    // Thêm các reducers cho chức năng lọc sản phẩm
    setFilterSizes: (state, action) => {
      filterProductActions.setFilterSizes(state, action);
    },
    setFilterColors: (state, action) => {
      filterProductActions.setFilterColors(state, action);
    },
    setFilterPrice: (state, action) => {
      filterProductActions.setFilterPrice(state, action);
    },
    setFilterKeyword: (state, action) => {
      filterProductActions.setFilterKeyword(state, action);
    },
    // Thêm reducers cho chức năng Thêm, Sửa, Xóa sản phẩm
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    updateProduct: (state, action) => {
      const updatedProduct = action.payload;
      const index = state.items.findIndex(
        (item) => item._id === updatedProduct._id
      );
      if (index !== -1) {
        state.items[index] = updatedProduct;
      }
    },
    deleteProduct: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item._id !== productId);
    },
  },
  extraReducers: (builder) => {
    // Xử lý các action pending, fulfilled, rejected cho fetchProducts và setIndex
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(setIndex, (state, action) => {
        const newIndex = action.payload;
        state.currentIndex = newIndex;
      })
      // Xử lý các action fulfilled của Thêm, Sửa, Xóa sản phẩm
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        const index = state.items.findIndex(
          (item) => item._id === updatedProduct._id
        );
        if (index !== -1) {
          state.items[index] = updatedProduct;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const productId = action.payload;
        state.items = state.items.filter((item) => item._id !== productId);
      });
  },
});

// Async thunk để lấy danh sách sản phẩm từ máy chủ
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/products");
      return response.data;
    } catch (error) {
      console.error("Lỗi khi tải danh sách sản phẩm:", error);
      throw error;
    }
  }
);

// Async thunk để thêm sản phẩm
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/products",
        productData
      );
      return response.data;
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      throw error;
    }
  }
);

// Async thunk để sửa sản phẩm
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (productData) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/products/${productData._id}`,
        productData
      );
      return response.data;
    } catch (error) {
      console.error("Lỗi khi sửa sản phẩm:", error);
      throw error;
    }
  }
);

// Async thunk để xóa sản phẩm
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${productId}`);
      return productId;
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      throw error;
    }
  }
);

// Xuất các action creators và selectors
export const {
  setSelectedProductId,
  setFilterSizes,
  setFilterColors,
  setFilterPrice,
  setFilterKeyword,
} = productSlice.actions;

// Xuất reducer lấy ID của sản phẩm được chọn từ trạng thái Redux
export const selectProductId = (state) => state.products.selectedProductId;

// Xuất reducer cho sản phẩm và chức năng lọc sản phẩm
export const selectFilterProducts = (state) => state.filterProducts;

// Xuất reducer cho sản phẩm
export default productSlice.reducer;
