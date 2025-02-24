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

export const getUserLogin = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
        console.log("Không có token!");
        return;
    }

    try {
        const response = await axios.get("http://localhost:8080/account-login", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("Thông tin người dùng:", response.data);
    } catch (error) {
        console.error("Lỗi khi lấy thông tin tài khoản:", error.response?.data);
    }
}
