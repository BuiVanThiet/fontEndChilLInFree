// src/api/colorApi.js
import axios from 'axios';
import { request, setAuthHeader } from '../JWT/Axios_helper';
const apiUrl = 'http://localhost:8080/product-manage';  // Thay đổi URL nếu cần
axios.defaults.withCredentials = true;

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

export const updateImageProduct = async (fileList) => {
    if (!fileList || fileList.length === 0) {
        console.error("Không có file nào để upload.");
        return;
    }

    const formData = new FormData();
    fileList.forEach((file) => {
        const actualFile = file.originFileObj || file;
        formData.append("files", actualFile);
    });

    try {
        const response = await axios.post(`${apiUrl}/upload_image_product`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return request("POST", `${apiUrl}/upload_image_product`, formData)
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

        return response.data;
    } catch (error) {
        console.error("Lỗi khi tải ảnh lên:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteImageProduct = async (listImageDelete) => {
    if (!listImageDelete || listImageDelete.length === 0) {
        console.error("Không có ảnh nào để xóa.");
        return;
    }
    try {
        const response = await axios.post(`${apiUrl}/delete_image_product`, listImageDelete);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi xóa ảnh:", error.response?.data || error.message);
        throw error;
    }
};


