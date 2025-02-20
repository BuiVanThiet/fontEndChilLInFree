import axios from 'axios';

const apiUrl = 'http://localhost:8080/product-manage';  // Thay đổi URL nếu cần
// Cấu hình axios mặc định để gửi cookies
axios.defaults.withCredentials = true;