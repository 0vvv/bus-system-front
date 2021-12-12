<template>
    <div  style="padding:10px">
        <!--        搜索框-->
        <el-row :gutter="0"  >
            <div >
                <el-autocomplete
                        v-model="routeName"
                        :fetch-suggestions="querySearchAsync"
                        placeholder="请输入想要搜索的线路名">
                    <template #prefix>
                        <i class="el-input__icon el-icon-search"></i>
                    </template>
                </el-autocomplete>
            </div>
            <div style="margin-left: 10px">
                <el-button type="primary" @click="search">查询</el-button>
            </div>
        </el-row>


    <el-row style="padding:20px">
<!--        线路展示-->
        <el-col :span="12">
        <div class="block">
            <div style="margin-bottom: 20px">
            {{routeName1}}
            </div>
            <el-timeline>
                <el-timeline-item
                        v-for="(station, index) in stations1"
                        :key="index"
                        :hollow="station.hollow"
                        color="rgba(52,152,219,.9)"
                        size='large'
                >
                    {{ station.name }}
                </el-timeline-item>
            </el-timeline>
        </div>
        </el-col>

        <el-col :span="12">
            <div class="block">
                <div style="margin-bottom: 20px">
                    {{routeName2}}
                </div>
                <el-timeline>
                    <el-timeline-item
                            v-for="(station, index) in stations2"
                            :key="index"
                            :hollow="station.hollow"
                            :color="station.color"
                    >
                        {{ station.name }}
                    </el-timeline-item>
                </el-timeline>
            </div>
        </el-col>
    </el-row>


    </div>
</template>

<script>
    import request from "../utils/request";
    export default {
        name: "stationofline",
        data() {

            return {
                routeName:"",
                routes:[],
                stations1:[],
                stations2:[],
                routeName1: "",
                routeName2: ""
            }
        },

        methods:{

            search(){
                this.clear();
                request.get("/stationline/station/of/precise/line/"
                   +this.routeName
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
                        this.routes = res.data;
                        this.routeName1 = this.routes.name
                        this.stations1 = this.routes.stations
                    }
                })
            },
            clear(){
                this.routeName1 = ""
                this.routeName2 = ""
                this.stations1 = []
                this.stations2 = []
            },
            loadAll() {
                let lines = [];
                request.get("/line/find/all/lines"
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
                        res.data.forEach((element,index)=>{
                            lines.push({
                                "value" : element.name,
                                "address" : element.name
                            })
                        })
                    }
                })
                return lines
            },
            querySearchAsync(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 300 * Math.random());
            },
            createStateFilter(queryString) {
                return (state) => {
                    return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                console.log(item);
            },


        },
        mounted() {
            this.restaurants = this.loadAll();
        },

    }
</script>

<style scoped>

</style>