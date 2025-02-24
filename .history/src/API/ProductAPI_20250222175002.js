import axios from 'axios';
import { request, setAuthHeader } from '../JWT/Axios_helper';
const apiUrl = 'http://localhost:8080/product-manage';  // Thay đổi URL nếu cần
// Cấu hình axios mặc định để gửi cookies
// axios.defaults.withCredentials = true;

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
// export const getAllProduct = async () => {
//     const response = await axios.get(`${apiUrl}/get-all`);
//     return response.data;
// };

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