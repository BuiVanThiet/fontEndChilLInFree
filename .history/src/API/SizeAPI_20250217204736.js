// src/api/colorApi.js
import axios from 'axios';

const apiUrl = 'http://localhost:8080/size-manage';  // Thay đổi URL nếu cần

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

export const getSizeByIdPR = async (id) => {
    const response = await axios.get(`${apiUrl}/size-by-product/$`);
    return response.data;
};

