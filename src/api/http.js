import axios from 'axios'
var instance = axios.create({
    headers: {
        'Content-Type':'application/json'
    },
    baseURL:'http://stuq.ceshiren.com:8089/'
})

instance.interceptors.request.use(config=>{
    if(localStorage.getItem('token')){
        config.headers.common['token'] = localStorage.getItem('token')
    }
    return config
})
export default instance