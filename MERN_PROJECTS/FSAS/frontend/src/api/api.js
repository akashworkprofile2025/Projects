import axios from 'axios'

// This is axios instanace
const api = axios.create({
    // store base url of backend
    baseURL: "http://localhost:5000/api",

    // // cookie / to  use token
    withCredentials:true
});

// Attach token before request
api.interceptors.request.use((config)=>{
    // take token from localstorage
    const token = localStorage.getItem('token');

    // IF token found add to Header 
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})

export default api;
