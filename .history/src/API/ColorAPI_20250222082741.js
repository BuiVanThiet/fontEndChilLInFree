// src/api/colorApi.js
import axios from 'axios';
import { request, setAuthHeader, getAuthToken } from '../JWT/Axios_helper';
import { data } from 'react-router-dom';
const apiUrl = 'http://localhost:8080/color-manage';  // Thay đổi URL nếu cần

// export const getAll = async () => {
//     const response = await axios.get(`${apiUrl}/all-object`);
//     return response.data;
// };

export const getAll = () => {
    console.log('token: ', getAuthToken())
    return request("GET", `${apiUrl}/all-object`, {})
        .then((response) => response.data)
        .catch((error) => {
            console.log("Lỗi khi gọi API:", error);
            if (error.response?.status === 401) {
                if (typeof setAuthHeader === "function") {
                    setAuthHeader(null);
                } else {
                    console.warn("setAuthHeader chưa được định nghĩa");
                }
            } else {
                console.error("Lỗi API:", error.response?.status || "Không xác định");
            }
            throw error; // ✅ Đảm bảo lỗi không bị nuốt
        });
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
