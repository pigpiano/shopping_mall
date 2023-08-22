import axios from 'axios';

// eslint-disable-next-line no-unused-vars
const axiosInstance = axios.create({
    baseURL: import.meta.env.PROD ?
        "" : "http://localhost:4000",
})

axiosInstance.interceptors.request.use(function (config) {
    // 요청을 보내기 전에 어떤것을 하고 싶을 때
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken');
    return config;
}, function (error) { //에러 발생시 여기서 처리
    return Promise.reject(error);
})

// 토큰이 1시간 후에 만료되는데, 이를 갱신하기 위한 코드
axiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if(error.response.data === 'jwt expired') {
        window.location.reload()
    }
    return Promise.reject(error);
})



export default axiosInstance;