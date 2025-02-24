import { request, setAuthHeader } from '../JWT/Axios_helper';
const apiUrl = 'http://localhost:8080';
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
                        return false;
                    } else {
                        // return error.response.code;
                        return false;
                    }

                }
            );
}

export const getUserLogin = async () => {
    return request("GET", `${apiUrl}/account-login`, {})
        .then((response) => response.data)
        .catch((error) => {
            console.log("Lỗi khi gọi API:", error);
            if (error.response?.status === 401) {
                if (typeof setAuthHeader === "function") {
                    setAuthHeader(null);
                    return false;
                } else {
                    console.warn("setAuthHeader chưa được định nghĩa");
                    return false;
                }
            } else {
                console.error("Lỗi API:", error.response?.status || "Không xác định");
                return false;
            }
            return false;
            // throw error; // ✅ Đảm bảo lỗi không bị nuốt
        });
}
