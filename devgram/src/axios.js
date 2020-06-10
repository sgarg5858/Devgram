import axios from 'axios';

axios.defaults.baseURL='http://localhost:4000';

//Interceptor
axios.interceptors.request.use( (request)=>{
    console.log(request);
    return request;
},error =>{
    console.log(error);
    Promise.reject(error);
})
