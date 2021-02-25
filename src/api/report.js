import axios from './http'

const report = {
    getAllure(params){
        return axios.get('/report/allureReport/'+params.id)
    },
    getCaseCount(params){
        return axios.get('/report/taskByCaseCount/')
    },
    getStatus(params){
        return axios.get('/report/taskByType/')
    },
}

export default report;