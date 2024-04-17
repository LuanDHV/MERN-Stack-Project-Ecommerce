// emailService.js
import axios from 'axios';

const API_URL = 'https://nemfashion-server.onrender.com/api/otp';


const emailService = {
    sendOTP: (email) => axios.post(`${API_URL}`, { to: email }),

};

export default emailService;
