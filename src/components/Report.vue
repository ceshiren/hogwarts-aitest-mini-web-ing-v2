
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
        <div id="myChart" style="width:900px;height:900px"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            countX:[],
            countData:[]
        }

    },
    created(){

        let post_data = {
                start:1,
                end:10
            }

        this.$api.project.getCaseCount(post_data).then(res=>{
            var listData = []
            listData = res.data.data

            for (let index = 0; index < listData.length; index++) {
                this.countX.push("任务id："+listData[index].id)
                this.countData.push(listData[index].caseCount)
            }
            this.drawChart()
        })

    },
    methods: {
        drawChart(){
            var echarts = require('echarts');
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('myChart'));

             myChart.setOption({
                xAxis: {
                    type: 'category',
                    data: this.countX
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: this.countData,
                    type: 'bar'
                }]
            })

        }
    },
   
}
</script>

<style scoped>

</style>