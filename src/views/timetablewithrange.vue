<template xmlns:el-input="http://www.w3.org/1999/html">

    <el-main>
        <!--搜索框-->
        <el-row >
            <el-tooltip
                    class="item"
                    effect="dark"
                    content="支持不同查询方式。若输入站点名，则会按照站点id分组查询。"
                    placement="right-start"
            >

            <el-col :span="10" style="margin-left: 10px">
                <el-input v-model="stationName" placeholder="输入站台id或者名字" />
            </el-col>
            </el-tooltip>
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
            <el-input-number v-model="minute" :min="0" :max="100"  />
            </el-col>
            <el-col :span="8" style="margin-top: 10px">
                分钟内即将停靠的线路
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
                    <el-table-column prop="stationID" label="站点id" width="180" />
                    <el-table-column prop="routeName" label="线路名称" width="180" />
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
        name: "timetablewithrange",
        data(){
            return {
                hourValue:"",
                minuteValue:"",
                stationName:"",
                minute:"",
                tableData:[],


        }
        },
        methods:{
            search(){
                this.getData();
                this.clear()
            },
            clear(){
                    this.tableData=[]
            },
            getData(){

                var n = Number(this.stationName);
                var realhourValue,realminuteValue;
                /*数据格式补0*/
                if (this.hourValue < 10) {
                    realhourValue="0"+this.hourValue;
                }
                else realhourValue = this.hourValue;

                if (this.minuteValue < 10) {
                    realminuteValue="0"+this.minuteValue;
                }
                else realminuteValue = this.minuteValue;
                let url = this.stationName+"/"+realhourValue+":"+realminuteValue+"/"+this.minute;

                /*判断是id还是name*/
                if(!isNaN(n))
                {
                    //是id
                request.get("/timetable/id/with/range/"+url

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

                    })
                    }
                });

                }
                else
                {
                    //是name
                    request.get("/timetable/name/with/range/"+url

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
                           /* this.tableData = res.data.timetables;*/
                           res.data.forEach((element,index)=>{
                               element.timetables.forEach((item,i)=>{
                                   if (item.minutes == 0)
                                       item.showmsg = "即将到站";
                                   else item.showmsg = item.minutes+"分钟后到站";
                                   this.tableData.push(item)
                               })
                            })
                        }
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>