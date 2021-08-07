
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            countX:['1', '22', '3', '4', '5', '66', '7'],
            countYData:[1500, 230, 2240, 2180, 135, 147, 2600]
        }
    },
    created(){
        this.getCaseCount()
    },
    methods: {

        getCaseCount(){
            this.$api.project.getCaseCount().then(res=>{
                console.log(res)

                var listData = []
                listData = res.data.data

                for (let i=0;i<listData.length;i++) {
                    this.countX.push("id:"+listData[i].id)
                    this.countYData.push(listData[i].caseCount)
                }

                this.drawChart()
            })
        },

        drawChart(){
            var echarts = require('echarts');
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('myChart'));
            // 绘制图表
            myChart.setOption({
                xAxis: {
                    type: 'category',
                    data: this.countX
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: this.countYData,
                    type: 'line'
                }]
            });
        }

    },
    /*mounted() {

            },*/
}
</script>

<style scoped>

</style>
