
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
        <v-dialog v-model="editDialog" width="400px">
            <v-card>
                <v-card-title>
                    编辑任务
                </v-card-title>
                <v-card-text>
                    <v-text-field label="任务名称" v-model="taskName"></v-text-field>
                    <v-text-field label="备注" v-model="remark"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer>
                        <v-btn color="primary" @click="saveEdit()">确认</v-btn>
                    </v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-data-table
                :headers="headers"
                :items="tableData"
                hide-default-footer
        >
            <template v-slot:item.status="{item}">
                <div v-if="item.status==0">无效</div>
                <div v-else-if="item.status==1">新建</div>
                <div v-else-if="item.status==2">执行中</div>
                <div v-else-if="item.status==3"><a @click="getAllure(item)">执行完成</a></div>
            </template>

            <template v-slot:item.shortTestCommand="{item}">
                <v-hover v-slot:default="{hover}">
                    <div>
                        <span class="short-test-command">{{item.shortTestCommand}}</span>
                        <div v-if="hover" class=" transition-fast-in-fast-out grey v-card--reveal test-command">
                            {{item.testCommand}}
                        </div>
                    </div>
                </v-hover>
            </template>

            <template v-slot:item.action="{item}">
                <v-btn v-if="item.status==1" color="primary" small @click="doTask(item)">执行任务</v-btn>

                <v-btn small v-else disabled>执行任务</v-btn>
                <v-btn color="success" small @click="editTask(item)">编辑</v-btn>
                <v-btn color="error" small @click="deleteTask(item)">删除</v-btn>
            </template>
        </v-data-table>
        <v-pagination v-if="pageLength>0" v-model="currentPage" :length="pageLength" @input="getTaskList()" total-visible="7"></v-pagination>
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
                    }
                ]
            }
        },

        created(){
            this.getTaskList()
        },
        methods:{
            getAllure(item){
                let params = {
                    id:item.id
                }
                this.$api.report.getAllure(params).then(res=>{
                    console.log(res)
                    window.open(res.data.data.allureReportUrl,"_blank")
                })
            },
            saveEdit(){
                let params = {
                    name:this.taskName,
                    remark:this.remark,
                    id:this.editId
                }

                this.$api.project.editTask(params).then(res=>{
                    if(this.instanceNotify){
                        this.instanceNotify.close()
                    }
                    this.instanceNotify = this.$notify({
                        title:'成功',
                        message:'保存成功',
                        type:'success',
                    })
                    this.getTaskList()
                    this.close()
                })
            },
            editTask(item){
                this.taskName = item.name
                this.remark = item.remark
                this.editId = item.id
                this.editDialog = true
            },
            getTaskList(){
                let params = {
                    pageNum:this.currentPage,
                    pageSize:10,
                }
                this.$api.project.getTaskList(params).then(res=>{
                    console.log(res)
                    this.tableData = res.data.data.data
                    for(let i = 0; i < this.tableData.length; i++){
                        if(this.tableData[i].testCommand == undefined) {
                            continue;
                        }
                        if(this.tableData[i].testCommand.length > 10){
                            this.tableData[i].shortTestCommand = this.tableData[i].testCommand.substring(0,20);
                        }
                    }

                    this.rows = res.data.data.recordsTotal
                    this.pageLength = Math.ceil(this.rows/10)
                })
            },
            doTask(item){
                let params = {
                    taskId:item.id
                }
                this.$api.project.doTask(params).then(res=>{
                    if(res.data.resultCode==1){
                        this.getTaskList()
                        if(this.instanceNotify){
                            this.instanceNotify.close()
                        }
                        this.instanceNotify = this.$notify({
                            title:'成功',
                            message:'执行成功',
                            type:'success'
                        })
                    }
                })
            },
            deleteTask(item){
                let params = {
                    id:item.id
                }
                this.$api.project.deleteTask(params).then(res=>{
                    if(res.data.resultCode==1){
                        if(this.instanceNotify){
                            this.instanceNotify.close()
                        }
                        this.instanceNotify = this.$notify({
                            title:'成功',
                            message:'删除成功',
                            type:'success',
                        })
                        this.getTaskList()
                    }
                })
            },
            close(){
                this.editDialog = false
            }
        }
    }
</script>

<style scoped>

    .v-card--reveal {
        align-items: center;
        font-size: 14px;
        margin-left: -50px;
        justify-content: center;
        opacity: .8;
        position: absolute;
        width: 100%;
    }

    .test-command{
        color: #fff;
        border-radius: 5px;
    }
    .short-test-command{
        cursor: pointer;
    }

</style>
