import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post["Content-type"] = 'application/json';

export const getAuthToken = 

export const request = (method, url, data) => {
    return axios({
        method: method,
        url: url,
        data: data
    })
}