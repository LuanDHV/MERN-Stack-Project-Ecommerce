// orderService.js
import axios from 'axios';

const API_URL = 'https://nemfashion-server.onrender.com/api/orders';

const orderService = {
  getOrders: () => axios.get(API_URL),
  getOrderById: (orderId) => axios.get(`${API_URL}/${orderId}`),
  getOrdersByUserId: (userId) => axios.get(`${API_URL}/user/${userId}`),
  createOrder: (orderData) => axios.post(API_URL, orderData),
  updateOrder: (orderId, orderData) => axios.put(`${API_URL}/${orderId}`, orderData),
  deleteOrder: (orderId) => axios.delete(`${API_URL}/${orderId}`),
};

export default orderService;
