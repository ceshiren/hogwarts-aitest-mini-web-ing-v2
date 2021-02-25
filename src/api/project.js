import axios from './http'

const project = {
    addCaseText(params){
        return axios.post('/testCase/text',params)
    },
    addCaseFile(params){
        return axios('/testCase/file',{
            method:'post',
            data:params,
            headers:{'Content-type':'multipart/form-data'}
        })
    },
    createCase(params){
        return axios.post('/user/createCase',params)
    },
    editCase(params){
      return axios.put('/testCase/',params)
    },
    /*getProjectInfo(params){
        return axios.get('/jenkins',{params})
    },*/
    editJenkins(params){
        return axios.put('/jenkins',params)
    },
    getCase(params){
        return axios.get('/testCase/list',{params})
    },
    addJenkins(params){
        return axios.post('/jenkins',params)
    },
    getJenkinsList(params){
        return axios.get('/jenkins/list',{params})
    },
    deleteJenkins(params){
        return axios.delete('/jenkins/'+params.id)
    },
    deleteCase(params){
        return axios.delete('/testCase/'+params.id)
    },
    addTask(params){
        return axios.post('/task/',params)
    },
    deleteTask(params){
        return axios.delete('/task/'+ params.id,params)
    },
    getTaskList(params){
        return axios.get('/task/list',{params})
    },
    doTask(params){
        return axios.post('/task/start',params)
    },
    editTask(params){
        return axios.put('/task',params)
    }
}

export default project;
