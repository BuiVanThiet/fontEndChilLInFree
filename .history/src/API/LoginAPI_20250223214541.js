import { request, setAuthHeader } from '../JWT/Axios_helper';
const apiUrl = 'http://localhost:8080';
export const getLogin = (userName, password) => {
    return request(
        "POST",
        "/login",
        { login: userName, password: password }).then(
            (response) => {
                setAuthHeader(response.data.token)
                return response;
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
    return request("GET", `${apiUrl}/account-login`, {})
        .then((response) => {
            return response.data ? true : false; // Trả về true nếu có dữ liệu hợp lệ
        })
        .catch((error) => {
            console.log("Lỗi khi gọi API:", error);
            if (error.response?.status === 401) {
                if (typeof setAuthHeader === "function") {
                    setAuthHeader(null);
                } else {
                    console.warn("setAuthHeader chưa được định nghĩa");
                }
            } else {
                console.error("Lỗi API:", error.response?.status || "Không xác định");
            }
            return false; // Trả về false nếu có lỗi
        });
};




export const getLogOut = (userName, password) => {
    return request(
        "POST",
        "/logout-account",
        {}).then(
            (response) => {
                // Xóa token khỏi localStorage hoặc sessionStorage
                localStorage.removeItem("token");
                sessionStorage.removeItem("token");
                // Xóa token khỏi Header
                setAuthHeader(null);
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

// export const getLogout = async () => {
//     return request("POST", "/logout", {})
//         .then(() => {
//             // Xóa token khỏi localStorage hoặc sessionStorage
//             localStorage.removeItem("token");
//             sessionStorage.removeItem("token");
//             // Xóa token khỏi Header
//             setAuthHeader(null);
//             return true;
//         })
//         .catch((error) => {
//             console.error("Lỗi khi đăng xuất:", error);
//             return false;
//         });
// };

