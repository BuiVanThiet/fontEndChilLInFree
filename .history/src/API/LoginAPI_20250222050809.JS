// src/api/colorApi.js
import { request, setAuthHeader } from '../JWT/Axios_helper';

export const getLogin = () => {
    request(
        "POST",
        "/login",
        {login: }).then(
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
