import { request, setAuthHeader } from '../JWT/Axios_helper';
const apiUrl = 'http://localhost:8080/size-manage';  // Thay đổi URL nếu cần

export const getAll = async () => {
    return request("GET", `${apiUrl}/all-object`, {})
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
};

export const create = async (object) => {
    return request("GET", `${apiUrl}/add`, object)
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
};

export const update = async (object) => {
    return request("GET", `${apiUrl}/update`, object)
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
};

export const update = async (id) => {
    return request("GET", `${apiUrl}/size-by-product/${id}`, {})
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
};

export const getSizeByIdPR = async (id) => {
    const response = await axios.get(`${apiUrl}/size-by-product/${id}`);
    return response.data;
};

