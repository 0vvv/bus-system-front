<template>
    <div  style="padding:10px">
        <!--        搜索框-->
        <el-row :gutter="0"  >
            <div >
                <el-input v-model="stationName" placeholder="请输入想要搜索的站点名">
                    <template #prefix>
                        <i class="el-input__icon el-icon-search"></i>
                    </template>
                </el-input>
            </div>
            <div style="margin-left: 10px">
                <el-button type="primary" @click="search">查询</el-button>
            </div>
        </el-row>

        <!--线路展示-->
        <el-row :gutter="0"  >
            <div>
                <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="name" label="站点名称" width="180" />
                <el-table-column prop="myId" label="站点id" width="180" />
                <el-table-column prop="lines" label="线路名称" width="400" />
                </el-table>
            </div>

        </el-row>
    </div>
</template>

<script>
    import request from "../utils/request";

    export default {
        name: "lineofstation",
        data(){
            return{
                tableData: [],
              stationName:""
            }
        },
        created() {
        },
        methods:{
            search(){
                request.get("/stationLine/lineofvaguestation/"
                    +this.stationName
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
                })

            }
        }
    }
</script>

<style scoped>

</style>