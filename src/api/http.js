import axios from 'axios'
var root = process.env.VUE_APP_URL
import {Message} from 'element-ui'
var messageInstance = null
var instance = axios.create({
    headers: {
        'Content-Type':'application/json'
    },
    // baseURL:'http://stuq.ceshiren.com:8089/'
    baseURL: root
})

instance.interceptors.request.use(config=>{
    if(localStorage.getItem('token')){
        config.headers.common['token'] = localStorage.getItem('token')
    }
    return config
})

instance.interceptors.response.use(res=>{
        //对错误的请求结果统一处理并且有信息提示
        if(res.data.resultCode==1){
            console.log('code==1')
            return Promise.resolve(res);
        }
        else{
            console.log('code!=1')
            if (messageInstance) {
                messageInstance.close();
            }
            messageInstance = Message({
                type:'error',
                message:res.data.message,
                center:true
            })
            return Promise.reject(res);
        }
    },
    error=>{
        const {response} = error
        if(response.status==401){
            if (messageInstance) {
                messageInstance.close();
            }
            messageInstance = Message({
                type:'error',
                message:response.data.message,
                center:true
            })
            router.replace({
                path:'/',
                query:{
                    redirect:router.currentRoute.fullPath
                }
            })
        }
        return Promise.reject(response)
    }
)

export default instance
