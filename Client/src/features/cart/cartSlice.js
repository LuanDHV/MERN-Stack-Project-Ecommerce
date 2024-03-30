// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Mảng chứa các sản phẩm trong giỏ hàng
        totalItems: 0,
        totalCartPrice: 0,
        selectedSize: null,
    },
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item._id === newItem._id);

            if (existingItem) {
                // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên 1
                existingItem.quantity += 1;
                // Cập nhật tổng giá của sản phẩm khi tăng số lượng
                existingItem.totalPrice = existingItem.price * existingItem.quantity;
            } else {
                // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới vào mảng
                state.items.push({ ...newItem, quantity: 1, totalPrice: newItem.price });
                // Tăng totalItems khi thêm một sản phẩm mới
                state.totalItems += 1;
            }

            // Cập nhật tổng giá của giỏ hàng
            state.totalCartPrice = state.items.reduce((total, item) => total + item.totalPrice, 0);
        },
        removeFromCart: (state, action) => {
            const itemIdToRemove = action.payload;
            const itemIndex = state.items.findIndex(item => item._id === itemIdToRemove);

            if (itemIndex !== -1) {
                // Giảm số lượng sản phẩm khi xóa
                state.totalItems -= state.items[itemIndex].quantity;
                // Giảm tổng giá của giỏ hàng khi xóa sản phẩm
                state.totalCartPrice -= state.items[itemIndex].totalPrice;
                // Xóa sản phẩm khỏi mảng items
                state.items.splice(itemIndex, 1);
            }
        },
        updateCartItemQuantity: (state, action) => {
            const { itemID, newQuantity } = action.payload;
            const selectedItem = state.items.find(item => item._id === itemID);

            if (selectedItem) {
                // Cập nhật số lượng sản phẩm
                selectedItem.quantity = newQuantity;
                // Cập nhật tổng giá của sản phẩm khi thay đổi số lượng
                selectedItem.totalPrice = selectedItem.price * newQuantity;

                // Cập nhật tổng giá của giỏ hàng
                state.totalCartPrice = state.items.reduce((total, item) => total + item.totalPrice, 0);
            }
        },
        // Thêm reducer để cập nhật thông tin size được chọn
        setSize: (state, action) => {
            const { itemId, size } = action.payload;
            const selectedItem = state.items.find(item => item._id === itemId);

            if (selectedItem) {
                // Cập nhật size cho sản phẩm đã chọn
                selectedItem.selectedSize = size;
            }
        },
        clearCart: (state) => {
            // Xóa tất cả các sản phẩm khỏi giỏ hàng
            state.items = [];
            state.totalItems = 0;
            state.totalCartPrice = 0;
        },
        // Các reducers khác nếu cần
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            (action) => action.type.endsWith('/addToCart'),
            (state, /*action*/) => {
                // Tính toán số lượng sản phẩm trong giỏ hàng và cập nhật thông tin khác nếu cần
                state.totalItems = state.items.length;
            }
        );
    },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, setSize, clearCart } = cartSlice.actions;
export default cartSlice.reducer;