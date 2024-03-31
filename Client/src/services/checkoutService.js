// checkoutService.js
import axios from 'axios';

const API_URL = 'https://nemfashion-server.onrender.com/api/checkout';

const checkoutService = {
    checkout: (cart) => axios.post(`${API_URL}/checkout`, { cart }),
};

export default checkoutService;
