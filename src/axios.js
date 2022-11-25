import axios from "axios";

const instance = axios.create({
    baseURL: "http://3.90.68.168:8080/api/v1",
    // baseURL: "http://localhost:8080/api/v1",
    withCredentials: true,
    timeout: 5000,
});

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return {
        ...config,
        headers: {
            Authorization: localStorage.getItem("token") || "",
        },
    };
});

export default instance;
