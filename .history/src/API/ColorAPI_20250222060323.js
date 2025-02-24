// src/api/colorApi.js
import axios from 'axios';
import { request, setAuthHeader } from '../JWT/Axios_helper';
import { data } from 'react-router-dom';
const apiUrl = 'http://localhost:8080/color-manage';  // Thay đổi URL nếu cần

// export const getAll = async () => {
//     const response = await axios.get(`${apiUrl}/all-object`);
//     return response.data;
// };

export const getAll = () => {
    request(
        "GET",
        "/color-manage/all-object",
        {}).then(
            (response) => {
                return response.data
            }).catch(
                (error) => {
                    if (error.response.status === 401) {
                        setAuthHeader(null);
                    } else {
                        this.setState({ data: error.response.code })
                    }

                }
            );
}

export const create = async (object) => {
    const response = await axios.post(`${apiUrl}/add`, object);
    return response.data;
};

export const update = async (object) => {
    const response = await axios.post(`${apiUrl}/update`, object);
    return response.data;
};

export const getColorByIdPR = async (id) => {
    const response = await axios.get(`${apiUrl}/color-by-product/${id}`);
    return response.data;
};
