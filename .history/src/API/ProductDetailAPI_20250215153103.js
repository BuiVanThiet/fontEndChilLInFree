import axios from 'axios';

const apiUrl = 'http://localhost:8080/product-detail-manage';  // Thay đổi URL nếu cần
// Cấu hình axios mặc định để gửi cookies
axios.defaults.withCredentials = true;

export const getAllProductDetail = async (id) => {
    const response = await axios.get(`${apiUrl}/all-product-detail/${id}`);
    return response.data;
};


export const getaddProductDetail = async (list) => {
    const response = await axios.post(`${apiUrl}/add_product_detail`, list, {
        headers: {
            "Content-Type": "application/json",  // Đổi từ multipart/form-data
        },
    });

    return response.data;
};