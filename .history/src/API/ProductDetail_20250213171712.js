import axios from 'axios';

const apiUrl = 'http://localhost:8080/product-manage';  // Thay đổi URL nếu cần
// Cấu hình axios mặc định để gửi cookies
axios.defaults.withCredentials = true;

export const getAllProductDetail = async () => {
    const response = await axios.get(`${apiUrl}/get-all`);
    return response.data;
};