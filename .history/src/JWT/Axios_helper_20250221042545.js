import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post["Content-type"] = 'application/json';

export const request = (method,url, dât) => {
    
}