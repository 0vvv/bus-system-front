<template>
    <div  style="padding:30px">
        <!--选择器和查看按钮-->
        <el-row>
            <el-select v-model="value" placeholder="选择要查看的站台统计">
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

        <!--悬浮卡片显示具体站点-->
        <el-row>
            <div v-show="showdetails">
            <el-card class="box-card" >
                <template #header>
                    <div class="card-header" style="font-size: 16px; font-weight: bold">
                        <span>{{cardTitle}}</span>
                    </div>
                </template>
                <li v-for="item in details">{{ item }}</li>
            </el-card>
            </div>
        </el-row>

    </div>
</template>

<script>
    import request from "../utils/request";
    import * as echarts from 'echarts';
    import { ref, defineComponent } from 'vue'

    export default {
        name: "findstations",
        data() {
            return{
                details:[],
                cardTitle:"",
                lineNumbers:[],
                stationNames:[],
                stationNumbers:[],
                beginStations:[],
                endStations:[],
                metroStations:[],
                oneWayStations:[],
                showdetails:false,
                options: ref([
                    {
                        value: 'Option1',
                        label: '按停靠线路数量统计站点',
                    },
                    {
                        value: 'Option2',
                        label: '按站点类型统计站点',
                    },

                ]),
                value: ref(''),
                dialogVisible:false,
            }

        },

        methods:{

            loadChart(){
                switch (this.value) {
                    case "Option1":
                        this.stationsbyLineNum();
                        break;
                    case "Option2":
                        this.stationsbyType();
                        break;


                    default:
                }
            },


            stationsbyLineNum(){
                this.showdetails=false;
                var myChart = echarts.init(document.getElementById('main'));
                // 绘制图表
                myChart.setOption({

                    title: {
                        text: '线路最多的站点'
                    },
                    tooltip: {},
                    xAxis: {
                        data: this.stationNames
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

            stationsbyType(){
                var myChart = echarts.init(document.getElementById('main'));
                // 绘制图表
                myChart.setOption({

                    title: {
                        text: '按站点类型统计站点'
                    },
                    tooltip: {},
                    xAxis: {
                        data: ['起点站','终点站','地铁站','单行站']
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

                let that = this
                //处理点击事件
                myChart.on('click',function (params) {
                    that.showdetails=true;
                    that.cardTitle=params.name;
                    switch (params.dataIndex) {
                        case 0 :
                            that.details=that.beginStations;
                            break;
                        case 1 :
                            that.details=that.endStations;
                            break;
                        case 2 :
                            that.details=that.metroStations;
                            break;
                        case 3 :
                            that.details=that.oneWayStations;
                            break;
                        default:

                    }

                })

            },


            getData(){
                //mounted时请求数据
                //请求前15个线路最多的站点
                request.get("station/findtop15linenumberofstations/"

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
                            this.stationNames.push(element.stationNode.name);
                            this.lineNumbers.push(element.lineNumber)
                        })


                    }
                });


                //请求始发站
                request.get("station/findnumberofbeginstations/"

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
                        this.beginStations = res.data;
                        this.stationNumbers[0]=this.beginStations.length;
                    }
                });

                //请求终点站
                request.get("station/findnumberofendstations/"

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
                        this.endStations = res.data;
                        this.stationNumbers[1]=this.endStations.length;
                    }
                });

                //请求地铁站
                request.get("station/findnumberofmetrostations/"

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
                        this.metroStations = res.data;
                        this.stationNumbers[2]=this.metroStations.length;
                    }
                });

                //请求单行站
                request.get("line/findthenumberofonewaystations/"

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
                        this.oneWayStations = res.data.stations;
                        this.stationNumbers[3]=res.data.number;
                    }
                });

            },


        },
        created() {


        },

        mounted() {
            this.getData();

        },



    }
</script>

<style scoped>
    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .box-card {

        justify-content: space-between;
        line-height: 200%;
        width: 480px;
        margin: 0px;
        padding: 10px;
        list-style-type: circle;
        color: #444;

    }
</style>