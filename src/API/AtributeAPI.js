// src/api/colorApi.js
import axios from 'axios';

const apiUrl = 'http://localhost:8080/attribute-manage';  // Thay đổi URL nếu cần

// export const getAllColors = async () => {
//     const response = await axios.get(`${apiUrl}/all-object`);
//     return response.data;
// };
export const getAllAttribute = async (typeAttribute) => {
    const response = await axios.get(`${apiUrl}/all-object/${typeAttribute}`);
    return response.data;
};

export const createAttribute = async (newColor, typeAttribute) => {
    const response = await axios.post(`${apiUrl}/add/${typeAttribute}`, newColor);
    return response.data;
};

export const updateAttribute = async (newColor, typeAttribute) => {
    const response = await axios.post(`${apiUrl}/update/${typeAttribute}`, newColor);
    return response.data;
};
