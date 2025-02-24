import { request, setAuthHeader } from '../JWT/Axios_helper';
import axios from 'axios';
axios.defaults.withCredentials = true;
const apiUrl = 'http://localhost:8080/product-manage';  // Thay đổi URL nếu cần

// export const getAllProduct = () => {
//     return request("GET", `${apiUrl}/get-all`, {})
//         .then((response) => response.data) // ✅ Return response.data
//         .catch((error) => {
//             console.log("Lỗi khi gọi API:", error);
//             if (error.response?.status === 401) {
//                 setAuthHeader(null);
//             } else {
//                 console.error("Lỗi API:", error.response?.code || "Không xác định");
//             }
//             throw error; // ✅ Quan trọng: Throw lỗi để xử lý ở `fetchColor()`
//         });
// };

export const getAllProduct = async () => {
    const response = await axios.get(`${apiUrl}/get-all`);
    return response.data;
};

export const update = (object) => {
    return request("POST", `${apiUrl}/update`, object)
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
    return request("POST", `${apiUrl}/add-product`, object)
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

// export const fetchProductById = (id) => {
//     return request("GET", `${apiUrl}/product/${id}`, {})
//         .then((response) => response.data) // ✅ Return response.data
//         .catch((error) => {
//             console.log("Lỗi khi gọi API:", error);
//             if (error.response?.status === 401) {
//                 setAuthHeader(null);
//             } else {
//                 console.error("Lỗi API:", error.response?.code || "Không xác định");
//             }
//             throw error; // ✅ Quan trọng: Throw lỗi để xử lý ở `fetchColor()`
//         });
// };


export const fetchProductById = async (id) => {
    const response = await axios.get(`${apiUrl}/product/${id}`);
    return response.data;
};