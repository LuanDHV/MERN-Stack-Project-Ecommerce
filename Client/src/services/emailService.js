// emailService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/otp';


const emailService = {
    sendOTP: (email) => axios.post(`${API_URL}`, { to: email }),
    
};

export default emailService;
