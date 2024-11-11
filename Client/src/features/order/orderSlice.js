// orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Import thư viện axios hoặc thư viện HTTP client khác

const initialState = {
  userId: "",
  orders: [],
  products: [],
  userOrders: [],
  totalPrice: 0,
  fullName: "",
  email: "",
  phoneNumber: "",
  address: "",
  payment: "",
  status: "",
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateOrderInfo: (state, action) => {
      return {
        ...state,
        ...action.payload,
        status: "Đã đặt hàng, đợi xác nhận",
      };
    },
    clearOrder: () => {
      // Reset order state to initial values
      return initialState;
    },
    // Thêm reducers cho chức năng Thêm, Sửa, Xóa đơn hàng
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    updateOrder: (state, action) => {
      const updatedOrder = action.payload;
      const index = state.orders.findIndex(
        (order) => order._id === updatedOrder._id,
      );
      if (index !== -1) {
        state.orders[index] = updatedOrder;
      }
    },
    deleteOrder: (state, action) => {
      const orderId = action.payload;
      state.orders = state.orders.filter((order) => order._id !== orderId);
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý các action pending, fulfilled, rejected cho fetchOrders
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Xử lý các action pending, fulfilled, rejected cho fetchUserOrders
      .addCase(fetchUserOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Xử lý các action fulfilled của Thêm, Sửa, Xóa đơn hàng
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const index = state.orders.findIndex(
          (order) => order._id === updatedOrder._id,
        );
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        const orderId = action.payload;
        state.orders = state.orders.filter((order) => order._id !== orderId);
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        },
      );
  },
});

// Async thunk để lấy danh sách đơn hàng của người dùng từ máy chủ
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { getState }) => {
    const userId = getState().user.userId;
    try {
      const response = await axios.get(
        `http://localhost:8000/api/orders?userId=${userId}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user orders:", error);
      throw error;
    }
  },
);

// Async thunk để lấy danh sách đơn hàng của người dùng từ máy chủ
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/orders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
});

// Async thunk để thêm đơn hàng
export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async (orderData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/orders",
        orderData,
      );
      return response.data;
    } catch (error) {
      console.error("Error adding order:", error);
      throw error;
    }
  },
);

// Async thunk để cập nhật đơn hàng
export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async (orderData) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/orders/${orderData._id}`,
        orderData,
      );
      return response.data;
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  },
);

// Async thunk để xóa đơn hàng
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (orderId) => {
    try {
      await axios.delete(`http://localhost:8000/api/orders/${orderId}`);
      return orderId;
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  },
);

// Async thunk để gửi dữ liệu order lên API
export const postOrderToAPI = createAsyncThunk(
  "orders/postOrderToAPI",
  async (orderData) => {
    try {
      // Gửi yêu cầu POST đến API để tạo order
      const response = await axios.post(
        "http://localhost:8000/api/orders",
        orderData,
      );
      return response.data;
    } catch (error) {
      console.error("Error posting order to API:", error);
      throw error;
    }
  },
);

export const { updateOrderInfo, clearOrder } = orderSlice.actions;

export const selectOrder = (state) => state.order;

export default orderSlice.reducer;
