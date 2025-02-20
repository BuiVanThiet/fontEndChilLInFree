import axios from 'axios';

const apiUrl = 'http://localhost:8080/product-detail-manage';  // Thay đổi URL nếu cần
// Cấu hình axios mặc định để gửi cookies
axios.defaults.withCredentials = true;

export const getAllProductDetail = async (id) => {
    const response = await axios.get(`${apiUrl}/all-product-detail/${id}`);
    return response.data;
};


export const addProductDetail = async (list) => {
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

        return response.data;
    } catch (error) {
        console.error("Lỗi khi tải ảnh lên:", error.response?.data || error.message);
        throw error;
    }
};