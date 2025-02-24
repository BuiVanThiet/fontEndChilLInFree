// src/api/colorApi.js
import { request, setAuthHeader } from '../JWT/Axios_helper';

export const getLogin = (userName, password) => {
    request(
        "POST",
        "/login",
        { login: userName, password: password }).then(
            (response) => {
                setAuthHeader(response.data.token)

                return true;
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

export const getUserLogin = () => {
    
}
