// src/api/colorApi.js
import { request, setAuthHeader } from '../JWT/Axios_helper';
const apiUrl = 'http://localhost:8080/color-manage';  // Thay đổi URL nếu cần

export const getLogin = (userName, password) => {
    request(
        "POST",
        `${}`,
        { login: userName, password: password }).then(
            (response) => {
                return true;
                setAuthHeader(response.data.token)
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
