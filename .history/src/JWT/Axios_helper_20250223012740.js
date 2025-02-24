import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token) => {
    if (token !== null) {
        window.localStorage.setItem("auth_token", token);
    } else {
        window.localStorage.removeItem("auth_token");
    }
};

// 📌 Hàm lấy thông tin từ token
export const getUserFromToken = () => {
    const token = getAuthToken();
    if (!token) return null; // Nếu không có token, trả về null

    try {
        const decoded = jwtDecode(token); // Giải mã token
        return decoded; // Trả về thông tin từ payload
    } catch (error) {
        console.error("Lỗi giải mã JWT:", error);
        return null;
    }
};

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request = (method, url, data) => {

    let headers = {

    };

    
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = { 'Authorization': `Bearer ${getAuthToken()}` };
    }

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data
    });
};