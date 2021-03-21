import axios from './http'

const user ={
    signIn(params){
       return axios.post('/user/login',params) 
    },
    signUp(params){
        return axios.post('/user/register',params) 
    },
    logout(params){
        return axios.delete("/user/logout",params)
    }

}
export default user