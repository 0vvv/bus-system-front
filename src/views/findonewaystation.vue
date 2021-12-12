<template>
    <el-main>
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

        <!--        查询结果-->
        <el-row>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="站名" width="300px" />
            </el-table>
        </el-row>
    </el-main>
</template>

<script>
    import request from "../utils/request";

    export default {
        name: "findonewaystation",
        data(){
            return{
                routeName:"",
                tableData:[],

            }
        },
        methods:{
            search() {
                request.get("line/find/the/number/of/oneway/station/"+this.routeName

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
                        this.tableData = res.data

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