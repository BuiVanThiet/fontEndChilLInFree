import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post["Content-type"] = 'application/json';

export const getAuthToken = () => {
    return window.localStorage.getItem("auth_token");
}

export const setAuthToken = (token) => {
    window.
}

export const request = (method, url, data) => {
    return axios({
        method: method,
        url: url,
        data: data
    })
}