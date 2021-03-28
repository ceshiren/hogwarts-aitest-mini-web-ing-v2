
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
        class="elevation-1"

        hide-default-footer
    >

    <template v-slot:item.status = "{item}">
          <div v-if="item.status==1"> 新建 </div>
          <div v-else-if="item.status==2">执行中</div>
          <div v-else-if="item.status==3"><a @click="getAllure(item)">执行完成</a></div>
    </template>

    <template v-slot:[`item.action`] = "{item}">

        <v-btn v-if="item.status==1" color="primary" small @click="doTask(item)">执行任务</v-btn>
        <v-btn v-else  small disabled>执行任务</v-btn>
        <v-btn color="primary" text small @click="editTask(item)">编辑</v-btn>
        <v-btn color="error" text small @click="deleteTask(item)">删除</v-btn>
    </template>

    </v-data-table>

<v-pagination
      v-model="currentPage"
      v-if="pageLength>0"
      :length="pageLength"
      @input="getTaskList()"
      total-visible="7"
    ></v-pagination>

    </template>
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
                    {text:'执行状态',value:'status'},
	                {text:'备注',value:'remark'},
                    {text:'操作',value:'action'}
                ],
                tableData:[
                    {
                        id:1,
                        name:'task',
                        testJenkinsId: 123,
                        caseCount: 122,
                        status: 2,
                        remark: '我是假数据',
                        action: "编辑"
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
            let params = {
                taskId: item.id
            }

            this.$api.project.getAllure(params).then(res=>{
                console.log(res)
                window.open(res.data.data.allureReportUrl,"_blank")
            })

        },
        doTask(item){

            let params = {
                taskId: item.id
            }

            this.$api.project.doTask(params).then(res=>{
                console.log(res)

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
        }
    },

  }
</script>

<style scoped>

</style>
