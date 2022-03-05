
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

        <template>
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

                <template v-slot:item.action="{item}">
                    <v-btn v-if="item.status==1" small color="primary" @click="doTask(item)">执行任务</v-btn>
                    <v-btn v-else small disabled>执行任务</v-btn>
                    <v-btn color="success" small @click="editTask(item)">编辑</v-btn>
                    <v-btn color="error" small @click="deleteTask(item)">删除</v-btn>

                </template>

            </v-data-table>
        </template>

        <v-pagination v-if="pageLength>0"
                v-model="currentPage"
                :length="pageLength"
                      :total-visible="7"
                      @input="listTask()"
        ></v-pagination>


        <v-dialog
                v-model="editDialog"
                max-width="500px"
        >
            <v-card>
                <v-card-title>
                    修改测试任务
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field label="任务名称" v-model="taskName"></v-text-field>
                        <v-textarea label="备注" v-model="remark"></v-textarea>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="saveEdit()">确定</v-btn>
                    <v-btn color="primary" text @click="editDialog = false">取消</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
export default {
    data() {
        return {

            currentPage:1,
            pageLength:0,
            rows:'',
            taskName:'',
            remark:'',
            editId:'',
            editDialog:false,


            headers:[
                {
                    text:'id',
                    value:'id'
                },
                {
                    text:'名称',
                    value:'name'
                },
                {
                    text:'用例数量',
                    value:'caseCount'
                },
                {
                    text:'执行状态',
                    value:'status'
                },
                {
                    text:'备注',
                    value:'remark'
                },
                {
                    text:'操作',
                    value:'action',
                    align:'center'
                }
            ],
            tableData:[
                {
                    id:1,
                    name:'测试',
                    caseCount: 2,
                    remark: "212",
                },
                {
                    id:2,
                    name:'测试',
                    caseCount: 2,
                    remark: "212",
                },
                {
                    id:3,
                    name:'测试',
                    caseCount: 2,
                    remark: "212",
                }
            ]
        }
    },
    created(){
        this.listTask()
    },
    methods: {
        listTask(){
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
        editTask(item){
            this.taskName = item.name
            this.remark = item.remark
            this.editId = item.id
            this.editDialog = true
        },
        saveEdit(item){

            let params = {
                name:this.taskName,
                remark:this.remark,
                id:this.editId
            }

            this.$api.project.editTask(params).then(res=>{
                console.log(res)
                this.listTask()
            })

            this.editDialog = false
        },
        deleteTask(item){

            let params = {
                id:item.id
            }

            this.$api.project.deleteTask(params).then(res=>{
                console.log(res)
                this.listTask()
            })

        },
        doTask(item){

            let params = {
                taskId:item.id
            }

            this.$api.project.doTask(params).then(res=>{
                console.log(res)
                this.listTask()
            })

        },

        getAllure(item){
            console.log(item.id)
            let params = {
                id:item.id
            }

            this.$api.project.getAllure(params).then(res=>{
                console.log(res)
                window.open(res.data.data,'_blank')
            })

        },

    },
}
</script>

<style scoped>

</style>
