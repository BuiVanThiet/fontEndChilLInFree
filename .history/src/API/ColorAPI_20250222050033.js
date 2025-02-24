// src/api/colorApi.js
import axios from 'axios';
imp
const apiUrl = 'http://localhost:8080/color-manage';  // Thay đổi URL nếu cần

export const getAll = async () => {
    const response = await axios.get(`${apiUrl}/all-object`);
    return response.data;
};

export const create = async (object) => {
    const response = await axios.post(`${apiUrl}/add`, object);
    return response.data;
};

export const update = async (object) => {
    const response = await axios.post(`${apiUrl}/update`, object);
    return response.data;
};

export const getColorByIdPR = async (id) => {
    const response = await axios.get(`${apiUrl}/color-by-product/${id}`);
    return response.data;
};
