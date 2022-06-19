import axios from './http'

const project = {

    //获取任务列表
    getTaskList(params){
        return axios.get('/task/list',{params})
    },
    //删除任务
    deleteTask(params){
        return axios.delete('/task/'+params.id,params)
    },
    //编辑任务
    editTask(params){
        return axios.put('/task/',params)
    },
    //执行测试
    doTask(params){
        return axios.post('/task/start',params)
    },
    //获取allure报告
    getAllureReport(params){
        return axios.get('/task/allureReport/'+params.id,params)
    }
}
export default project
