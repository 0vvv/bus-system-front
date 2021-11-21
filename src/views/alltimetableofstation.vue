<template>
    <el-main>
        <!--搜索框-->
        <el-row >


                <el-col :span="10" style="margin-left: 10px">
                    <el-input v-model="stationID" placeholder="输入站台id" />
                </el-col>

        </el-row>
        <!--时间选择器-->
        <el-row :gutter="20" type="flex" style="padding: 10px">
            <el-col :span="4">
                <el-select v-model="hourValue" placeholder="Select">
                    <el-option
                            v-for="(n,index) in 24"
                            :key="index"
                            :label="index"
                            :value="index"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="1" style="padding: 10px">时</el-col>
            <el-col :span="4">
                <el-select v-model="minuteValue" placeholder="Select">
                    <el-option
                            v-for="(n,index) in 60"
                            :key="index"
                            :label="index"
                            :value="index"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="1" style="padding: 10px">分</el-col>
        </el-row>
        <!--数字选择器-->
        <el-row style="padding: 10px">
            <el-col :span="6">
                <el-input-number v-model="lineCount" :min="0" :max="100"  />
            </el-col>
            <el-col :span="8" style="margin-top: 10px">
                趟最近的班次信息
            </el-col>

        </el-row>
        <!--按钮-->
        <el-row gutter="20" type="flex">
            <div style="padding:10px; margin-left: 20px;">
                <el-button type="primary" @click="search">查询</el-button>
            </div>
        </el-row>
        <!--        结果显示表格-->
        <el-row  >
            <div>
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="stationName" label="站点名称" width="180" />
                    <el-table-column prop="routeName" label="班次名称" width="180" />
                    <el-table-column prop="passTime" label="到达时间" width="180" />
                    <el-table-column prop="showmsg" label="距离现在" width="180" />
                </el-table>
            </div>

        </el-row>



    </el-main>
</template>

<script>
    import request from "../utils/request";

    export default {
        name: "alltimetableofstation",
        data(){
            return{
                hourValue:"",
                minuteValue:"",
                stationID:"",
                lineCount:"",
                tableData:[],
            }
        },
        methods:{
            getData(){
                var realhourValue;
                /*数据格式补0*/
                if (this.hourValue < 10)
                    realhourValue="0"+this.hourValue;
                else realhourValue = this.hourValue;
                let url = this.stationID+"/"+realhourValue+":"+this.minuteValue+"/"+this.lineCount;
                request.get("/timetable/all/timetable/for/id/"+url

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
                        this.tableData = res.data.timetables;
                        this.tableData.forEach((element,index)=>{
                            if (element.minutes == 0)
                                element.showmsg = "即将到站";
                            else element.showmsg = element.minutes+"分钟后到站";

                            element.routeName = element.routeName + "班次" + (index % this.lineCount + 1);

                        })
                    }
                });
            },
            search(){
                this.getData();
            },
        }
    }
</script>

<style scoped>

</style>