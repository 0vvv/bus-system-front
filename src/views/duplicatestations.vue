<template>
    <div  style="padding:10px">
        <!--        搜索框-->
        <el-row :gutter="0"  style="padding: 10px">
            <div >

                <el-autocomplete
                        v-model="routeName1"
                        :fetch-suggestions="querySearchAsync"
                        placeholder="线路1">
                    <template #prefix>
                        <i class="el-input__icon el-icon-search"></i>
                    </template>
                </el-autocomplete>

            </div>
            <div  style="margin-left: 10px">

                <el-autocomplete
                        v-model="routeName2"
                        :fetch-suggestions="querySearchAsync"
                        placeholder="线路2">
                    <template #prefix>
                        <i class="el-input__icon el-icon-search"></i>
                    </template>
                </el-autocomplete>

            </div>
            <div style="margin-left: 20px">
                <el-button type="primary" @click="search">查询</el-button>
            </div>
        </el-row>

        <!--        结果显示表格-->
        <el-row :gutter="0"  >
            <div>
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="stationID" label="站点id" width="180" />
                    <el-table-column prop="stationName" label="站点名称" width="180" />
                    <el-table-column prop="english" label="站点英文名称" width="400" />
                </el-table>
            </div>

        </el-row>
    </div>
</template>

<script>
    import request from "../utils/request";

    export default {
        name: "duplicatestations",
        data(){
            return{
                routeName1:"",
                routeName2:"",
                tableData:[],
                station:{},

            }
        },
        methods:{
            search(){
                if (this.routeName1 == ""|| this.routeName2=="")
                {
                    this.$message({
                        type: "error",
                        message: "请输入两条查询线路"
                    })
                }
                else{
                    this.getData();
                }

            },
            getData(){
                //数据
                request.get("stationline/duplicate/station/of/line/"+this.routeName1+"/"+this.routeName2

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
                        this.tableData = res.data;


                    }
                });
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
        },
        mounted() {
            this.restaurants = this.loadAll();
        },
    }
</script>

<style scoped>

</style>