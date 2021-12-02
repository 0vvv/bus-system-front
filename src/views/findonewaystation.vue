<template>
    <el-main>
        <!--        搜索框-->
        <el-row :gutter="0"  >
            <div >
                <el-input v-model="routeName" placeholder="请输入想要搜索的线路名">
                    <template #prefix>
                        <i class="el-input__icon el-icon-search"></i>
                    </template>
                </el-input>
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
        },
    }
</script>

<style scoped>

</style>