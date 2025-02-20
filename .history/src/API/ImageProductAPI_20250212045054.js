// src/api/colorApi.js
import axios from 'axios';

const apiUrl = 'http://localhost:8080/product-manage';  // Thay đổi URL nếu cần
axios.defaults.withCredentials = true;

export const getListImageProduct = async (id) => {
    const response = await axios.get(`${apiUrl}/image_product/${id}`);
    console.log('dât anh ben api: ', this.props.ListImage)

    return response.data;
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
        console.log("Uploading files:", fileList);

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

export const deleteImageProduct = async (listImageDelete) => {
    if (!listImageDelete || listImageDelete.length === 0) {
        console.error("Không có ảnh nào để xóa.");
        return;
    }
    console.log('datta anh xoa', listImageDelete)

    try {
        console.log("Deleting images:", listImageDelete);

        const response = await axios.post(`${apiUrl}/delete_image_product`, listImageDelete);

        return response.data;
    } catch (error) {
        console.error("Lỗi khi xóa ảnh:", error.response?.data || error.message);
        throw error;
    }
};


