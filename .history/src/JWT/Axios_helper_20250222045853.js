import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post["Content-type"] = 'application/json';

export const getAuthToken = () => {
    return window.localStorage.getItem("auth_token");
}

export const setAuthToken = (token) => {
    window.localStorage.setItem("auth_token",token);
}

export const request = (method, url, data) => {
    let headers = {};
    if(getAuthToken() !== null && getAuthToken() !== "null") {
        headers = Au
    }
    return axios({
        method: method,
        url: url,
        data: data
    })
}