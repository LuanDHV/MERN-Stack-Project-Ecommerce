// productService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/products';



const productService = {
  getProducts: () => axios.get(API_URL),
  getProductsByCategory: (categoryId) => axios.get(`${API_URL}/?categories=${categoryId}`),
  getProductById: (productId) => axios.get(`${API_URL}/${productId}`),
  createProduct: (productData) => axios.post(API_URL, productData),
  updateProduct: (productId, productData) => axios.put(`${API_URL}/${productId}`, productData),
  deleteProduct: (productId) => axios.delete(`${API_URL}/${productId}`),
};

export default productService;
