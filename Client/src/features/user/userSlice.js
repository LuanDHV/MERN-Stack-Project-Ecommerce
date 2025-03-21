// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Slice user
export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    userId: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).userId
      : null, // Thông tin userId
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null, // Thông tin người dùng (nếu đã đăng nhập)
    loading: false, // Trạng thái loading khi thực hiện các thao tác async
    error: null, // Lưu lỗi khi có lỗi xảy ra
  },
  reducers: {
    // Action đồng bộ để đăng xuất người dùng
    logoutUser: (state) => {
      state.user = null;
      state.userId = null;
      // Xóa thông tin người dùng khỏi localStorage khi đăng xuất
      localStorage.removeItem("user");
    },
    // Action đồng bộ để cập nhật thông tin người dùng
    setUser: (state, action) => {
      state.user = action.payload;
      state.userId = action.payload.userId;
      // Cập nhật thông tin người dùng trong localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    // Thêm reducers cho chức năng Thêm, Sửa, Xóa người dùng
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      const index = state.users.findIndex(
        (user) => user.userId === updatedUser.userId,
      );
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
    },
    deleteUser: (state, action) => {
      const userId = action.payload;
      state.users = state.users.filter((user) => user.userId !== userId);
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý các action pending, fulfilled, rejected cho fetchUserUsers
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Xử lý khi action đăng ký người dùng hoàn thành
      .addCase(registerUser.fulfilled, (state, action) => {
        // state.user = action.payload.user;
      })
      // Xử lý khi action đăng nhập người dùng hoàn thành
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      // Xử lý các action fulfilled của Thêm, Sửa, Xóa người dùng
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.users.findIndex(
          (user) => user.userId === updatedUser.userId,
        );
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const userId = action.payload;
        state.users = state.users.filter((user) => user.userId !== userId);
      })
      // Xử lý khi có lỗi xảy ra trong các action async
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.payload;
        },
      );
  },
});

// Async thunk để lấy danh sách người dùng từ máy chủ
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/users");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tải danh sách user:", error);
    throw error;
  }
});

// Action async để thêm người dùng
export const addUser = createAsyncThunk("users/addUser", async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/users/register",
      userData,
    );
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
});

// Action async để cập nhập người dùng
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (userData) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/users/${userData._id}`,
        userData,
      );
      const user = response.data.loginData;

      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem("user", JSON.stringify(user));
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },
);

// Action async để xóa người dùng
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${userId}`);
      return userId;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },
);

// Action async để đăng ký người dùng
export const registerUser = createAsyncThunk(
  "users/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/register",
        userData,
      );
      const user = response.data;
      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (error) {
      console.error("Lỗi từ máy chủ:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

// Action async để đăng nhập người dùng
export const loginUser = createAsyncThunk(
  "users/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/login",
        loginData,
      );
      const user = response.data.loginData;

      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (error) {
      console.error("Lỗi từ máy chủ:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

// Export các action và reducer
export const selectUser = (state) => state.user.user;
export const { logoutUser, setUser } = userSlice.actions;
export default userSlice.reducer;
