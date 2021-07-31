
<template>
    <div>
        <template>
            <v-tabs :value="1" background-color="primary">
                <v-tab @click="$router.push({name:'Case'})">用例管理</v-tab>
                <v-tab @click="$router.push({name:'Task'})">任务管理</v-tab>
                <v-tab @click="$router.push({name:'Jenkins'})">Jenkins管理</v-tab>
                <v-tab @click="$router.push({name:'Report'})">报告管理</v-tab>
            </v-tabs>
        </template>
        <v-data-table
                :headers="headers"
                :items="tableData"
                item-key="id"
                hide-default-footer
                class="elevation-1"
        >

            <template v-slot:item.status = "{item}">
                <div v-if="item.status==0">无效</div>
                <div v-if="item.status==1">新建</div>
                <div v-if="item.status==2">执行中</div>
                <div v-if="item.status==3"><a @click="getAllure(item)">执行完成</a></div>
            </template>

            <template v-slot:[`item.action`] = "{item}">
                <v-btn color="success" small @click="editCase(item)">编辑</v-btn>
                <v-btn color="error" small @click="deleteCase(item)">删除</v-btn>
            </template>
        </v-data-table>
        <v-pagination
                v-if="pageLength>0"
                v-model="currentPage"
                :length="pageLength"
                circle
                @input="getTaskList()"
                :total-visible="7"
        ></v-pagination>
    </div>
</template>

<script>
export default {
    data(){
        return {
            currentPage:1,
            pageLength:0,
            rows:'',
            editDialog:false,
            editId:'',
            taskName:'',
            remark:'',
            taskDialog:'',
            instanceNotify:'',
            headers:[
                {text:'id',value:'id'},
                {text:'名称',value:'name'},
                {text:'JenkinsID',value:'testJenkinsId'},
                {text:'用例数量',value:'caseCount'},
                {text:'执行脚本',value:'shortTestCommand'},
                {text:'执行状态',value:'status'},
                {text:'操作',value:'action'}
            ],
            tableData:[
                {
                    id:1,
                    name:'task'
                },
                {
                    id:2,
                    name:'task2'
                }
            ]
        }
    },
    created(){
        this.getTaskList()
    },
    methods: {

        getTaskList(){
            let post_data = {
                pageNum:this.currentPage,
                pageSize:10
            }
            this.$api.project.getTaskList(post_data).then(res=>{
                console.log(res)
                this.tableData = res.data.data.data
                this.rows = res.data.data.recordsTotal
                this.pageLength = Math.ceil(this.rows/10)
            })
        },
        getAllure(item){

            let post_data = {
                taskId:item.id,
            }

            this.$api.project.getAllure(post_data).then(res=>{
                console.log(res)
                window.open(res.data.data.allureReportUrl,"_blank")
            })
        }

    },
}
</script>

<style scoped>

</style>
