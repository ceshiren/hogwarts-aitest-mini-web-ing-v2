<template>
    <div>
        <template>
            <v-tabs :value="0" background-color="primary">
                <v-tab @click="$router.push({name:'Case'})">用例管理</v-tab>
                <v-tab @click="$router.push({name:'Task'})">任务管理</v-tab>
                <v-tab @click="$router.push({name:'Jenkins'})">Jenkins管理</v-tab>
                <v-tab @click="$router.push({name:'Report'})">报告管理</v-tab>
            </v-tabs>
        </template>

        <v-dialog
        v-model="creatdTask"
        max-width="500px"
        >
        <v-card>
            <v-card-title>
                生成测试任务
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-text-field label="任务名称" v-model="addTask.name"></v-text-field>
                    <v-textarea label="备注" v-model="addTask.remark"></v-textarea>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="newTask()">确定</v-btn>
                <v-btn color="primary" text @click="creatdTask = false">取消</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>

        <v-dialog
        v-model="editDialog"
        max-width="500px"
        >
        <v-card>
            <v-card-title>
                修改测试用例
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-text-field label="用例名称" v-model="editItem.caseName"></v-text-field>
                    <v-textarea label="用例数据" v-model="editItem.caseData"></v-textarea>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="confirmEdit()">确定</v-btn>
                <v-btn color="primary" text @click="editDialog = false">取消</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>

        <v-dialog
        v-model="addDialog"
        max-width="500px"
        >
        <v-card>
            <v-card-title>
                添加测试用例
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-text-field label="用例名称" v-model="addItem.name"></v-text-field>
                    <v-select :items="selectItem" v-model="addItem.type" label="用例类型" ></v-select>
                    <v-textarea label="用例数据" v-model="addItem.data" v-if="addItem.type=='文本'"></v-textarea>
                    <v-file-input label="用例数据" v-model="addItem.file" v-if="addItem.type=='文件'"></v-file-input>
                    <v-text-field label="备注" v-model="addItem.remark"></v-text-field>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="addCase()">确定</v-btn>
                <v-btn color="primary" text @click="addDialog = false">取消</v-btn>
            </v-card-actions>

        </v-card>
        </v-dialog>

        <v-btn color="primary" class="btn" @click="addDialog = true">添加用例</v-btn>
        <v-btn color="success" class="btn" @click="creatdTask = true">生成任务</v-btn>
        <template>
            <v-data-table
                v-model="selected"
                :headers="headers"
                :items="desserts"
                item-key="id"
                show-select
                class="elevation-1"
            >
            <template v-slot:[`item.operate`] = "{item}">
            <v-btn color="primary" text small @click="editCase(item)">编辑</v-btn>
            <v-btn color="error" text small @click="deleteCase(item)">删除</v-btn>
                    
                
            </template>
            </v-data-table>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            addDialog:false,
            editDialog:false,
            creatdTask:false,
            selectItem:['文本', '文件'],
            editItem:{},
            addTask:{
                name:'',
                remark:''
            },
            addItem:{
                name:'',
                type:'',
                data:'',
                file:'',
                remark:''
            },
           selected:[],
           headers:[
               {
                   text:'id',
                   value:'id'
               },
               {
                   text:'用例名称',
                   value:'caseName'
               },
               {
                   text:'用例数据',
                   value:'caseData'
               },
               {
                   text:'操作',
                   value:'operate',
                   align:'center'
               },
           ],
           desserts:[],
        }
    },
    created(){
        let post_data = {
            pageNum:1,
            pageSize:10
        }
        this.$api.cases.getList(post_data).then(res=>{
            console.log(res)
            this.desserts = res.data.data.data
        })
    },
    methods: {
        addCase(){
            if(this.addItem.type=='文本'){
                let post_data = {
                    caseData: this.addItem.data,
                    caseName:this.addItem.name,
                    remark:this.addItem.remark
                }
                this.$api.cases.creatCaseByText(post_data).then(res=>{
                    console.log(res)
                })   
            }else if(this.addItem.type=='文件'){
                let post_data = new FormData()
                post_data.append('caseFile',this.addItem.file)
                post_data.append('caseData',this.addItem.data)
                post_data.append('caseName',this.addItem.name)
                this.$api.cases.creatCaseByFile(post_data).then(res=>{
                    console.log(res)
                })
            }
            console.log(this.addItem)
            this.addDialog = false
            let post_data = {
                pageNum:1,
                pageSize:10
            }
            this.$api.cases.getList(post_data).then(res=>{
                console.log(res)
                this.desserts = res.data.data.data
            })
        },
        editCase(item){
            this.editDialog = true
            this.editItem = item
        },
        confirmEdit(){
            let post_data = {
                caseData: this.editItem.caseData,
                caseName: this.editItem.caseName,
                id:this.editItem.id,
                remark:this.editItem.remark
            }
            this.$api.cases.editCase(post_data).then(res=>{
                console.log(res)
                this.editDialog = false
                let post_data = {
                    pageNum:1,
                    pageSize:10
                }
                this.$api.cases.getList(post_data).then(res=>{
                    console.log(res)
                    this.desserts = res.data.data.data
                })
            })
        },
        newTask(){
            console.log(this.selected)
            let caseIdList = []
            for(let i = 0; i < this.selected.length; i++){
                caseIdList.push(this.selected[i].id)
            }
            let post_data = {
                caseIdList : caseIdList,
                testTask:{
                    name: this.addTask.name,
                    remark:  this.addTask.remark,
                    testJenkinsId:1
                }
            }
            this.$api.cases.createTask(post_data).then(res=>{
                console.log(res)
            })
        },
        deleteCase(item){
            console.log(item)
            let post_data = {
                caseId : item.id
            }
            this.$api.cases.deleteCase(post_data).then(res=>{
                console.log(res)
                let post_data = {
                    pageNum:1,
                    pageSize:10
                }
                this.$api.cases.getList(post_data).then(res=>{
                    console.log(res)
                    this.desserts = res.data.data.data
                })
            })
        }

    },
}
</script>

<style scoped>
.btn{
    margin: 10px;
}
</style>
