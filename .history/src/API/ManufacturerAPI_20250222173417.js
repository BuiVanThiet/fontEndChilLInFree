// src/api/colorApi.js
import axios from 'axios';

const apiUrl = 'http://localhost:8080/manufacturer-manage';  // Thay đổi URL nếu cần

import { request, setAuthHeader } from '../JWT/Axios_helper';

export const getListImageProduct = async (id) => {
     return request("GET", `${apiUrl}/image_product/${id}`, {})
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

// export const getAll = async () => {
//     const response = await axios.get(`${apiUrl}/all-object`);
//     return response.data;
// };

export const create = async (object) => {
    const response = await axios.post(`${apiUrl}/add`, object);
    return response.data;
};

export const update = async (object) => {
    const response = await axios.post(`${apiUrl}/update`, object);
    return response.data;
};
