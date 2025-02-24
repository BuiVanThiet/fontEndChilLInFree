// src/api/colorApi.js
import axios from 'axios';
import { request, setAuthHeader } from '../JWT/Axios_helper';
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
                return response.data;
            }).catch(
                (error) => {
                    if (error.response.status === 401) {
                        setAuthHeader(null);
                    } else {
                        return error.response.code;
                    }

                }
            );
}
