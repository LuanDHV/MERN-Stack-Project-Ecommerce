// checkoutService.js
import axios from "axios";

const API_URL = "http://localhost:8000/api/checkout";

const checkoutService = {
  checkout: (cart) => axios.post(`${API_URL}/checkout`, { cart }),
};

export default checkoutService;
