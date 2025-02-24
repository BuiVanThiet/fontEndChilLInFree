// src/api/colorApi.js
import axios from 'axios';
import { request, setAuthHeader } from '../JWT/Axios_helper';
const apiUrl = 'http://localhost:8080/category-manage';  // Thay đổi URL nếu cần

export const getAll = () => {
    return request("GET", `${apiUrl}/all-object`, {})
        .then((response) => response.data) // ✅ Return response.data
        .catch((error) => {
            console.log("Lỗi khi gọi API:", error);
            if (error.response?.status === 401) {
                setAuthHeader(null);
            } else {
                console.error("Lỗi API:", error.response?.code || "Không xác định");
            }
            throw error; // ✅ Quan trọng: Throw lỗi để xử lý ở `fetchColor()`
        });
};

export const create = (object) => {
    
    return request("POST", `${apiUrl}/add`, object)
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

export const update = (object) => {
    return request("POST", `${apiUrl}/update`, object)
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