import axios from './http'

const project = {
    getTaskList(params){
        return axios.get('/task/list',{params})
    },
    deleteTask(params){
        return axios.delete('/task/'+params.id,params)
    },
    editTask(params){
        return axios.put('/task/',params)
    },
    doTask(params){
        return axios.post('/task/start',params)
    },
    getAllure(params){
        return axios.get('/task/allureReport/'+params.id,params)
    }
}
export default project
