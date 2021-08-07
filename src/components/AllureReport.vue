
<template>
    <div>
        <template>
            <v-tabs :value="3" background-color="primary">
                <v-tab @click="$router.push({name:'Case'})">用例管理</v-tab>
                <v-tab @click="$router.push({name:'Task'})">任务管理</v-tab>
                <v-tab @click="$router.push({name:'Jenkins'})">Jenkins管理</v-tab>
                <v-tab @click="$router.push({name:'Report'})">报告管理</v-tab>
            </v-tabs>
        </template>
        <v-btn color="primary" class="btn" @click="addDialog = true">添加用例</v-btn>
        <v-btn color="success" class="btn" @click="creatdTask = true">生成任务</v-btn>
        <!--<div id="main" style="width:500px;height:500px"></div>-->
        <iframe :src="url" width="100%" height="600px" class="report-frame"></iframe>
    </div>
</template>

<script>
export default {
    data() {
        return {
            url:''
        }
    },
    created(){
        this.getAllure()
    },
    methods: {
        getAllure(){

            let data = {
                taskId:this.$route.query.taskId
            }

            this.$api.project.getAllure(data).then(res=>{
                console.log(res)
                this.url = res.data.data.allureReportUrl
            })
        },
    },
    mounted() {
        var echarts = require('echarts');
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
            },
}
</script>

<style scoped>

</style>
