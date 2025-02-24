import axios from 'axios';
import { request, setAuthHeader } from '../JWT/Axios_helper';

const apiUrl = 'http://localhost:8080/product-manage';  // Thay đổi URL nếu cần
// Cấu hình axios mặc định để gửi cookies
axios.defaults.withCredentials = true;
export const getAllProduct = async () => {
    const response = await axios.get(`${apiUrl}/get-all`);
    return response.data;
};

export const update = async (object) => {
    const response = await axios.post(`${apiUrl}/update`, object);
    return response.data;
};


export const create = async (object) => {
    const response = await axios.post(`${apiUrl}/add-product`, object);
    return response.data;
};

export const fetchProductById = async (id) => {
    const response = await axios.get(`${apiUrl}/product/${id}`);
    return response.data;
};