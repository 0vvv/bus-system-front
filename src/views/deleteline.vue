<template>
    <el-main>
        <!--        输入框-->
        <el-row :gutter="0"  >
            <div >
                <el-input v-model="routeName" placeholder="请输入想要删除的线路名">
                    <template #prefix>
                        <i class="el-input__icon el-icon-search"></i>
                    </template>
                </el-input>
            </div>
            <div style="margin-left: 10px">
                <el-button type="primary" @click="deleteRoute">删除</el-button>
            </div>
        </el-row>
        <el-row  >
            <div style="margin-top: 20px" >
                <el-input v-model="routeNameRestore" placeholder="请输入想要恢复的线路名">
                    <template #prefix>
                        <i class="el-input__icon el-icon-search"></i>
                    </template>
                </el-input>
            </div>
            <div style="margin-left: 10px; margin-top: 20px">
                <el-button type="primary" @click="restoreRoute">恢复</el-button>
            </div>
        </el-row>
    </el-main>
</template>

<script>
    import request from "../utils/request";

    export default {
        name: "deleteline",
        data(){
            return{
               routeName:"",
                routeNameRestore:"",
                stations:[]
            }
        },
        methods:{
            deleteRoute(){
                const req = request({
                    method:'delete',
                    url:'line/delete?name='+this.routeName,
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
                            message: res.msg + "删除" +res.data.line
                        })
                        this.stations=res.data.stations

                    }
                })



            },
            restoreRoute(){
                const req = request({
                    method:'post',
                    url:'line/restore?name='+this.routeNameRestore,
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
                            message: res.msg + "恢复" +res.data.line
                        })
                        this.stations=res.data.stations

                    }
                })

            }
        }
    }
</script>

<style scoped>

</style>