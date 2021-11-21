<template>
    <div  style="padding:10px">
        <!--        搜索框-->
        <el-row :gutter="0"  style="padding: 10px">
            <div >
                <el-tooltip
                        class="item"
                        effect="dark"
                        content="输入查询线路 如：15路上行"
                        placement="top-start"
                >
                <el-input v-model="routeName1" placeholder="线路1">
                    <template #prefix>
                        <i class="el-input__icon el-icon-search"></i>
                    </template>
                </el-input>
                </el-tooltip>
            </div>
            <div  style="margin-left: 10px">
                <el-tooltip
                        class="item"
                        effect="dark"
                        content="输入查询线路 如：30路下行"
                        placement="top-start"
                >
                <el-input v-model="routeName2" placeholder="线路2">
                    <template #prefix>
                        <i class="el-input__icon el-icon-search"></i>
                    </template>
                </el-input>
                </el-tooltip>
            </div>
            <div style="margin-left: 20px">
                <el-button type="primary" @click="search">查询</el-button>
            </div>
        </el-row>

        <!--        结果显示表格-->
        <el-row :gutter="0"  >
            <div>
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="id" label="站点id" width="180" />
                    <el-table-column prop="name" label="站点名称" width="180" />
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
                        this.stations = res.data;
                        this.stations.forEach((element,index)=>{
                            this.station.id = element.stationID;
                            this.station.name = element.stationName;
                            this.station.english = element.english;
                            this.tableData.push(this.station);
                        })


                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>