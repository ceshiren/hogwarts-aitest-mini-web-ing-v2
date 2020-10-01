import axios from './http'

const cases = {
    getList(params){
        return axios.get('/testCase/list',{params})
    },
    creatCaseByText(params){
        return axios.post('/testCase/text', params)
    },
    creatCaseByFile(params){
        return axios('/testCase/file',{
            method:'post',
            data:params,
            headers:{'Content-type':'multipart/form-data'}
        })
    },
    deleteCase(params){
        return axios.delete('/testCase/'+params.caseId,params)
    },
    editCase(params){
        return axios.put('/testCase/',params)
    },
    createTask(params){
        return axios.post('/task/',params)
    }
}
export default cases