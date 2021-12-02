<template>
    <el-main>
        <div style="padding: 10px">
            <!--        搜索框-->
            <el-row>
                <div style="margin: 10px ">
                    <el-col :span="6" style="margin-right: 10px">
                        线路:
                        <el-input v-model="routeName" placeholder="请输入线路的名字" clearable/>
                    </el-col>

                    <el-col :span="6" style="margin-right: 10px">
                        旧站点:
                        <el-input v-model="oldStation" placeholder="请输入旧站点的id……" clearable/>
                    </el-col>
                    <el-col :span="6" style="margin-right: 10px">
                        新站点:
                        <el-input v-model="newStation" placeholder="请输入新站点的id……"  clearable/>
                    </el-col>
                    <el-col :span="4" style="margin-top:20px;">
                        <el-button type="primary" style="margin-left: 15px" @click="replace">替换站点</el-button>
                    </el-col>
                </div>
            </el-row>
            <!--        线路展示-->
            <el-row style="margin-top: 20px">
                <div class="block">
                    <div style="margin-bottom: 20px">
                        {{routeName1}}
                    </div>
                    <el-timeline>
                        <el-timeline-item
                                v-for="(station, index) in stations"
                                :key="index"
                                :hollow="station.hollow"
                                :color="station.color"
                        >
                            {{ station.name }}
                        </el-timeline-item>
                    </el-timeline>
                </div>
            </el-row>
        </div>
    </el-main>
</template>

<script>
    import request from "../utils/request";

    export default {
        name: "replaceline",
        data(){
            return{
                oldStation:"",
                newStation:"",
                routeName:"",
                stations:[],
                routeName1:""

            }
        },
        methods:{
            replace(){
                const req = request({
                    method:'put',
                    url:'line/'+this.routeName +"/"+this.oldStation+"/"+this.newStation,
                }).then(res => {
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
                        this.$message({
                            type: "success",
                            message: res.msg + "替换"
                        })
                        this.stations=res.data.stations

                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>