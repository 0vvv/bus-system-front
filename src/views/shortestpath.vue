<template>
    <el-main>
        <div style="padding: 10px">
            <!--        搜索框-->
            <el-row>
                <div style="margin: 10px ">
                    <el-col :span="6" style="margin-right: 10px">
                        站点1:
                        <el-input v-model="search1" placeholder="请输入站点1的名称……" clearable/>
                    </el-col>
                    <el-col :span="6" style="margin-right: 10px">
                        站点2:
                        <el-input v-model="search2" placeholder="请输入站点2的名称……"  clearable/>
                    </el-col>
                    <el-col :span="6" style="margin-right: 10px">
                        查询方式:
                        <el-select v-model="value" placeholder="选择查询方式">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4" style="margin-top:20px;">
                        <el-button type="primary" style="margin-left: 15px" @click="search">查询最短路径</el-button>
                    </el-col>
                </div>
            </el-row>
            <el-row style="margin-top: 20px">
                <el-table :data="tableData" border stripe style="width: 100%">
                    <el-table-column type="expand">
                        <template #default="props">
                            <div style="margin-left: 40px">
                            <el-timeline>
                                <el-timeline-item
                                        v-for="(station, index) in props.row.stations"
                                        :key="index"
                                        :hollow="station.hollow"
                                        :color="station.color"
                                        :timestamp="'ID:'+station.myId"

                                >
                                    {{ station.name }}
                                </el-timeline-item>
                            </el-timeline>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="route" label="路线" />
                    <el-table-column prop="length" label="长度" />
                    <el-table-column prop="time" label="用时"/>
                    <el-table-column prop="transferCnt" label="换乘数"/>
                </el-table>
            </el-row>
        </div>
    </el-main>
</template>

<script>
    import request from "@/utils/request";
    export default {
        name: "shortestpath",
        data(){
            return{
                tableData:[],
                value:"",
                name:"",
                search1:"",
                search2:"",
                options:[
                    {
                      value:'Option1',
                      label:'按站点数量查询'
                    },
                    {
                        value:'Option2',
                        label:'按最少换乘查询'
                    },
                    {
                        value:'Option3',
                        label:'按最少用时查询'
                    },

                ]

            }
        },
        methods:{
            search(){
                this.clear()
                switch (this.value) {
                    case "Option1":
                        this.getDataByStationNum();
                        break;
                    case "Option2":
                        this.getDataByTransferCnt();
                        break;
                    case "Option3":
                        this.getDataByTime();
                        break;

                }

            },
            getDataByStationNum(){
                var n = Number(this.search1+this.search2);
                if(!isNaN(n)) {
                    //是id
                    request.get("/line/get/shortest/path/id/" + this.search1 + "/" + this.search2, {

                    }).then(res => {  //结果放在.then里面，通过=>取后台返回结果
                        console.log(res.data)
                        if (res.data == null)
                            this.$message.warning(res.msg)
                        else{
                            this.$message.success("查询成功！")
                            var length = res.data[0].stations.length - 1;
                            this.name = res.data[0].stations[0].name + "-" + res.data[0].stations[length].name;
                            res.data.forEach((element,index)=>{
                                this.tableData.push({
                                    "length": element.length,
                                    "route": this.name,
                                    "stations":element.stations,
                                })
                            })
                        }
                    })
                }
                else{
                    //是Name
                    request.get("/line/get/shortest/path/name/" + this.search1 + "/" + this.search2, {

                    }).then(res => {  //结果放在.then里面，通过=>取后台返回结果
                        console.log(this.search1 + " " + this.search2)
                        console.log(res.data)
                        if (res.data == null)
                            this.$message.warning(res.msg)
                        else{
                            this.$message.success("查询成功！")
                            this.name = this.search1 + "-" + this.search2;
                            res.data.forEach((element,index)=>{
                                this.tableData.push({
                                    "length": element.length,
                                    "route": this.name,
                                    "stations":element.stations,
                                })
                            })
                        }
                    })


                }



            },
            getDataByTransferCnt(){
                request.get("/line/get/minTransfer/path/name/" + this.search1 + "/" + this.search2, {

                }).then(res => {  //结果放在.then里面，通过=>取后台返回结果
                    console.log(res.data)
                    if (res.data == null)
                        this.$message.warning(res.msg)
                    else{
                        this.$message.success("查询成功！")
                        this.name = this.search1 + "-" + this.search2;
                        res.data.forEach((element,index)=>{
                            var transferName;
                            var stationAndRoutes = [];
                            //先在stations中加入换乘信息
                            element.stations.forEach((station,i)=>{

                                stationAndRoutes.push({
                                    "name":station.name,
                                    "myId":station.myId
                                })
                            });
                            var tempRouteName = ""
                            element.routename.forEach((route,i)=>{
                                if (tempRouteName != route.name)
                                {
                                    stationAndRoutes[i].name +=  "\t (" + route.name+")";
                                    tempRouteName = route.name;
                                }
                            })
                            this.tableData.push({
                                "length": element.length,
                                "route": this.name,
                                "stations":stationAndRoutes,
                                "transferCnt":element.transferCount,
                            })
                        })
                    }
                })
            },
            getDataByTime(){
                request.get("/line/get/minTime/path/name/apoc/" + this.search1 + "/" + this.search2, {

                }).then(res => {  //结果放在.then里面，通过=>取后台返回结果
                    console.log(this.search1 + " " + this.search2)
                    console.log(res.data)
                    if (res.data == null)
                        this.$message.warning(res.msg)
                    else{
                        this.$message.success("查询成功！")
                        this.name = this.search1 + "-" + this.search2;
                        res.data.forEach((element,index)=>{
                            this.tableData.push({
                                "length": element.length,
                                "route": this.name,
                                "stations":element.stations,
                                "time":element.time,
                            })
                        })
                    }
                })
            },
            clear(){
                this.tableData=[]
            },
        },

    }
</script>

<style scoped>

</style>