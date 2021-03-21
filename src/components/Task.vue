
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
        :items-per-page="5"
        class="elevation-1"

        hide-default-footer
    ></v-data-table>
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
        let post_data = {
            pageNum:1,
            pageSize:10
        }
        this.$api.project.getTaskList(post_data).then(res=>{
            console.log(res)
            this.tableData = res.data.data.data
        })
    },
  }
</script>

<style scoped>

</style>