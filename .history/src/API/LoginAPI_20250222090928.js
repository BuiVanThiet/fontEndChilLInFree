// src/api/colorApi.js
import { request, setAuthHeader } from '../JWT/Axios_helper';
import axios from 'axios';

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
   return request("GET", `${apiUrl}/`, {})
          .then((response) => response.data)
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
              throw error; // ✅ Đảm bảo lỗi không bị nuốt
          });
}
