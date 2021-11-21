<template>
    <div  style="padding:30px">
        <!--选择器和查看按钮-->
        <el-row>
            <el-select v-model="value" placeholder="选择要查看的线路统计">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                >
                </el-option>
            </el-select>
            <div style="margin-left: 10px">
                <el-button type="primary" @click="loadChart">查看</el-button>
            </div>
        </el-row>


        <!--图表显示区域-->
        <el-row style="margin-top: 50px">
            <div id="main" style="width: 600px;height:400px;"></div>
        </el-row>


    </div>
</template>

<script>
    import {ref} from "vue";
    import * as echarts from "echarts";
    import request from "../utils/request";

    export default {
        name: "findlines",
        data(){
            return{
                options: ref([
                    {
                        value: 'Option1',
                        label: '分组统计常规公交',
                    },
                    {
                        value: 'Option2',
                        label: '根据站点数量对线路排序',
                    },
                    {
                        value: 'Option3',
                        label: '根据运行时间对线路排序',
                    },

                ]),
                value: ref(''),
                lineNumbers:[],
                lineTypes:[],
                lineNames:[],
                stationNumbers: [],
            }
        },
        methods:{

            loadChart() {
                switch (this.value) {
                    case "Option1":
                        this.linesbyType();
                        break;
                    case "Option2":
                        this.linesbyNum();
                        break;
                    case "Option3":
                        this.linesbyTime();
                        break;


                    default:
                }
            },
            // 分组统计常规公交
            linesbyType(){
                var myChart = echarts.init(document.getElementById('main'));
                // 绘制图表
                myChart.setOption({

                    title: {
                        text: '分组统计常规公交'
                    },
                    tooltip: {},
                    xAxis: {
                        axisLabel:{
                            interval: 0 //横坐标强制显示完整
                        },
                        data: this.lineTypes
                    },
                    yAxis: {},
                    series: [
                        {
                            name: '线路数量',
                            type: 'bar',
                            data: this.lineNumbers,
                            itemStyle:{
                                normal: {
                                    //柱形图圆角，顺时针左上，右上，右下，左下）
                                    barBorderRadius: [12, 12, 12, 12],
                                    //设置柱状图颜色渐变
                                }
                            }
                        }
                    ],

                    color:{
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#5ad9e8' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#caecf0' // 100% 处的颜色
                        }],
                        globalCoord: true // 缺省为 false
                    },
                });


            },

            //根据站点数量排序线路
            linesbyNum(){
                var myChart = echarts.init(document.getElementById('main'));
                // 绘制图表
                myChart.setOption({

                    title: {
                        text: '根据站点数量排序线路'
                    },
                    tooltip: {},
                    xAxis: {
                        axisLabel:{
                            interval: 1 //横坐标强制显示完整
                        },
                        data: this.lineNames
                    },
                    yAxis: {},
                    series: [
                        {
                            name: '站点数量',
                            type: 'bar',
                            data: this.stationNumbers,
                            itemStyle:{
                                normal: {
                                    //柱形图圆角，顺时针左上，右上，右下，左下）
                                    barBorderRadius: [12, 12, 12, 12],
                                    //设置柱状图颜色渐变
                                }
                            }
                        }
                    ],

                    color:{
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#5ad9e8' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#caecf0' // 100% 处的颜色
                        }],
                        globalCoord: true // 缺省为 false
                    },
                });


            },


            getData(){
                //mounted时请求数据
                //请求不同类型公交数量
                request.get("line/find/type/and/number/of/line"

                ).then(res => {
                    console.log(res);

                    if (res.data == null)
                    {
                        this.$message({
                            type: "error",
                            message: res.msg
                        })

                    }
                    else
                    {
                        this.stations = res.data;
                        this.stations.forEach((element,index)=>{
                            this.lineTypes.push(element.type);
                            this.lineNumbers.push(element.number)
                        })


                    }
                });

                //请求根据站点数量排序线路
                request.get("line/top15/most/station/route"

                ).then(res => {
                    console.log(res);

                    if (res.data == null)
                    {
                        this.$message({
                            type: "error",
                            message: res.msg
                        })

                    }
                    else
                    {
                        this.stations = res.data;
                        this.stations.forEach((element,index)=>{
                            this.lineNames.push(element.routename);
                            this.stationNumbers.push(element.number)
                        })


                    }
                });

                //根据运行时间排序线路
            },


        },
        mounted() {
            this.getData();

        },
    }
</script>

<style scoped>

</style>