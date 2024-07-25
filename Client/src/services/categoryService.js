// categoryService.js
import axios from "axios";

const API_URL = "http://localhost:8000/api/categories";

const categoryService = {
  getCategories: () => axios.get(API_URL),
  getChildrenCategories: (parentId) =>
    axios.get(`${API_URL}/${parentId}/children`),
  getCategoryById: (categoryId) => axios.get(`${API_URL}/${categoryId}`),
  createCategory: (categoryData) => axios.post(API_URL, categoryData),
  createChildCategory: (parentId, childData) =>
    axios.post(`${API_URL}/${parentId}/children`, childData),
  updateCategory: (categoryId, categoryData) =>
    axios.put(`${API_URL}/${categoryId}`, categoryData),
  updateChildCategory: (parentId, childId, childData) =>
    axios.put(`${API_URL}/${parentId}/children/${childId}`, childData),
  deleteCategory: (categoryId) => axios.delete(`${API_URL}/${categoryId}`),
  deleteChildCategory: (parentId, childId) =>
    axios.delete(`${API_URL}/${parentId}/children/${childId}`),
};

export default categoryService;
