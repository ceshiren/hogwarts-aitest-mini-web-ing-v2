
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


        <v-dialog
                v-model="editDialog"
                max-width="500px"
        >
            <v-card>
                <v-card-title>
                    修改任务
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field label="名称" v-model="taskName"></v-text-field>
                        <v-textarea label="备注" v-model="remark"></v-textarea>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="confirmEdit()">确定</v-btn>
                    <v-btn color="primary" text @click="editDialog = false">取消</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <template>
            <v-data-table
                    v-model="selected"
                    :headers="headers"
                    :items="desserts"
                    item-key="id"
                    hide-default-footer
                    class="elevation-1"
            >

                <template v-slot:item.status="{item}">
                    <div v-if="item.status==1">新建</div>
                    <div v-if="item.status==2">执行中</div>
                    <div v-if="item.status==3"><a @click="getAllure(item)">执行完成</a></div>

                </template>

                <template v-slot:item.action="{item}">
                    <v-btn v-if="item.status==1" @click="doTask(item)" small color="primary">
                        执行任务
                    </v-btn>
                    <v-btn v-else small disabled>
                        执行任务
                    </v-btn>

                    <v-btn small @click="editTask(item)" color="success">
                        编辑
                    </v-btn>
                    <v-btn small  @click="deleteTask(item)" color="error">
                        删除
                    </v-btn>


                </template>

<!--                <template v-slot:[`item.operate`] = "{item}">
                    <v-btn color="primary" text small @click="editCase(item)">编辑</v-btn>
                    <v-btn color="error" text small @click="deleteCase(item)">删除</v-btn>

                </template>-->
            </v-data-table>

            <v-pagination
                    v-if="pageLength>0"
                    v-model="currentPage"
                    :length="pageLength"
                    @input="getTaskList()"
                    :total-visible="7"
            ></v-pagination>

        </template>

    </div>
</template>

<script>
export default {
    data() {
        return {

            currentPage:1,
            pageLength:0,
            rows:'',
            editDialog:false,
            editId:'',
            taskName:'',
            remark:'',
            taskDialog:'',

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
                    text:'状态',
                    value:'status'
                },
                {
                    text:'操作',
                    value:'action',
                    align:'center'
                },
            ],
            desserts:[
                {
                    id:1,
                    name:'测试111',
                    caseCount: 5,
                    status: 1
                },
                {
                    id:2,
                    name:'测试222',
                    caseCount: 5,
                    status: 1
                }
            ],

        }
    },
    created(){
        this.getTaskList()
    },
    methods: {

        //编辑任务
        editTask(item){
            this.taskName = item.name
            this.remark = item.remark
            this.editId = item.id
            this.editDialog = true

        },
        //确认编辑
        confirmEdit(){

            let post_data = {
                name: this.taskName,
                remark: this.remark,
                id: this.editId
            }

            this.$api.project.editTask(post_data).then(res=>{
                console.log(res)
                this.getTaskList()
                this.editDialog = false
            })


        },
        //删除任务
        deleteTask(item){
            let post_data = {
                id: item.id
            }

            this.$api.project.deleteTask(post_data).then(res=>{
                //console.log(res)
                this.getTaskList()
            })

        },

        //执行任务
        doTask(item){

            let post_data = {
                taskId: item.id
            }

            this.$api.project.doTask(post_data).then(res=>{
                console.log(res)
                this.getTaskList()
                this.editDialog = false
            })
        },
        //获取allure报告
        getAllure(item){

            let post_data = {
                id: item.id
            }

            this.$api.project.getAllureReport(post_data).then(res=>{
                console.log(res)
                if(res.data.resultCode == 1){
                    window.open(res.data.data.allureReportUrl,"_blank")
                }
            })

        },
        //获取任务列表
        getTaskList(){
            let post_data = {
                pageNum:this.currentPage,
                pageSize:10
            }
            this.$api.project.getTaskList(post_data).then(res=>{
                console.log(res)
                this.desserts = res.data.data.data
                this.rows = res.data.data.recordsTotal
                this.pageLength = Math.ceil(this.rows/10)
            })
        }
    },
}
</script>

<style scoped>

</style>
