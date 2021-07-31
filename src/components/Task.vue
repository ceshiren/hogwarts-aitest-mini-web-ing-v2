
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
    data() {
        return {
            
        }
    },
    methods: {
        
    },
}
</script>

<style scoped>

</style>