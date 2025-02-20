import axios from 'axios';

const apiUrl = 'http://localhost:8080/product-detail-manage';  // Thay đổi URL nếu cần
// Cấu hình axios mặc định để gửi cookies
axios.defaults.withCredentials = true;

export const getAllProductDetail = async (id) => {
    const response = await axios.get(`${apiUrl}/all-product-detail/${id}`);
    console.log('data ci tiet ben api: ', )
    return response.data;
};