import axios from 'axios';
import { request, setAuthHeader } from '../JWT/Axios_helper';
const apiUrl = 'http://localhost:8080/product-detail-manage';  // Thay đổi URL nếu cần
// Cấu hình axios mặc định để gửi cookies
axios.defaults.withCredentials = true;

export const getAllProductDetail = async (id) => {
    return request("GET", `${apiUrl}/all-product-detail/${id}`, {})
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
export const getAllProductDetail = async (id) => {
    const response = await axios.get(`${apiUrl}/all-product-detail/${id}`);
    return response.data;
};

export const addProductDetail = async (list) => {
    const response = await axios.post(`${apiUrl}/add_product_detail`, list, {
        headers: {
            "Content-Type": "application/json",  // Đổi từ multipart/form-data
        },
    });

    return response.data;
};

export const updateProductDetail = async (list) => {
    const response = await axios.post(`${apiUrl}/update_product_detail`, list, {
        headers: {
            "Content-Type": "application/json",  // Đổi từ multipart/form-data
        },
    });

    return response.data;
};

export const getPriceSeling = async (idPR, idC, idS) => {
    const response = await axios.get(`${apiUrl}/price-seling-product/${idPR}/${idC}/${idS}`);
    return response.data;
};
