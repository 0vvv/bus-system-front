<template>
    <div  style="padding:10px">
        <!--        搜索框-->
        <el-row :gutter="0"  style="padding: 10px">
            <div >
                    <el-input v-model="routeName" placeholder="请输入要查询的线路">
                        <template #prefix>
                            <i class="el-input__icon el-icon-search"></i>
                        </template>
                    </el-input>
            </div>

            <div style="margin-left: 20px">
                <el-button type="primary" @click="search">查询</el-button>
            </div>
        </el-row>

        <!--        结果显示表格-->
        <el-row :gutter="0"  >
            <div>
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="TransferStation" label="站点名称" width="180" />
                    <el-table-column prop="TransferLines" label="可换乘线路" width="400" />
                </el-table>
            </div>

        </el-row>
    </div>
</template>

<script>
    import request from "../utils/request";

    export default {
        name: "transferline",
        data(){
            return{
                routeName:"",
                tableData:"",
            }
        },
        methods:{
            search(){
                this.getData();
            },
            getData(){
                //数据
                request.get("line/find/transfer/"+this.routeName

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
                        /*this.stations.forEach((element,index)=>{
                            this.station.id = element.stationID;
                            this.station.name = element.stationName;
                            this.station.english = element.english;
                            this.tableData.push(this.station);
                        })*/


                    }
                });
            },

        },

    }
</script>

<style scoped>

</style>