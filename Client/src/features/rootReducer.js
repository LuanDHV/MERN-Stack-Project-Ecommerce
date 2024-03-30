// rootReducer.js

import { combineReducers } from '@reduxjs/toolkit';
import productReducer from './product/productSlice';
import slideshowReducer from './product/slideShowSlice';
import categoryReducer from './category/categorySlice';
import detailProductReducer from './product/detailProductSlice';
import filterProductReducer from './product/filterProductSlice';
import userReducer from './user/userSlice';
import cartReducer from './cart/cartSlice';
import orderReducer from './order/orderSlice';


// Kết hợp các reducers thành rootReducer
const rootReducer = combineReducers({
    // State được quản lý bởi Reducer
    products: productReducer,
    slideshow: slideshowReducer,
    categories: categoryReducer,
    productDetails: detailProductReducer,
    filterProducts: filterProductReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
});

export default rootReducer;
