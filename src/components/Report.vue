
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
        <div id="myChart" style="width:500px;height:500px"></div>
        report
    </div>
</template>

<script>
    export default {
        data(){
            return {
                countX:[],
                coutnData:[]
            }
        },
        created() {
            this.$api.report.getCaseCount().then(res=>{
                var listData = []
                listData = res.data.data
                for(let i=0;i<listData.length;i++){
                    this.countX.push("任务id:"+listData[i].id)
                    this.coutnData.push(listData[i].caseCount)
                }
                this.drawChart()
            })
        },

        methods: {
            drawChart(){
                var myEcharts = require('echarts');
                var myChart = myEcharts.init(document.getElementById("myChart"));
                myChart.setOption({
                    title:{
                        text:'测试任务用例数量统计'
                    },
                    xAxis: {
                        type: 'category',
                        data: this.countX
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: this.coutnData,
                        type: 'line'
                    }]
                });
            }
        },
    }
</script>

